import { PostForm } from "../post-form"
import { prisma } from "lib/prisma";
import { Settings } from "@theme/settings";
import {getPostLang} from "../../../actions/getPostLang";

export async function generateMetadata({
                                           params,
                                       }: {
    params: { type: string, id: string }
}) {
    const param = await params;
    const postLang = await getPostLang(parseInt(param.id))

    return {
        title: "Edit " + param.type +  ' "' + postLang.title + '"' + " | " + (Settings.cmsName ?? "Laureo CMS"),
    }
}

export default async function PostEditPage({
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

  return <PostForm post={post} />
}
