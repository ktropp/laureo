import {Media} from "@prisma/client";
import MediaItem from "./MediaItem";

export default function MediaListing({data}) {

    return data.map((media, index) => <MediaItem key={index} media={media}/>)

}