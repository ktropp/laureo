import { notFound } from "next/navigation";
import { getPost } from "actions/data";
import PageContent from "components/PageContent";
import {getDictionary} from "./dictionaries";
import {Settings} from "@theme/settings";
import getGlobalFields from "@front/lib/globalFields";

export async function generateMetadata({
  params,
}: {
    params: { locale: string}
  }){
  const param = await params;
  const post = await getPost('/', param.locale)
  return {
    title: post.metaTitle + " | " + (Settings.appName??"Laureo CMS"),
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

  const dict = await getDictionary(param.locale)
  const GlobalFields = await getGlobalFields(page)

  return (
      <PageContent page={page} dict={dict} GlobalFields={GlobalFields}/>
  )
}
