import {promises as fs} from "fs";
import path from "path";
import {prisma} from "lib/prisma";
import {currentUser} from "lib/session";
import {revalidatePath} from "next/cache";

import sizeOf from "image-size";

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
        let data = {
            authorId: author.id,
            file: file.name,
            type: file.type,
            size: file.size,
        }

        if (file.type.startsWith('image/')) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const dimensions = sizeOf(buffer);
            const {width, height} = dimensions;
            if (width && height) {
                data.width = width;
                data.height = height;
            }
        }

        const media = await prisma.media.create({
            data: data,
            select: {
                id: true
            }
        })

        if (!media) {
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
