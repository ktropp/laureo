"use client"

import MenuLink from "./MenuLink";

export default function Menu({items, className, linkClassName, activeClassName}) {

    return (
        <ul className={className}>
            {items.map(item => (
                <li key={item.id}>
                    <MenuLink href={item.url} linkClassName={linkClassName} activeClassName={activeClassName}>{item.title}</MenuLink>
                </li>
            ))}
        </ul>
    )
}