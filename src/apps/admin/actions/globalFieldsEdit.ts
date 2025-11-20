"use server"

import {GlobalFieldFormState} from "../lib/definitions";
import {prisma} from "../lib/prisma";
import {Settings} from "@theme/settings";

export async function globalFieldsEdit(state: GlobalFieldFormState, formData: FormData) {
    const globalFields = Settings.globalFields;

    const data = []
    globalFields.map(field => {
        if (formData.get(field.slug)) {
            data.push({slug: field.slug, value: formData.get(field.slug)})
        }
    })

    if (data.length) {
        data.map(async field => {
            await prisma.GlobalField.upsert({
                where: {slug: field.slug},
                create: {slug: field.slug, value: field.value},
                update: {value: field.value}
            })
        })

        return {
            data: await prisma.GlobalField.findMany()
        }
    }

    return false
}
