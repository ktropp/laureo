
'use server'


import { prisma } from "lib/prisma";
import { revalidatePath } from "next/cache";

export async function postDelete(postLangId: number) {
  try {

    await prisma.$transaction(async (tx) => {
      const postLang = await tx.postLang.findUnique({
        where: { id: postLangId },
        select: {
          postId: true
        }
      })

      if (!postLang) throw new Error('PostLang not found');

      await tx.postLang.delete({
        where: { id: postLangId },
      })

      const remaining = await tx.postLang.count({
        where: { postId: postLang.postId },
      })

      if (remaining === 0) {
        await tx.post.delete({
          where: { id: postLang.postId },
        })
      }

    })

    //todo: revalidate post type path
    revalidatePath('/page')
    return { success: true, message: 'Item deleted successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to delete item: ' + error };
  }
}
