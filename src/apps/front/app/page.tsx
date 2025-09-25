import { notFound } from "next/navigation";
import { getPost } from "../actions/data";
import Page from "components/page";
import {Settings} from "@theme/settings";

export async function generateMetadata({
  params,
}: {
    params: { slug: string}
  }){
  const post = await getPost('/', Settings.defaultLanguage)
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.metaKeywords
  }
}

export default async function Home() {
  const page = await getPost('/', Settings.defaultLanguage)

  if(!page)
    notFound()

  return (
      <Page page={page}/>
  )
}
