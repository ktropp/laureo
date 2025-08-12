import { BlockMeta } from "blocks/blockDefinitions";
import { Container } from "lucide-react";

const ContainerBlock = ({ block }: { block: Block }) => {
  return <div></div>
};

export const blockConfig: BlockMeta = {
  type: 'container',
  name: 'Container',
  icon: Container 
};

export default ContainerBlock;
