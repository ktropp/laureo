import {BlockProps, BlockMeta} from "blocks/blockDefinitions";
import {Minus} from "lucide-react";

interface AccordionLinkProps extends BlockProps {
    isActive?: boolean
}
const AccordionLinkBlock = ({block, isActive, ...props}: AccordionLinkProps) => {
    const sanitizedHtml = block?.text || ''
    const Tag = block.tagName;
    return <Tag
        data-active={isActive || undefined}
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

export default AccordionLinkBlock;
