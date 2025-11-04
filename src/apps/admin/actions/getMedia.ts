'use server'
import { prisma } from "lib/prisma";

export async function getMedia(id: number) {
    return prisma.media.findFirstOrThrow({
        where: {
            id: id
        },
        select: {
            id: true,
            created_at: true,
            author: true,
            file: true,
            title: true,
            alt: true,
        }
    });
}
