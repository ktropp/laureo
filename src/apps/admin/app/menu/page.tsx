import {prisma} from "lib/prisma";
import MenuIndex from "./menuIndex";

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
