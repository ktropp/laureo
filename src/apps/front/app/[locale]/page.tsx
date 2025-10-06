import { notFound } from "next/navigation";
import { getPost } from "actions/data";
import PageContent from "components/PageContent";

export async function generateMetadata({
  params,
}: {
    params: { locale: string}
  }){
  const param = await params;
  const post = await getPost('/', param.locale)
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.metaKeywords
  }
}

export default async function Page({
  params,
}: {
  params: { locale: string}
}) {
  const param = await params;
  const page = await getPost('/', param.locale)

  if(!page)
    notFound()

  return (
      <PageContent page={page}/>
  )
}
