"use server"
import {headers} from "next/headers"
import {Settings} from "@theme/settings";
import {getPost} from "@front/actions/data";
import {BlockJson} from "@admin/blocks/blockDefinitions";
import {z} from "zod";
import {getDictionary} from "@front/app/[locale]/dictionaries";
import {getFieldValidationRules, getValidationSchema} from "@front/actions/validate";
import {sendMail} from "@front/lib/mail";

function findBlockChildren(blocks: BlockJson[], formId: string): BlockJson[] | null {
    for (const block of blocks) {
        if (block.index === formId) {
            return block.children || [];
        }

        if (block.children && block.children.length > 0) {
            const foundChildren = findBlockChildren(block.children, formId);
            if (foundChildren !== null) {
                return foundChildren;
            }
        }
    }

    return null;
}

async function loadLocale(languageCode: string) {
    const {default: locale} = await import(`zod/v4/locales/${languageCode}.js`);
    z.config(locale());
}

export async function sendForm(state, formData: FormData) {
    const headersList = await headers()
    const referer = headersList.get('referer')
    let url = referer.replace(Settings.frontendUrl, '')
    if (url.startsWith('/')) {
        url = url.slice(1)
    }
    const urlSplit = url.split('/')
    let languageCode = Settings.defaultLanguage.slice(0, 2)
    if (urlSplit.length > 1) {
        languageCode = Settings.languages.filter(lang => lang.slice(0, 2) === urlSplit[0])?.[0]?.slice(0,2) || languageCode
    }
    const postLang = await getPost(urlSplit, languageCode)
    const formId = formData.get('formId')

    if (!formId || !postLang?.blocks) {
        return null;
    }

    const dict = await getDictionary(languageCode)

    const blockChildren = findBlockChildren(postLang.blocks, formId.toString());

    let fields = []
    blockChildren?.map(block => {
        if (block?.text) {
            const field = getFieldValidationRules(block?.text, dict)

            if (field)
                fields.push(field)
        }
    })

    const schema = getValidationSchema(fields)

    await loadLocale(languageCode);

    const data = Object.fromEntries(formData.entries())
    const validatedFields = schema.safeParse(data);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            data: data
        }
    }

    //send email
    try {
        //const sent = await sendMail()
    } catch (error) {

    }

    //return success
    return {
        success: dict.validation.success,
        data: {}
    }
}