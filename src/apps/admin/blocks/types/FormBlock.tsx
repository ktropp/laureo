import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import {BookText} from "lucide-react";
import {cn} from "../../lib/utils";

const FormBlock = ({ children, block, className }: BlockProps) => {
  return <div className={cn(block.className, className)}>{children}</div>
};

export const blockConfig: BlockMeta = {
  type: 'form',
  name: 'Form',
  icon: BookText,
  isParent: true,
  tagName: 'div',
  className: 'flex'
};

export default FormBlock;
