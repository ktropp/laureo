import {BlockProps, BlockMeta} from "blocks/blockDefinitions";
import {Pilcrow} from "lucide-react";
import {sanitizeFrontendHtml} from "@admin/lib/utils";

const ParagraphBlock = ({block, GlobalFields, ...props}: BlockProps) => {
    const sanitizedHtml = sanitizeFrontendHtml(block?.text || '', GlobalFields)
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
