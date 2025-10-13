'use client';

import {useSelectedLayoutSegment} from 'next/navigation';
import {ComponentProps} from 'react';
import {Link} from 'i18n/navigation';
import {cn} from "@admin/lib/utils";

export default function MenuLink({
                                     href,
                                     linkClassName,
                                     activeClassName,
                                     ...rest
                                 }: ComponentProps<typeof Link>) {
    const selectedLayoutSegment = useSelectedLayoutSegment();
    const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
    const isActive = pathname === href;

    return (
        <Link
            aria-current={isActive ? 'page' : undefined}
            href={href}
            className={cn(linkClassName, isActive && activeClassName)}
            {...rest}
        />
    );
}