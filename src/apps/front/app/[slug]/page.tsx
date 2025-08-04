import { notFound } from "next/navigation"
import { getPost } from "../../actions/data"

export async function generateMetadata({
  params,
}: {
    params: { slug: string}
  }){
  const post = await getPost(params.slug, 'cs-CZ')
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.metaKeywords
  }
}

export default async function Page({
    params,
}: {
    params: { slug: string }
}) {
  const page = await getPost(params.slug, 'cs-CZ')

  if(!page)
    notFound()

  return (
    <div>Page: {page.id}</div>
  )
}
