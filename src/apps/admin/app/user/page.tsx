import UsersIndex from "./userIndex";
import {prisma} from "lib/prisma";
import {Settings} from "@theme/settings";
import {getTranslations} from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('users')
    return {
        title: t('meta-title') + " | " + (Settings.cmsName ?? "Laureo CMS"),
    }
}

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
