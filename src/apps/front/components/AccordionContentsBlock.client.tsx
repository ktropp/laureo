"use client"

import React from "react";
import AccordionContentBlockClient from "./AccordionContentBlock.client";
export default function AccordionContentsBlockClient({children, tagName, className, activeIndex, onAccordionChange, ...props}) {
    const Tag = tagName
    return (
        <Tag className={className} {...props}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    switch (child._owner.name) {
                        case 'AccordionContentBlock':
                            return <AccordionContentBlockClient tagName={child.type} {...child.props} isActive={activeIndex == index || undefined}/>
                    }
                }
                return child
            })}
        </Tag>
    )
}
