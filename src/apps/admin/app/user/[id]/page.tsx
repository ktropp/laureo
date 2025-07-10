import {prisma} from "../../../lib/prisma";

export default async function User({
    params,
                                   }: {
    params: Promise<{ id: number}>
}) {
    const { id } = await params
    const user = prisma.user.findFirstOrThrow({
        where: {
            id: id
        }
    })

    return (
        <div>
            <h1 className="text-4xl font-bold">User</h1>
        </div>
    )
}
