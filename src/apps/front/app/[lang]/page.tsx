
import { notFound } from "next/navigation"
import { getPost } from "actions/data"

export async function generateMetadata({
  params,
}: {
    params: { lang: string}
  }){
  const param = await params;
  let page = await getPost(param.lang, process.env.DEFAULT_LANG)

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
  let page = await getPost(param.lang, process.env.DEFAULT_LANG)

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
