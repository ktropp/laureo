import { BlockMeta } from "./blockDefinitions";
import {Settings} from "../../../../theme/settings";

const req = require.context('./types/', true, /\.tsx$/);

type LoadedBlock = BlockMeta & { component: React.ComponentType };

const blockRegistry: LoadedBlock[] = req.keys().map((file) => {
  const mod = req(file);
  const blockConfig = {
    ...mod.blockConfig,
    ...Settings.blockConfig[mod.blockConfig.type]
  };

  return {
    component: mod.default,
    ...blockConfig,
  };
});

export default blockRegistry;
