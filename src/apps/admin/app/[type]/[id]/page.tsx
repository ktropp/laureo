
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
      postId: true,
      post: {
        include: {
          translations: true
        }
      },
      status: true,
      title: true,
      slug: true,
      languageCode: true,
      blocks: true,
      metaTitle: true,
      metaDescription: true,
      metaKeywords: true
    }
  });

  if (!post) {
    throw new Error('Post not found');
  }

  const languages = process.env.LANGUAGES?.split(',');

  const mergedLanguages = languages.map(code => {
    const match = post.post.translations.find(pl => pl.languageCode === code);
    return {
      languageCode: code,
      postLang: match || null
    }
  })
  console.log(mergedLanguages)

  return <PostForm post={post} languages={mergedLanguages} />
}
