"use server"

import {UserEditFormSchema, UserEditFormState} from "../lib/definitions";
import {prisma} from "../lib/prisma";

export async function userEdit(state: UserEditFormState, formData: FormData) {
    // validate fields
    const validatedFields = UserEditFormSchema.safeParse({
        id: formData.get('id'),
        name: formData.get('name'),
        surname: formData.get('surname'),
        role: formData.get('role'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const {id, name, surname, role} = validatedFields.data;

    // Update user
    const result = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: name,
            surname: surname,
        }
    })

    return {
        data: {
            name: name,
            surname: surname,
            role: role,
        }
    }
}