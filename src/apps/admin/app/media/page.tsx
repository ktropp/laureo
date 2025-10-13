import {prisma} from "lib/prisma";
import MediaIndex from "./mediaIndex";

export default async function MediaPage({params,}: { params: { type: string } }) {
    const data = await prisma.media.findMany()

    return <MediaIndex initialData={data}/>
}
