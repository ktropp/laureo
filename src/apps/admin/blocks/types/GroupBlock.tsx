import { BlockMeta } from "blocks/blockDefinitions";
import { Group } from "lucide-react";

const GroupBlock = ({ children, block }: { block: Block }) => {
  return <div className={block.className}>{children}</div>
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
