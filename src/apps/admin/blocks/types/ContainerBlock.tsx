import { BlockMeta } from "blocks/blockDefinitions";
import { Container } from "lucide-react";

const ContainerBlock = ({ children, block }: { block: Block }) => {
  return <div className="max-w-5xl m-auto">{children}</div>
};

export const blockConfig: BlockMeta = {
  type: 'container',
  name: 'Container',
  icon: Container 
};

export default ContainerBlock;
