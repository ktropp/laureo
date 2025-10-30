import { BlockMeta } from "blocks/blockDefinitions";
import { Group } from "lucide-react";
import {cn} from "../../lib/utils";

const GroupBlock = ({ children, block, className }: { block: Block }) => {
  return <div className={cn(block.className, className)}>{children}</div>
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
