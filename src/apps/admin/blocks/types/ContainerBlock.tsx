import { BlockMeta } from "blocks/blockDefinitions";
import { Container } from "lucide-react";

const ContainerBlock = ({ children, block }: { block: Block }) => {
  return <div className={block.className}>{children}</div>
};

export const blockConfig: BlockMeta = {
  type: 'container',
  name: 'Container',
  icon: Container,
  isParent: true,
  tagName: 'div',
  className: 'max-w-5xl m-auto'
};

export default ContainerBlock;
