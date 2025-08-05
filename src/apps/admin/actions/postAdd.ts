"use server"

import { currentUser } from "lib/session";
import { PostAddFormSchema, PostAddFormState } from "../lib/definitions";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export async function postAdd(state: PostAddFormState, formData: FormData) {
  // data from form
  const dataFromForm = {
    id: formData.get('id'),
    languageCode: formData.get('languageCode'),
    type: formData.get('type'),
    status: formData.get('status'),
    title: formData.get('title'),
    slug: formData.get('slug'),
    blocks: formData.get('blocks'),
    metaTitle: formData.get('metaTitle'),
    metaDescription: formData.get('metaDescription'),
    metaKeywords: formData.get('metaKeywords'),
  }

  if (dataFromForm.id) {
    const post = await prisma.postLang.findUnique({
      where: {
        id: parseInt(dataFromForm.id)
      },
      select: {
        languageCode: true
      }
    })
    dataFromForm.languageCode = post.languageCode;
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

  const { type, title, slug, status, blocks, metaTitle, metaDescription, metaKeywords } = validatedFields.data;

  const author = await currentUser()

  if (dataFromForm.id) {
    //update 
    const resultLang = await prisma.postLang.update({
      where: {
        id: parseInt(dataFromForm.id)
      },
      data: {
        status: status,
        title: title,
        slug: slug,
        blocks: blocks,
        metaTitle: metaTitle,
        metaDescription: metaDescription,
        metaKeywords: metaKeywords,
      },
      select: {
        id: true
      }
    })
  } else {
    //add
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
        metaTitle: metaTitle,
        metaDescription: metaDescription,
        metaKeywords: metaKeywords,
      },
      select: {
        id: true
      }
    })
    return redirect(`/${type.toLowerCase()}/${resultLang.id}`)
  }

}
