"use client"

import React from "react";

export default function AccordionLinkBlockClient({children, tagName, className, isActive, GlobalFields, ...props}) {
    const Tag = tagName
    return (
        <Tag className={className} {...props} data-active={isActive}>
            {children}
        </Tag>
    )
}
