"use client"

import React from "react";

export default function AccordionLinkBlockClient({
                                                     children,
                                                     tagName,
                                                     className,
                                                     isActive,
                                                     content,
                                                     GlobalFields,
                                                     ...props
                                                 }) {
    const Tag = tagName
    return <>
        <Tag className={className} {...props} data-active={isActive}>
            {children}
        </Tag>
        {isActive && <div className="acc-mobile-content">{content}</div>}
    </>
}
