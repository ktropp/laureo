import {X} from "lucide-react";
import {Label} from "components/ui/label";
import {Input} from "components/ui/input";
import {useRouter} from 'next/navigation';
import {Settings} from "@theme/settings";
import Image from "next/image";
import { deleteMedia } from "actions/deleteMedia";
import {toast} from "react-toastify";

export default function MediaModal({media}) {
    const router = useRouter();

    const handleClose = () => {
        router.push('/media', undefined, {shallow: true});
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this file?')) {
            const result = await deleteMedia(media.id)
            if (result.success) {
                toast.success('Media deleted successfully')
                router.push('/media')
            } else {
                toast.error(result.error || 'Failed to delete media')
            }
        }
    }

    if (!media) return null;
    return <div
        className="fixed w-full h-full top-0 left-0 flex items-center justify-center bg-black/70 z-90 p-4 xl:p-8">
        <div className="bg-laureo-body dark:bg-laureo-body-dark rounded-md w-full h-full">
            <div className="flex justify-between border-b border-laureo-border dark:border-laureo-border-dark">
                <div className="text-xl font-semibold p-4">Detail file information</div>
                <div className="flex">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="cursor-pointer p-4 w-15 h-15 flex items-center justify-center border-l border-laureo-border rounded-tr-md dark:border-laureo-border-dark hover:bg-laureo-secondary hover:text-laureo-body transition-colors"
                    >
                        <X size={20}/>
                    </button>
                </div>
            </div>
            <div className="flex h-[calc(100%-61px)]">
                <div className="w-3/5 flex items-center justify-center p-4">
                    <Image
                        src={`${Settings.cdnUrl}/${media.id}_${media.file}`}
                        width={600}
                        height={600}
                        alt={media.file}
                    />
                </div>
                <div
                    className="w-2/5 p-4 border-l h-full border-laureo-border dark:border-laureo-border-dark bg-laureo-border/30 dark:bg-laureo-border-dark/30 text-sm">
                    <div
                        className="flex flex-col gap-0.5 border-b border-laureo-border dark:border-laureo-border-dark pb-4 mb-4">
                        <p><strong>Uploaded: </strong>
                            <span>{new Intl.DateTimeFormat().format(new Date(media.created_at))}</span></p>
                        <p><strong>User: </strong> <span>{media.author.name + " " + media.author.surname}</span></p>
                        <p><strong>File name: </strong> <span>{media.file}</span></p>
                        {media.type && <p><strong>File type: </strong> <span>{media.type}</span></p>}
                        {media.size && <p><strong>File size: </strong> <span>{media.size}</span></p>}
                        {media.width && media.height &&
                            <p><strong>File dimensions: </strong> <span>{media.width}x{media.height} px</span></p>}
                    </div>
                    <div
                        className="flex flex-col gap-0.5 border-b border-laureo-border dark:border-laureo-border-dark pb-4 mb-4">
                        <div className="space-y-2 mb-2">
                            <Label htmlFor="alt">Alt</Label>
                            <Input
                                id="alt"
                                type="text"
                                placeholder="Enter alt"
                                name="alt"
                                defaultValue={media.alt}
                            />
                        </div>
                        <div className="space-y-2 mb-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter title"
                                name="title"
                                defaultValue={media.title}
                            />
                        </div>
                        <div className="space-y-2 mb-2">
                            <Label htmlFor="url">Url</Label>
                            <Input
                                id="url"
                                type="text"
                                name="url"
                                readOnly={true}
                                defaultValue={`${Settings.cdnUrl}/${media.id}_${media.file}`}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            className="cursor-pointer"
                        >
                            TODO: Download file
                        </button>
                        <span>|</span>
                        <button
                            type="button"
                            className="cursor-pointer text-laureo-error"
                            onClick={handleDelete}
                        >
                            Delete file permanently
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}