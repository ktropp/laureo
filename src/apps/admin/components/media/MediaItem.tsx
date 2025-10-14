import Image from "next/image";
import {Settings} from "@theme/settings";

export default function MediaItem({media}) {
    return <div
        className="flex items-center justify-center border border-laureo-border dark:border-laureo-border-dark rounded-md p-4 cursor-pointer"
    >
        <Image
            src={`${Settings.cdnUrl}/${media.id}_${media.file}`}
            width={200}
            height={200}
            alt={media.file}
        />
    </div>
}