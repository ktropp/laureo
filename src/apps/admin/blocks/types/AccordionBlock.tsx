import {BlockMeta} from "blocks/blockDefinitions";
import {ChevronsUpDown} from "lucide-react";
import {cn} from "../../lib/utils";

const AccordionBlock = ({children, block, className}: { block: Block }) => {
    const Tag = block.tagName;

    return <Tag className={cn(block.className, className)}>{children}</Tag>
};

export const blockConfig: BlockMeta = {
    type: 'accordion',
    name: 'Accordion',
    icon: ChevronsUpDown,
    isParent: true,
    tagName: 'div',
    className: '',
    allowedChildren: [
        'accordion-links',
        'accordion-contents'
    ]
};

export default AccordionBlock;
