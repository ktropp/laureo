
import { PostForm } from "../post-form"
import { prisma } from "lib/prisma";

export default async function PostEditPost({
    params,
}: {
    params: { id: string }
}) {
  const param = await params
  const post = await prisma.postLang.findUnique({
    where: {
      id: parseInt(param.id)
    },
    select: {
      id: true,
      status: true,
      title: true,
      slug: true,
      blocks: true,
      metaTitle: true,
      metaDescription: true,
      metaKeywords: true
    }
  });

  if (!post) {
    throw new Error('Post not found');
  }
  return <PostForm post={post} />
}
