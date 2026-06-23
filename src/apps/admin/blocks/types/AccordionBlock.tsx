import {BlockProps, BlockMeta} from "blocks/blockDefinitions";
import {ChevronsUpDown} from "lucide-react";
import {cn, cnEditor} from "../../lib/utils";
import AccordionBlockClient from "@front/components/AccordionBlock.client";

const AccordionBlock = ({children, block, className, isEditor}: BlockProps) => {
    const Tag = block.tagName;

    return <Tag className={isEditor? cnEditor(block.className, className) : cn(block.className, className)}>
        <AccordionBlockClient>
            {children}
        </AccordionBlockClient>
    </Tag>
};

export const blockConfig: BlockMeta = {
    type: 'accordion',
    name: 'Accordion',
    icon: ChevronsUpDown,
    isParent: true,
    tagName: 'div',
    className: '',
    /*allowedChildren: [
        'accordion-links',
        'accordion-contents'
    ]*/
};

export default AccordionBlock;
