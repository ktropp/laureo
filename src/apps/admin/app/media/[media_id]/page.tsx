import {getMedia} from "../../../actions/getMedia";
import MediaDetail from "./mediaDetail";
import {Settings} from "@theme/settings";
import {getTranslations} from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('media-item')
    return {
        title: t('meta-title') + " | " + (Settings.cmsName ?? "Laureo CMS"),
    }
}

export default async function MediaItemPage({params}: { params: { type: string } }) {
    const param = await params
    const media = await getMedia(parseInt(param.media_id))
    if(!media){
        redirect('/media')
    }

    return <MediaDetail media={media} />
}
