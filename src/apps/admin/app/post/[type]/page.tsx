import { prisma } from "/lib/prisma";
import PostIndex from "./postIndex";

export default async function PostsPost({ params, }: { params: { type: string } }) {
  const data = await prisma.postLang.findMany({
    select: {
      id: true,
      languageCode: true,
      title: true,
      slug: true
    }
  })

  return <PostIndex type={params.type} initialData={data} />
}
