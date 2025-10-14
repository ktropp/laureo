import {Media} from "@prisma/client";
import MediaItem from "./MediaItem";

export default function MediaListing({data}) {

    return <div
        className="grid grid-cols-10 gap-4 mt-4"
    >
        {data.map((media, index) => <MediaItem key={index} media={media}/>)}
    </div>

}