import {PostLang} from "@prisma/client";
import {prisma} from "@front/lib/prisma";

export type GlobalFieldType = {
    slug: string,
    value: string
}
export default async function getGlobalFields(postLang: PostLang)
{
    const GlobalFields = await prisma.globalField.findMany()
    let Fields = []

    GlobalFields.forEach(field => {
        Fields.push({slug: field.slug, value: field.value})
    })

    if (postLang.postLangMeta) {
        postLang.postLangMeta.forEach(meta => {
            Fields.push({slug: 'meta.' + meta.key, value: meta.value})
        })
    }

    return Fields
}