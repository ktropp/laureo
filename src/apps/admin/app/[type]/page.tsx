import {prisma} from "lib/prisma";
import PostIndex from "./postIndex";
import {Settings} from "@theme/settings";

export async function generateMetadata({
                                           params,
                                       }: {
    params: { type: string }
}) {
    const param = await params;
    return {
        title: param.type.charAt(0).toUpperCase() + param.type.slice(1) + "s" + " | " + (Settings.cmsName ?? "Laureo CMS"),
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
