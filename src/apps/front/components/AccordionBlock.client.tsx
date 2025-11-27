"use client"

import React, {useState} from "react";
import AccordionLinksBlockClient from "./AccordionLinksBlock.client";
import AccordionContentsBlockClient from "./AccordionContentsBlock.client";

export default function AccordionBlockClient({children, block}) {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const handleAccordionChange = (index: number) => {
        setActiveIndex(index)
    }

    const findContents = (children): any[] => {
        let contents = []

        const processChild = (child) => {
            if (React.isValidElement(child)) {
                if (child._owner.name === 'AccordionContentsBlock') {
                    contents = child.props.children
                } else if (child.props.children) {
                    // Recursively process nested children
                    React.Children.forEach(child.props.children, processChild)
                }
            }
        }

        React.Children.forEach(children, processChild)
        return contents
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

            if (child._owner.name === 'AccordionLinksBlock') {
                return <AccordionLinksBlockClient
                    tagName={child.type}
                    {...child.props}
                    activeIndex={activeIndex}
                    onAccordionChange={(index) => handleAccordionChange(index)}
                    contents={contents}
                />
            }

            if (child._owner.name === 'AccordionContentsBlock') {
                return <AccordionContentsBlockClient
                    tagName={child.type}
                    {...child.props}
                    activeIndex={activeIndex}
                />
            }

            return child
        })
    }

    const contents = findContents(children)

    return (
        <>
            {renderChildren(children)}
        </>
    )
}