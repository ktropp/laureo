"use client"

import React from "react";

export default function AccordionContentBlockClient({children, tagName, className, isActive, ...props}) {
    const Tag = tagName
    return isActive ? (
        <Tag className={className} {...props}>
            {children}
        </Tag>
    ) : null
}
