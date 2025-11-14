import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import { Container } from "lucide-react";
import {cn} from "../../lib/utils";

const ContainerBlock = ({ children, block, className }: BlockProps) => {
  return <div className={cn(block.className, className)}>{children}</div>
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
