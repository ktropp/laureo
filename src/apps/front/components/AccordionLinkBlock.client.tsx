"use client"

import React, {useEffect, useRef} from "react";

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
    const elementRef = useRef<HTMLElement>(null)
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        const isDesktop = window.matchMedia("(min-width: 64rem)").matches
        if (!isDesktop && isActive && elementRef.current) {
            requestAnimationFrame(() => {
                elementRef.current?.scrollIntoView({ behavior: 'smooth' })
            })
        }
    }, [isActive])

    return <>
        <Tag ref={elementRef} className={className} {...props} data-active={isActive}>
            {children}
        </Tag>
        {isActive && <div className="acc-mobile-content">{content}</div>}
    </>
}
