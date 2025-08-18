import {BlockProps, BlockMeta} from "blocks/blockDefinitions";
import {Pilcrow} from "lucide-react";
import {cn} from "lib/utils";

const ParagraphBlock = ({block, className, ...props}: BlockProps) => {
    return <p
        className={cn("mb-1", className)}
        {...props}
    >{block?.text}</p>
};

export const blockConfig: BlockMeta = {
    type: 'paragraph',
    name: 'Paragraph',
    icon: Pilcrow,
    isText: true
};

export default ParagraphBlock;
