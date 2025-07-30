
"use server"

import { currentUser } from "lib/session";
import { PostAddFormSchema, PostAddFormState } from "../lib/definitions";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export async function postAdd(state: PostAddFormState, formData: FormData) {
  // data from form
  const dataFromForm = {
    type: formData.get('type'),
    title: formData.get('title'),
    url: formData.get('url'),
  }
  // validate fields
  const validatedFields = PostAddFormSchema.safeParse(dataFromForm);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      data: dataFromForm
    }
  }

  const { title, url } = validatedFields.data;

  const author = await currentUser()

  const result = await prisma.post.create({
    data: {
      authorId: author.id
    },
    select: {
      id: true
    }
  });

  const resultLang = await prisma.postLang.create({
    data: {
      postId: result.id,
      languageCode: process.env.DEFAULT_LANG,
      title: title,
      slug: url,
    },
    select: {
      id: true
    }
  }) 

  return redirect(`/post/${resultLang.id}`)
}
