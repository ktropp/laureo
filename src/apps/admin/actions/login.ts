'use server';
import {LoginFormSchema, LoginFormState} from "lib/definitions";
import {prisma} from "lib/prisma";
import bcrypt from "bcrypt";
import {createSession} from "../lib/session";
import {redirect} from "next/navigation";

export async function login(state: LoginFormState, formData: FormData) {
    // validate fields
    const validatedFields = LoginFormSchema.safeParse({
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
    const {email, password} = validatedFields.data

    // Auth user
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
            password: true,
        },
    });

    if (!user) {
        return {
            message: 'Invalid email or password.'
        }
    }


    // Compare the password with the stored hash
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return {
            message: 'Invalid email or password.'
        }
    }

    // Login user
    await createSession(user.id)

    // redirect to /
    redirect('/')
}
