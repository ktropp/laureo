"use server"

import {prisma} from "../lib/prisma";

export async function mediaItemTitleEdit(id: number, title: string) {
    if(!id) return false

    return await prisma.media.update({
        where: {
            id: id
        },
        data: {
            title: title
        }
    })
}
