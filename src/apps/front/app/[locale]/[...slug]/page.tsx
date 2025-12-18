import { notFound } from "next/navigation"
import { getPost } from "actions/data"
import PageContent from "components/PageContent";
import {getDictionary} from "../dictionaries";
import { Settings } from "@theme/settings";
import getGlobalFields from "@front/lib/globalFields";

export async function generateMetadata({
  params,
}: {
  params: { locale: string, slug: string }
}) {
  const param = await params;
  const page = await getPost(param.slug, param.locale)
  return {
    title: page?.metaTitle + " | " + (Settings.appName??"Laureo CMS"),
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

  const dict = await getDictionary(param.locale)
  const GlobalFields = await getGlobalFields(page)

  return (
      <PageContent page={page} dict={dict} GlobalFields={GlobalFields}/>
  )
}
