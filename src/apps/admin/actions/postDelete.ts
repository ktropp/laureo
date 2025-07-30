
'use server'


import { prisma } from "lib/prisma";
import { revalidatePath } from "next/cache";

export async function postDelete(postLangId: number) {
  try {
    await prisma.postLang.delete({
      where: {
        id: postLangId
      }
    })
    //todo: revalidate post type path
    revalidatePath('/post/')
    return { success: true, message: 'Item deleted successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to delete item: ' + error };
  }
}
