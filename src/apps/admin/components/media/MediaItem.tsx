import Image from "next/image";
import {Settings} from "@theme/settings";
import {useRouter} from 'next/navigation';

export default function MediaItem({media}) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/media/${media.id}`, undefined, {shallow: true});
    };

    return <div
        onClick={handleClick}
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