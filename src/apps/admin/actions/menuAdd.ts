"use server"

import {currentUser} from "lib/session";
import {MenuAddFormSchema, MenuAddFormState} from "../lib/definitions";
import {prisma} from "../lib/prisma";
import {redirect} from "next/navigation";
import {Settings} from "../../../../theme/settings";

export async function menuAdd(state: MenuAddFormState, formData: FormData) {
    // data from form
    const dataFromForm = {
        id: formData.get('id'),
        languageCode: formData.get('languageCode'),
        location: formData.get('location'),
        title: formData.get('title'),
    }

    if (dataFromForm.id) {
        const menu = await prisma.menuLang.findUnique({
            where: {
                id: parseInt(dataFromForm.id)
            },
            select: {
                languageCode: true
            }
        })
        dataFromForm.languageCode = menu.languageCode;
    }

    // validate fields
    const validatedFields = MenuAddFormSchema.safeParse(dataFromForm);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            data: dataFromForm
        }
    }

    const {location, title, languageCode} = validatedFields.data;

    const author = await currentUser()

    if (dataFromForm.id) {
        //update
        await prisma.menuLang.update({
            where: {
                id: parseInt(dataFromForm.id)
            },
            data: {
                title: title,
            },
            select: {
                id: true
            }
        })
    } else {
        //add
        const result = await prisma.menu.create({
            data: {
                authorId: author.id,
                location: location,
            },
            select: {
                id: true
            }
        });

        const resultLang = await prisma.menuLang.create({
            data: {
                menuId: result.id,
                languageCode: languageCode || Settings.defaultLanguage,
                title: title,
            },
            select: {
                id: true
            }
        })
        return redirect(`/menu/${resultLang.id}`)
    }

}
