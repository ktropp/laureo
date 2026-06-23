import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import { Group } from "lucide-react";
import {cn, cnEditor} from "../../lib/utils";

const GroupBlock = ({ children, block, className, isEditor }: BlockProps) => {
  return <div className={isEditor? cnEditor(block.className, className) : cn(block.className, className)}>{children}</div>
};

export const blockConfig: BlockMeta = {
  type: 'group',
  name: 'Group',
  icon: Group,
  isParent: true,
  tagName: 'div',
  className: 'flex'
};

export default GroupBlock;
