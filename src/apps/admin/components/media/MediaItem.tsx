import Image from "next/image";
import {Settings} from "@theme/settings";

export default function MediaItem({media}) {
    return <div>
        <Image
            src={`${Settings.cdnUrl}/${media.id}__${media.file}`}
            width={100}
            height={100}
            alt={media.file}
        />
    </div>
}