
import { notFound } from "next/navigation"
import { getPost } from "actions/data"

export async function generateMetadata({
  params,
}: {
    params: { lang: string}
  }){
  let page = await getPost(params.lang, process.env.DEFAULT_LANG)

  if(!(page))
    page = await getPost('/', params.lang)

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
  let page = await getPost(params.lang, process.env.DEFAULT_LANG)

  if(!(page)){
    page = await getPost('/', params.lang)

    if(!page){
      notFound()
    }
  }

  return (
    <div>Page: {page.id}</div>
  )
}
