"use server"

import {currentUser} from "lib/session";
import {PostAddFormSchema, PostAddFormState} from "../lib/definitions";
import {prisma} from "../lib/prisma";
import {redirect} from "next/navigation";
import {Settings} from "@theme/settings";
import fs from 'fs';
import path from 'path';

const extractAndSaveClasses = async (blocksParsed: BlockJson[]) => {
    // Function to recursively get all classNames from blocks
    const getAllClassNames = (blocks: BlockJson[]): string[] => {
        let classNames: string[] = [];

        blocks.forEach(block => {
            if (block.className) {
                // Split className string by spaces and add to array
                classNames = [...classNames, ...block.className.split(' ')];
            }

            // Recursively process children if they exist
            if (block.children && block.children.length > 0) {
                classNames = [...classNames, ...getAllClassNames(block.children)];
            }
        });

        return classNames;
    };

    // Get all classNames and make them unique
    const classNames = [...new Set(getAllClassNames(blocksParsed))];
    const safelistPath = path.join(process.cwd(), 'safelist.txt');

    // Read existing content
    let existingClasses: string[] = [];
    try {
        const content = fs.readFileSync(safelistPath, 'utf-8');
        existingClasses = content.split('\n').filter(className => className.trim() !== '');
    } catch (error) {
        // File doesn't exist yet, that's okay
    }

    // Filter out classes that already exist
    const newClasses = classNames.filter(className =>
        className.trim() !== '' && !existingClasses.includes(className)
    );

    // If we have new classes, append them
    if (newClasses.length > 0) {
        const contentToAdd = newClasses.join('\n');
        fs.appendFileSync(safelistPath,
            (existingClasses.length > 0 ? '\n' : '') + contentToAdd
        );
    }
};

export async function postAdd(state: PostAddFormState, formData: FormData) {
    // data from form
    const dataFromForm = {
        id: formData.get('id'),
        languageCode: formData.get('languageCode'),
        type: formData.get('type'),
        status: formData.get('status'),
        title: formData.get('title'),
        slug: formData.get('slug'),
        blocks: formData.get('blocks'),
        metaTitle: formData.get('metaTitle'),
        metaDescription: formData.get('metaDescription'),
        metaKeywords: formData.get('metaKeywords'),
    }

    if (dataFromForm.id) {
        const post = await prisma.postLang.findUnique({
            where: {
                id: parseInt(dataFromForm.id)
            },
            select: {
                languageCode: true
            }
        })
        dataFromForm.languageCode = post.languageCode;
    }

    // validate fields
    const validatedFields = PostAddFormSchema.safeParse(dataFromForm);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            data: dataFromForm
        }
    }

    const {
        type,
        title,
        slug,
        status,
        blocks,
        metaTitle,
        metaDescription,
        metaKeywords,
        languageCode
    } = validatedFields.data;

    const blocksParsed = JSON.parse(blocks)

    await extractAndSaveClasses(blocksParsed)

    const author = await currentUser()

    if (dataFromForm.id) {
        //update
        return await prisma.postLang.update({
            where: {
                id: parseInt(dataFromForm.id)
            },
            data: {
                status: status,
                title: title,
                slug: slug,
                blocks: blocksParsed,
                metaTitle: metaTitle,
                metaDescription: metaDescription,
                metaKeywords: metaKeywords,
            },
            select: {
                id: true,
                status: true,
                title: true,
                slug: true,
                metaTitle: true,
                metaDescription: true,
                metaKeywords: true
            }
        })
    } else {
        //add
        const result = await prisma.post.create({
            data: {
                authorId: author.id
            },
            select: {
                id: true
            }
        });

        const resultLang = await prisma.postLang.create({
            data: {
                postId: result.id,
                languageCode: languageCode || Settings.defaultLanguage,
                status: status,
                title: title,
                slug: slug,
                blocks: blocks,
                metaTitle: metaTitle,
                metaDescription: metaDescription,
                metaKeywords: metaKeywords,
            },
            select: {
                id: true
            }
        })
        return redirect(`/${type.toLowerCase()}/${resultLang.id}`)
    }

}
