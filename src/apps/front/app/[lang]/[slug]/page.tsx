import { notFound } from "next/navigation"
import { getPost } from "actions/data"

export async function generateMetadata({
  params,
}: {
  params: { lang: string, slug: string }
}) {
  const page = await getPost(params.slug, params.lang)
  return {
    title: page?.metaTitle,
    description: page?.metaDescription,
    keywords: page?.metaKeywords
  }
}

export default async function Page({
  params,
}: {
  params: { lang: string, slug: string }
}) {
  const page = await getPost(params.slug, params.lang)

  if (!page)
    notFound()

  return (
    <div>Page: {page.id}</div>
  )
}
