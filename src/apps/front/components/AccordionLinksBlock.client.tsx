"use client"

import React from "react";
import AccordionLinkBlockClient from "./AccordionLinkBlock.client";

export default function AccordionLinksBlockClient({children, tagName, className, activeIndex, onAccordionChange, contents, ...props}) {
    const Tag = tagName
    return (
        <Tag className={className} {...props}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    switch (child._owner.name) {
                        case 'AccordionLinkBlock':
                            return <AccordionLinkBlockClient tagName={child.type} {...child.props} isActive={activeIndex == index || undefined} onClick={() => onAccordionChange(index)} content={contents && contents[index]??null}/>
                    }
                }
                return child
            })}
        </Tag>
    )
}
