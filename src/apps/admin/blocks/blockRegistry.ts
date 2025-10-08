import {BlockMeta} from "./blockDefinitions";
import {Settings} from "@theme/settings";

const adminBlocks = require.context('./types/', true, /\.tsx$/);
const themeBlocks = require.context('./../../../../theme/blocks/', true, /\.tsx$/);

type LoadedBlock = BlockMeta & { component: React.ComponentType };

const blockRegistry: LoadedBlock[] = [];

// Process admin blocks first
adminBlocks.keys().forEach((file) => {
    const mod = adminBlocks(file);
    let blockConfig = {
        ...mod.blockConfig,
        ...Settings.blockConfig[mod.blockConfig.type]
    };

    // Check for theme override
    themeBlocks.keys().forEach((overrideFile) => {
        const themeMod = themeBlocks(overrideFile);
        if (themeMod.blockConfig.type === blockConfig.type) {
            blockConfig = {
                ...themeMod.blockConfig,
                ...Settings.blockConfig[themeMod.blockConfig.type]
            }
        }
    });

    blockRegistry.push({
        component: mod.default,
        ...blockConfig,
    });
});

// Add theme blocks that don't exist in admin blocks
themeBlocks.keys().forEach((themeFile) => {
    const themeMod = themeBlocks(themeFile);
    const exists = blockRegistry.some(block => block.type === themeMod.blockConfig.type);

    if (!exists) {
        const blockConfig = {
            ...themeMod.blockConfig,
            ...Settings.blockConfig[themeMod.blockConfig.type]
        };

        blockRegistry.push({
            component: themeMod.default,
            ...blockConfig,
        });
    }
});

export default blockRegistry;