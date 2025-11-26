"use client"

import React, {useState} from "react";
import AccordionLinksBlockClient from "./AccordionLinksBlock.client";
import AccordionContentsBlockClient from "./AccordionContentsBlock.client";

export default function AccordionBlockClient({children, block}) {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const handleAccordionChange = (index: number) => {
        setActiveIndex(index)
    }
    let contents = []
    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child._owner.name === 'AccordionContentsBlock') {
            contents = child.props.children
        }
    })
    return (
        <>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    switch (child._owner.name) {
                        case 'AccordionLinksBlock':
                            return <AccordionLinksBlockClient tagName={child.type} {...child.props}
                                                              activeIndex={activeIndex}
                                                              onAccordionChange={(index) => handleAccordionChange(index)}
                                                              contents={contents}/>
                        case 'AccordionContentsBlock':
                            return <AccordionContentsBlockClient tagName={child.type} {...child.props}
                                                                 activeIndex={activeIndex}/>
                    }
                }
                return child
            })}
        </>
    )
}