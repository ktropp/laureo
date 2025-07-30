'use server'


import {prisma} from "lib/prisma";
import {revalidatePath} from "next/cache";

export async function userDelete(userId: number) {
    try {
        await prisma.user.delete({
            where: {
                id: userId
            }
        })
        revalidatePath('/user')
        return {success: true, message: 'User deleted successfully'};
    } catch (error) {
        return {success: false, message: 'Failed to delete user: ' + error};
    }
}
