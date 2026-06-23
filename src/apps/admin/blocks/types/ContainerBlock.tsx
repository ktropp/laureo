import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import { Container } from "lucide-react";
import {cn, cnEditor} from "../../lib/utils";

const ContainerBlock = ({ children, block, className, isEditor }: BlockProps) => {
  return <div className={isEditor? cnEditor(block.className, className) : cn(block.className, className)}>{children}</div>
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
