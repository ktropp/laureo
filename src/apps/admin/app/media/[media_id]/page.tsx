import {getMedia} from "../../../actions/getMedia";
import MediaDetail from "./mediaDetail";

export default async function MediaItemPage({params}: { params: { type: string } }) {
    const param = await params
    const media = await getMedia(parseInt(param.media_id))
    if(!media){
        redirect('/media')
    }

    return <MediaDetail media={media} />
}
