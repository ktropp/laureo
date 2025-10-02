"use server"

import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export async function menuLangAdd(menuId: number, languageCode: string) {

  const check = await prisma.menuLang.findFirst({
    where: {
      menuId: menuId,
      languageCode: languageCode
    },
    select: {
      id: true
    }
  })

  if(!check){
    const resultLang = await prisma.menuLang.create({
      data: {
        menuId: menuId,
        languageCode: languageCode,
        title: '',
      }
    })

    return redirect(`/menu/${resultLang.id}`)
  }
}
