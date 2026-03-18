import {prisma} from "lib/prisma";
import PostIndex from "./postIndex";
import {Settings} from "@theme/settings";
import {getTranslations} from "next-intl/server";

export async function generateMetadata({
                                           params,
                                       }: {
    params: { type: string }
}) {
    const param = await params;
    const tPosts = await getTranslations('posts')
    const tPages = await getTranslations('pages')
    const PostTypeTitles = {
        page: tPages('meta-title'),
        post: tPosts('meta-title'),
    }
    return {
        title: PostTypeTitles[param.type] || Settings.customPostTypes.filter(postType => postType.slug == param.type)[0].label + " | " + (Settings.cmsName ?? "Laureo CMS"),
    }
}

export default async function PostsPage({params,}: { params: { type: string } }) {
    const param = await params
    const data = await prisma.postLang.findMany({
        where: {
            post: {
                type: param.type.toUpperCase()
            }
        },
        select: {
            post: true,
            id: true,
            languageCode: true,
            title: true,
            slug: true,
        }
    })

    return <PostIndex type={param.type} initialData={data}/>
}
