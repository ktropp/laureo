import {BlockMeta} from "./blockDefinitions";
import {Settings} from "@theme/settings";

const adminBlocks = require.context('./types/', true, /\.tsx$/);
const themeBlocks = require.context('./../../../../theme/blocks/', true, /\.tsx$/);

type LoadedBlock = BlockMeta & { component: React.ComponentType };

const blockRegistry: LoadedBlock[] = adminBlocks.keys().map((file) => {
    const mod = adminBlocks(file);
    let blockConfig = {
        ...mod.blockConfig,
        ...Settings.blockConfig[mod.blockConfig.type]
    };

    themeBlocks.keys().map((overrideFile) => {
        const mod = themeBlocks(overrideFile);
        if (mod.blockConfig.type === blockConfig.type) {
            blockConfig = {
                ...mod.blockConfig,
                ...Settings.blockConfig[mod.blockConfig.type]
            }
        }
    })

    return {
        component: mod.default,
        ...blockConfig,
    };
});

export default blockRegistry;
