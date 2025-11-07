'use server'

import { revalidatePath } from 'next/cache'
import {prisma} from "../lib/prisma";

export async function deleteMedia(mediaId: string) {
  try {
    await prisma.media.delete({
        where: {
            id: mediaId
        }
    })

    revalidatePath('/media')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete media' }
  }
}
