import { prisma } from "lib/prisma";
import { UserForm } from "./user-form";

export default async function UserPage({
    params,
}: {
    params: { id: string }
}) {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        },
        select: {
            id: true,
            email: true,
            name: true,
            surname: true,
            role: true
        }
    });

    if (!user) {
        throw new Error('User not found');
    }

    return <UserForm user={user} />;
}
