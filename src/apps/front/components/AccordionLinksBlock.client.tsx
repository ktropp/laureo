"use client"

import React from "react";
import AccordionLinkBlockClient from "./AccordionLinkBlock.client";

export default function AccordionLinksBlockClient({children, tagName, className, activeIndex, onAccordionChange, ...props}) {
    const Tag = tagName
    return (
        <Tag className={className} {...props}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    switch (child._owner.name) {
                        case 'AccordionLinkBlock':
                            return <AccordionLinkBlockClient tagName={child.type} {...child.props} isActive={activeIndex == index || undefined} onClick={() => onAccordionChange(index)}/>
                    }
                }
                return child
            })}
        </Tag>
    )
}
