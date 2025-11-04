import {prisma} from "lib/prisma";
import MenuIndex from "./menuIndex";
import {Metadata} from "next";
import {Settings} from "@theme/settings";

export const metadata: Metadata = {
    title: "Menus" + " | " + (Settings.cmsName??"Laureo CMS"),
};

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
