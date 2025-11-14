import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import {Image as LucideImage} from "lucide-react";
import Image from 'next/image'
import {cn} from "@admin/lib/utils";

const ImageBlock = ({block, ...props}: BlockProps) => {
    console.log(props)
    return <figure
        className={cn(block.className, props.className)}
    >
        {block.src ? (
            <Image
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
            />
        ) : (
            <div className="bg-slate-200 p-4 flex items-center justify-center w-full h-full"><LucideImage size={20} className="text-slate-500" /></div>
        )}
    </figure>
};

export const blockConfig: BlockMeta = {
    type: 'image',
    name: 'Image',
    icon: LucideImage
};

export default ImageBlock;
