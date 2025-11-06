'use server'
import { prisma } from "lib/prisma";

export async function getAllMedia() {
    return prisma.media.findMany({
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
