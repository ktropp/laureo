import { prisma } from "../lib/prisma"
import { cache } from 'react'


export const getPost = cache(async (slug: string, languageCode: string) => {
  const res = await prisma.postLang.findFirst({
    where: {
      slug: slug,
      languageCode: languageCode,
      status: 'PUBLISHED'
    }
  })
  return res
})
