import { notFound } from "next/navigation";
import { getPost } from "../actions/data";
import Page from "components/page";

export async function generateMetadata({
  params,
}: {
    params: { slug: string}
  }){
  const post = await getPost('/', process.env.DEFAULT_LANG)
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.metaKeywords
  }
}

export default async function Home() {
  const page = await getPost('/', process.env.DEFAULT_LANG)

  if(!page)
    notFound()

  return (
      <Page page={page}/>
  )
}
