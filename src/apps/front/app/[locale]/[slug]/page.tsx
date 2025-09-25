import { notFound } from "next/navigation"
import { getPost } from "actions/data"

export async function generateMetadata({
  params,
}: {
  params: { locale: string, slug: string }
}) {
  const page = await getPost(params.slug, params.locale)
  return {
    title: page?.metaTitle,
    description: page?.metaDescription,
    keywords: page?.metaKeywords
  }
}

export default async function Page({
  params,
}: {
  params: { locale: string, slug: string }
}) {
  const page = await getPost(params.slug, params.locale)

  if (!page)
    notFound()

  return (
    <div>Page: {page.id}</div>
  )
}
