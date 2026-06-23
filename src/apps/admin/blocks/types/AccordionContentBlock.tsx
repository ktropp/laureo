import {BlockMeta} from "blocks/blockDefinitions";
import {AlignLeft} from "lucide-react";
import {cn, cnEditor} from "../../lib/utils";

const AccordionContentBlock = ({children, block, className, isEditor}: { block: Block }) => {
    const Tag = block.tagName;

    return <Tag className={isEditor? cnEditor(block.className, className) : cn(block.className, className)}>{children}</Tag>
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

export default AccordionContentBlock;