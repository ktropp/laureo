'use server'
import { prisma } from "lib/prisma";

export async function getPostLang(id: number) {
    return prisma.postLang.findFirstOrThrow({
        where: {
            id: id
        }
    });
}
