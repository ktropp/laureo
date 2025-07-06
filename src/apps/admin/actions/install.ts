'use server';
import {InstallFormSchema, InstallFormState} from "lib/definitions";
import {prisma} from "lib/prisma";
import bcrypt from "bcrypt";

export async function install(state: InstallFormState, formData: FormData) {
    // validate fields
    const validatedFields = InstallFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Prepare data
    const { email, password } = validatedFields.data
    // Hash password before storage
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert User
    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
            role: 'ADMIN',
        },
        select: {
            id: true,
        },
    })

    if(!user) {
        return {
            message: 'An error occurred while creating user.'
        }
    }

    // Redirect to login
    return {
        redirect: {
            destination: '/login',
            permanent: false,
        },
    }
}