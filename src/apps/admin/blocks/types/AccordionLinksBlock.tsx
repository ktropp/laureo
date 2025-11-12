import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import {ListCollapse} from "lucide-react";
import {cn} from "../../lib/utils";
import React from "react";

interface AccordionLinksProps extends BlockProps {
    activeIndex?: number
}
const AccordionLinksBlock = ({children, block, className, activeIndex}: AccordionLinksProps) => {
    const Tag = block.tagName;
    console.log(activeIndex)

    return <Tag className={cn(block.className, className)}>
        {React.Children.map(children, (child, index) => {
           if (React.isValidElement(child)){
               return React.cloneElement(child, {
                   isActive: activeIndex === index,
                   ...child.props,
               })
           }
           return child
        })}
    </Tag>
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
