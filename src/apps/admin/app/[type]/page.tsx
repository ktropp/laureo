import { prisma } from "lib/prisma";
import PostIndex from "./postIndex";

export default async function PostsPage({ params, }: { params: { type: string } }) {
  const param = await params
  const data = await prisma.postLang.findMany({
    select: {
      id: true,
      languageCode: true,
      title: true,
      slug: true
    }
  })

  return <PostIndex type={param.type} initialData={data} />
}
