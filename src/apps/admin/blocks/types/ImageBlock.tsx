import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import {Image as LucideImage} from "lucide-react";
import Image from 'next/image'

const ImageBlock = ({block, ...props}: BlockProps) => {
    return <figure
        className={block.className}
    >
        {block.src ? (
            <Image
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
            />
        ) : (
            <div>placeholder todo</div>
        )}
    </figure>
};

export const blockConfig: BlockMeta = {
    type: 'image',
    name: 'Image',
    icon: LucideImage
};

export default ImageBlock;
