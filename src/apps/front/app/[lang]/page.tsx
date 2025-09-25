
import { notFound } from "next/navigation"
import { getPost } from "actions/data"
import {Settings} from "@theme/settings";

export async function generateMetadata({
  params,
}: {
    params: { lang: string}
  }){
  const param = await params;
  let page = await getPost(param.lang, Settings.defaultLanguage)

  if(!(page))
    page = await getPost('/', param.lang)

  return {
    title: page?.metaTitle,
    description: page?.metaDescription,
    keywords: page?.metaKeywords
  }
}

export default async function Page({
    params,
}: {
    params: { lang: string }
}) {
  const param = await params;
  let page = await getPost(param.lang, Settings.defaultLanguage)

  if(!(page)){
    page = await getPost('/', param.lang)

    if(!page){
      notFound()
    }
  }

  return (
    <div>Page: {page.id}</div>
  )
}
