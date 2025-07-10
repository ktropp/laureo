'use server'
import { prisma } from "lib/prisma";

export async function getUser(id: number) {
    const user = await prisma.user.findFirstOrThrow({
        where: {
            id: id
        }
    });

    return user;
}
