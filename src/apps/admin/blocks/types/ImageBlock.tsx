import { BlockMeta } from "blocks/blockDefinitions";
import { Image } from "lucide-react";

const ImageBlock = ({ block }: { block: Block }) => {
  return <div></div>
};

export const blockConfig: BlockMeta = {
  type: 'image',
  name: 'Image',
  icon: Image 
};

export default ImageBlock;
