"use server"
import {headers} from "next/headers"
import {Settings} from "@theme/settings";
import {getPost} from "@front/actions/data";
import {BlockJson} from "@admin/blocks/blockDefinitions";
import {z} from "zod";

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
        languageCode = Settings.languages.filter(lang => lang.code.slice(0, 2) === urlSplit[0])[0].code || languageCode
    }
    const postLang = await getPost(urlSplit, languageCode)
    const formId = formData.get('formId')

    if (!formId || !postLang?.blocks) {
        return null;
    }

    const blockChildren = findBlockChildren(postLang.blocks, formId.toString());

    let fields = []
    blockChildren?.map(block => {
        if (block?.text) {
            const cleanText = block?.text.replace(/<[^>]*>/g, '').trim();

            // Match the pattern: type* name "placeholder"
            const regex = /^(\w+\*?)[\s]+([^\s"]+)[\s]+"([^"]*)"$/;
            const match = cleanText.match(regex);

            if (!match) return null;

            const [, typeWithStar, name, placeholder] = match;
            const isRequired = typeWithStar.endsWith('*');
            const type = typeWithStar.replace('*', '');
            if (isRequired) {
                fields.push({
                    name: name, fieldType: z.string().trim()
                })
            } else {
                fields.push({
                    name: name, fieldType: z.string().optional()
                })
            }
        }
    })
    fields = fields as { name: string, fieldType: z.ZodSchema }[]

    const generateSchemaFromFields = (fields: { name: string; fieldType: z.ZodSchema }[]) => {
        const schemaObject = Object.fromEntries(fields.map((field) => [field.name, field.fieldType]))

        return z.object(schemaObject)
    }

    const schema = generateSchemaFromFields(fields)

    //load locale zod
    //https://zod.dev/error-customization#internationalization

    const validatedFields = schema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    //send email

    //return success
}