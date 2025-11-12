"use client"

import React, {useState} from "react";
import AccordionLinksBlockClient from "./AccordionLinksBlock.client";

export default function AccordionBlockClient({children, block}) {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const handleAccordionChange = (index: number) => {
        setActiveIndex(index)
    }
    return (
        <>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    switch (child._owner.name) {
                        case 'AccordionLinksBlock':
                            return <AccordionLinksBlockClient tagName={child.type} {...child.props} activeIndex={activeIndex} onAccordionChange={(index) => handleAccordionChange(index)}/>
                        case 'AccordionContentsBlock':
                    }
                }
                return child
            })}
        </>
    )
}