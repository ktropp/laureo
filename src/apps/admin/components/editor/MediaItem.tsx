import Image from "next/image";
import {Settings} from "@theme/settings";
import {useState} from "react";
import {Check} from "lucide-react";

export default function MediaItem({media}) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return <div
        onClick={handleClick}
        className={`max-h-50 relative flex items-center justify-center border border-laureo-border dark:border-laureo-border-dark rounded-md p-4 cursor-pointer ${isActive ? 'bg-laureo-border/30 dark:bg-laureo-border-dark/30 outline-2' : ''}`}
    >
        {isActive && <div className="absolute -right-2 -top-2 p-1 bg-laureo-primary text-laureo-text rounded-md"><Check size={20} /></div>}
        <Image
            src={`${Settings.cdnUrl}/${media.id}_${media.file}`}
            width={200}
            height={200}
            alt={media.file}
        />
    </div>
}
