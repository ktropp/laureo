import {BlockMeta} from "blocks/blockDefinitions";
import {ListCollapse} from "lucide-react";
import {cn} from "../../lib/utils";

const AccordionLinksBlock = ({children, block, className}: { block: Block }) => {
    const Tag = block.tagName;

    return <Tag className={cn(block.className, className)}>{children}</Tag>
};

export const blockConfig: BlockMeta = {
    type: 'accordion-links',
    name: 'Accordion links',
    icon: ListCollapse,
    isParent: true,
    tagName: 'ul',
    className: '',
    allowedChildren: [
        'accordion-link'
    ],
    allowedParents: [
        'accordion'
    ]
};

export default AccordionLinksBlock;
