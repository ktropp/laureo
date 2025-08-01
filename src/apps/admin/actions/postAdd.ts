
"use server"

import { currentUser } from "lib/session";
import { PostAddFormSchema, PostAddFormState } from "../lib/definitions";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export async function postAdd(state: PostAddFormState, formData: FormData) {
  // data from form
  const dataFromForm = {
    type: formData.get('type'),
    status: formData.get('status'),
    title: formData.get('title'),
    slug: formData.get('slug'),
    blocks: formData.get('blocks'),
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

  const { type, title, slug, status, blocks } = validatedFields.data;

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
      status: status,
      title: title,
      slug: slug,
      blocks: blocks,
    },
    select: {
      id: true
    }
  }) 

  return redirect(`/${type.toLowerCase()}/${resultLang.id}`)
}
