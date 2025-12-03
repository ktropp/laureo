"use client"

import React from "react";

export default function PillLinkBlockClient({
                                                tagName,
                                                className,
                                                isActive,
                                                onToggle,
                                                ...props
                                            }) {
    const Tag = tagName
    delete props.GlobalFields
    return <Tag className={className} {...props} data-active={isActive ? isActive : null} onClick={onToggle}></Tag>
}
