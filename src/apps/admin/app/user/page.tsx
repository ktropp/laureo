import UsersIndex from "./userIndex";
import {prisma} from "lib/prisma";

export default async function UsersPage() {

    const data = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            surname: true,
            role: true,
        }
    })

    return <UsersIndex initialData={data} />
}
