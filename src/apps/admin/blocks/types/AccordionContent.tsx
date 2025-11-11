import {BlockMeta} from "blocks/blockDefinitions";
import {AlignLeft} from "lucide-react";
import {cn} from "../../lib/utils";

const AccordionContent = ({children, block, className}: { block: Block }) => {
    const Tag = block.tagName;

    return <Tag className={cn(block.className, className)}>{children}</Tag>
};

export const blockConfig: BlockMeta = {
    type: 'accordion-content',
    name: 'Accordion content',
    icon: AlignLeft,
    isParent: true,
    tagName: 'div',
    className: '',
    allowedParents: [
        'accordion-contents'
    ]
};

export default AccordionContent;