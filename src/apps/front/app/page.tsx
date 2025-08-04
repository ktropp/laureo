import { notFound } from "next/navigation";
import { getPost } from "../actions/data";

export async function generateMetadata({
  params,
}: {
    params: { slug: string}
  }){
  const post = await getPost('/', 'cs-CZ')
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.metaKeywords
  }
}

export default async function Home() {
  const page = await getPost('/', 'cs-CZ')

  if(!page)
    notFound()

  return (
    <div>Page: {page.id}</div>
  )
}
