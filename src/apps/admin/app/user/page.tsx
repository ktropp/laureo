import UsersIndex from "./userIndex";
import {prisma} from "lib/prisma";
import {Metadata} from "next";
import {Settings} from "@theme/settings";

export const metadata: Metadata = {
    title: "Users" + " | " + (Settings.cmsName??"Laureo CMS"),
};

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
