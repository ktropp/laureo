import {prisma} from "lib/prisma";
import MediaIndex from "./mediaIndex";
import {Metadata} from "next";
import {Settings} from "@theme/settings";

export const metadata: Metadata = {
    title: "Media" + " | " + (Settings.cmsName??"Laureo CMS"),
};

export default async function MediaPage({params}: { params: { type: string } }) {
    const data = await prisma.media.findMany()

    return <MediaIndex initialData={data}/>
}
