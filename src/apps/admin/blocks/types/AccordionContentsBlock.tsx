import {BlockMeta} from "blocks/blockDefinitions";
import {ListCollapse} from "lucide-react";
import {cn} from "../../lib/utils";

interface AccordionContentsProps extends BlockProps {
    activeIndex?: number
}
const AccordionContentsBlock = ({children, block, className, activeIndex}: AccordionContentsProps) => {
    const Tag = block.tagName;

    return <Tag className={cn(block.className, className)}>{children}</Tag>
};

export const blockConfig: BlockMeta = {
    type: 'accordion-contents',
    name: 'Accordion contents',
    icon: ListCollapse,
    isParent: true,
    tagName: 'div',
    className: '',
    allowedChildren: [
        'accordion-content'
    ],
    allowedParents: [
        'accordion'
    ]
};

export default AccordionContentsBlock;
