import {BlockProps, BlockMeta} from "blocks/blockDefinitions";
import {Minus} from "lucide-react";

const AccordionLink = ({block, ...props}: BlockProps) => {
    const sanitizedHtml = block?.text || ''
    const Tag = block.tagName;
    return <Tag
        className={block.className}
        dangerouslySetInnerHTML={{__html: sanitizedHtml}}
        {...props}
    ></Tag>
};

export const blockConfig: BlockMeta = {
    type: 'accordion-link',
    name: 'Accordion link',
    icon: Minus,
    isText: true,
    tagName: 'li',
    className: '',
    allowedParents: [
        'accordion-links'
    ]
};

export default AccordionLink;
