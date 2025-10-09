import { notFound } from "next/navigation"
import { getPost } from "actions/data"
import PageContent from "components/PageContent";

export async function generateMetadata({
  params,
}: {
  params: { locale: string, slug: string }
}) {
  const param = await params;
  const page = await getPost(param.slug, param.locale)
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
  const param = await params;
  const page = await getPost(param.slug, param.locale)

  if (!page)
    notFound()

  return (
      <PageContent page={page}/>
  )
}
