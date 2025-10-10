import {BlockProps, BlockMeta} from "blocks/blockDefinitions";
import {Pilcrow} from "lucide-react";

const ParagraphBlock = ({block, ...props}: BlockProps) => {
    const sanitizedHtml = block?.text || ''
    return <p
        className={block.className}
        dangerouslySetInnerHTML={{__html: sanitizedHtml}}
        {...props}
    ></p>
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
