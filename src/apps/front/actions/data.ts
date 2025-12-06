import {Settings} from "@theme/settings";
import {prisma} from "../lib/prisma"
import {cache} from 'react'

export const getPost = cache(async (slug: string, languageCode: string) => {
    const languages = Settings.languages;
    let langCode = languageCode;
    if (languageCode.length == 2) {
        languages.forEach(lang => {
            if (languageCode == lang.slice(0, 2)) {
                langCode = lang
            }
        })
    }
    if (slug.length == 1) {
        return await prisma.postLang.findFirst({
            where: {
                slug: slug[0],
                languageCode: langCode,
                status: 'PUBLISHED',
                post: {
                    type: 'PAGE'
                }
            },
            select: {
                id: true,
                title: true,
                slug: true,
                blocks: true,
                languageCode: true,
                metaTitle: true,
                metaDescription: true,
                metaKeywords: true,
                status: true,
                postLangMeta: true
            }
        })
    } else {
        let customPostType = false
        Settings.customPostTypes.map(type => {
            type.rewrite.filter(rewrite => rewrite.lang == languageCode && rewrite.rewrite == slug[0]).map(rewrite => {
                customPostType = type.slug
            })
        })
        if (customPostType) {
            return await prisma.postLang.findFirst({
                where: {
                    slug: slug[1],
                    languageCode: langCode,
                    status: 'PUBLISHED',
                    post: {
                        type: customPostType.toString().toUpperCase()
                    }
                },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    blocks: true,
                    languageCode: true,
                    metaTitle: true,
                    metaDescription: true,
                    metaKeywords: true,
                    status: true,
                    postLangMeta: true
                }
            })
        }
    }

    return false
})

export const getLanguageCode = (locale: string) => {
    let langCode = locale;
    const languages = Settings.languages;
    languages.forEach(lang => {
        if (locale == lang.slice(0, 2)) {
            langCode = lang;
        }
    });

    return langCode;
}