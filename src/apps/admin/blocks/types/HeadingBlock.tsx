import { BlockMeta } from "blocks/blockDefinitions";
import { Heading } from "lucide-react";

const HeadingBlock = ({ block }: { block: Block }) => {
  return <div></div>
};

export const blockConfig: BlockMeta = {
  type: 'heading',
  name: 'Heading',
  icon: Heading 
};

export default HeadingBlock;
