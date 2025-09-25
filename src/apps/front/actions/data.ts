import { Settings } from "@theme/settings";
import { prisma } from "../lib/prisma"
import { cache } from 'react'


export const getPost = cache(async (slug: string, languageCode: string) => {
  const languages = Settings.languages;
  let langCode = languageCode;
  if(languageCode.length == 2){
    languages.forEach(lang => {
      if(languageCode == lang.slice(0, 2)){
        langCode = lang
      }
    }) 
  }
  const res = await prisma.postLang.findFirst({
    where: {
      slug: slug,
      languageCode: langCode,
      status: 'PUBLISHED'
    }
  })
  return res
})
