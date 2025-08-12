import { BlockMeta } from "./blockDefinitions";

const req = require.context('./types/', true, /\.tsx$/);

type LoadedBlock = BlockMeta & { component: React.ComponentType };

const blockRegistry: LoadedBlock[] = req.keys().map((file) => {
  const mod = req(file);
  return {
    component: mod.default,
    ...mod.blockConfig,
  };
});

export default blockRegistry;
