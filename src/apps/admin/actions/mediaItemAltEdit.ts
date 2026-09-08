"use server"

import {prisma} from "../lib/prisma";

export async function mediaItemAltEdit(id: number, alt: string) {
    if(!id) return false

    return await prisma.media.update({
        where: {
            id: id
        },
        data: {
            alt: alt
        }
    })
}
