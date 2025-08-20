import {BlockProps, BlockMeta} from "blocks/blockDefinitions";
import {Pilcrow} from "lucide-react";
import {cn} from "../../lib/utils";

const ParagraphBlock = ({block, ...props}: BlockProps) => {
    return <p
        className={block.className}
        {...props}
    >{block?.text}</p>
};

export const blockConfig: BlockMeta = {
    type: 'paragraph',
    name: 'Paragraph',
    icon: Pilcrow,
    isText: true,
    tagName: 'p',
    className: 'mb-1'
};

export default ParagraphBlock;
