"use server"

import {UserAddFormSchema, UserAddFormState} from "../lib/definitions";
import {prisma} from "../lib/prisma";
import {redirect} from "next/navigation";
import bcrypt from "bcrypt";

export async function userAdd(state: UserAddFormState, formData: FormData) {
    // data from form
    const dataFromForm = {
        email: formData.get('email'),
        name: formData.get('name'),
        surname: formData.get('surname'),
        role: formData.get('role'),
        password: formData.get('password'),
    }
    // validate fields
    const validatedFields = UserAddFormSchema.safeParse(dataFromForm);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            data: dataFromForm
        }
    }

    const {email, name, surname, role, password} = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await prisma.user.create({
        data: {
            email: email,
            name: name,
            surname: surname,
            role: role,
            password: hashedPassword,
        },
        select: {
            id: true
        }
    });

    return redirect(`/user/${result.id}`)
}
