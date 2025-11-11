import {BlockMeta} from "blocks/blockDefinitions";
import {ListCollapse} from "lucide-react";
import {cn} from "../../lib/utils";

const AccordionContentsBlock = ({children, block, className}: { block: Block }) => {
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
