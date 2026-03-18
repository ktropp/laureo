import {prisma} from "lib/prisma";
import {UserForm} from "./user-form";
import {getTranslations} from "next-intl/server";
import {Settings} from "@theme/settings";

export async function generateMetadata() {
    const t = await getTranslations('user')
    return {
        title: t('meta-title') + " | " + (Settings.cmsName ?? "Laureo CMS"),
    }
}
export default async function UserPage({
                                           params,
                                       }: {
    params: { id: string }
}) {
    const param = await params
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(param.id)
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

    return <UserForm user={user}/>;
}
