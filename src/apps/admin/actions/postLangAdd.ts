"use server"

import { currentUser } from "lib/session";
import { PostAddFormSchema, PostAddFormState } from "../lib/definitions";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export async function postLangAdd(postId: number, languageCode: string) {
  
  const check = await prisma.postLang.findFirst({
    where: {
      postId: postId,
      languageCode: languageCode
    },
    select: {
      id: true
    }
  })

  if(!check){
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      },
      select: {
        type: true,
      }
    })

    const resultLang = await prisma.postLang.create({
      data: {
        postId: postId,
        languageCode: languageCode,
        title: '',
        slug: '',
      }
    })
    
    return redirect(`/${post.type.toLowerCase()}/${resultLang.id}`)
  }
}
