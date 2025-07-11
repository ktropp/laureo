import {prisma} from "../../lib/prisma";
import PagesIndex from "./pageIndex";

export default async function PagesPage() {
    const data = await prisma.post.findMany({
        select: {
            id: true,
        }
    })

    return <PagesIndex initialData={data} />
}
