import {prisma} from "lib/prisma";
import MediaIndex from "./mediaIndex";
import {Settings} from "@theme/settings";
import {getTranslations} from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('media')
    return {
        title: t('meta-title') + " | " + (Settings.cmsName ?? "Laureo CMS"),
    }
}

export default async function MediaPage({params}: { params: { type: string } }) {
    const data = await prisma.media.findMany()

    return <MediaIndex initialData={data}/>
}
