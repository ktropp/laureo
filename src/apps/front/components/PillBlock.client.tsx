"use client"

import React, {useState} from "react";
import AccordionLinksBlockClient from "./AccordionLinksBlock.client";
import AccordionContentsBlockClient from "./AccordionContentsBlock.client";
import PillLinkBlockClient from "@front/components/PillLinkBlock.client";

export default function PillBlockClient({children, block}) {
    const [isActive, setIsActive] = useState<boolean>(false)

    const handleToggle = () => {
        setIsActive(!isActive)
    }

    const renderChildren = (children): React.ReactNode => {
        return React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) {
                return child
            }

            // Process nested children if they exist
            if (child.props.children) {
                child = React.cloneElement(child, {
                    ...child.props,
                    children: renderChildren(child.props.children)
                })
            }

            if (child._owner.name === 'PillLinkBlock') {
                return <PillLinkBlockClient
                    tagName={child.type}
                    isActive={isActive}
                    onToggle={handleToggle}
                    {...child.props}
                />
            }

            if (child._owner.name === 'PillContentBlock' && !isActive) {
                return null
            }

            return child
        })
    }

    return (
        <>
            {renderChildren(children)}
        </>
    )
}
