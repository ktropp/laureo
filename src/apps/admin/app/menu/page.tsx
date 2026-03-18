import {prisma} from "lib/prisma";
import MenuIndex from "./menuIndex";
import {Settings} from "@theme/settings";
import {getTranslations} from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('menus')
    return {
        title: t('meta-title') + " | " + (Settings.cmsName ?? "Laureo CMS"),
    }
}

export default async function MenuPage({params,}: { params: { type: string } }) {
    const data = await prisma.menuLang.findMany({
        select: {
            id: true,
            languageCode: true,
            title: true,
            menu: true
        }
    })

    return <MenuIndex initialData={data}/>
}
