import {promises as fs} from "fs";
import path from "path";
import {prisma} from "lib/prisma";
import { currentUser } from "lib/session";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
        return new Response("No files uploaded", {status: 400});
    }

    // Make sure the upload directory exists
    const uploadDir = path.resolve(process.cwd(), "../../../uploads");

    // Process files sequentially or in parallel
    const author = await currentUser()

    for (const file of files) {
        const media = await prisma.media.create({
            data: {
                authorId: author.id,
                file: file.name
            },
            select: {
                id: true
            }
        })

        if(!media) {
            return new Response("An error occurred while creating media.", {status: 500})
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const filePath = path.join(uploadDir, `${media.id}_${file.name}`);

        await fs.writeFile(filePath, buffer);
    }

    //TODO: this is not working here
    revalidatePath('/media')

    return new Response("Files uploaded successfully", {status: 200});
}
