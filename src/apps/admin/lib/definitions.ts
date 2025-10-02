import {z} from 'zod'

export type SessionPayload = {
    userId: number;
    expiresAt: Date;
};

export const InstallFormSchema = z.object({
    email: z.string().email({message: 'Please enter a valid email.'}).trim(),
    password: z
        .string()
        .min(8, {message: 'Password must be at least 8 characters long'})
        .regex(/[a-zA-Z]/, {message: 'Password must contain at least one letter.'})
        .regex(/[0-9]/, {message: 'Password must contain at least one number.'})
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Password must contain at least one special character.',
        })
        .trim(),
});

export type InstallFormState =
    | {
    errors?: {
        email?: string[]
        password?: string[]
    }
    message?: string
    data?: {
        email: string
        password: string
    }
}
    | undefined

export const LoginFormSchema = z.object({
    email: z.string().email({message: 'Please enter a valid email.'}).trim(),
    password: z
        .string()
        .trim(),
});

export type LoginFormState =
    | {
    errors?: {
        email?: string[]
        password?: string[]
    }
    message?: string
    data?: {
        email: string
        password: string
    }
}
    | undefined

export const UserEditFormSchema = z.object({
    id: z.string().trim(),
    name: z.string().trim(),
    surname: z.string().trim(),
    role: z.string().trim(),
});

export type UserEditFormState =
    | {
    errors?: {
        id?: string[]
        name?: string[]
        surname?: string[]
        role?: string[]
    }
    message?: string
    data?: {
        id: string
        name: string
        surname: string
        role: string
    }
}
    | undefined

export const UserAddFormSchema = z.object({
    email: z.string().email({message: 'Please enter a valid email.'}).trim(),
    password: z
        .string()
        .min(8, {message: 'Password must be at least 8 characters long'})
        .regex(/[a-zA-Z]/, {message: 'Password must contain at least one letter.'})
        .regex(/[0-9]/, {message: 'Password must contain at least one number.'})
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Password must contain at least one special character.',
        })
        .trim(),
    name: z.string().trim(),
    surname: z.string().trim(),
    role: z.string().trim(),
});

export type UserAddFormState =
    | {
    errors?: {
        email?: string[]
        password?: string[]
        name?: string[]
        surname?: string[]
        role?: string[]
    }
    message?: string
    data?: {
        email: string
        password: string
        name: string
        surname: string
        role: string
    }
}
    | undefined

export const PostAddFormSchema = z.object({
    id: z.string().optional(),
    type: z.string().trim(),
    status: z.string().trim(),
    title: z.string().trim(),
    slug: z.string().trim(),
    languageCode: z.string().trim(),
    blocks: z.string().trim(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.string().optional(),
});

export type PostAddFormState =
    | {
    errors?: {
        type?: string[]
        status?: string[]
        title?: string[]
        slug?: string[]
        languageCode?: string[]
        blocks?: string[]
        metaTitle?: string[]
        metaDescription?: string[]
        metaKeywords?: string[]
    }
    message?: string
    data?: {
        type: string
        status: string
        title: string
        slug: string
        languageCode: string
        blocks: string
        metaTitle: string
        metaDescription: string
        metaKeywords: string
    }
}
    | undefined

export const MenuAddFormSchema = z.object({
    id: z.string().optional(),
    location: z.string().nullish(),
    title: z.string().trim(),
    languageCode: z.string().trim(),
});

export type MenuAddFormState =
    | {
    errors?: {
        location?: string[]
        title?: string[]
        languageCode?: string[]
    }
    message?: string
    data?: {
        location: string
        title: string
        languageCode: string
    }
}
    | undefined
