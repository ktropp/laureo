import {X} from "lucide-react"
import {useState, useEffect} from "react";
import {getAllMedia} from "../../actions/getAllMedia";
import MediaItem from "./MediaItem";
import {Button} from "components/ui/button";
import {Settings} from "@theme/settings";
import {Label} from "components/ui/label";
import {Input} from "../ui/input";

export default function MediaEditor({slug, blockIndex, onMediaEditorClose, onMediaSelect}) {

    const accordionItems = [
        {
            label: 'Upload files',
            slug: 'upload'
        },
        {
            label: 'Media library',
            slug: 'media'
        }
    ]

    const [currentAccordionSlug, setCurrentAccordionSlug] = useState(slug);
    const [isLoading, setIsLoading] = useState(false);
    const [mediaItems, setMediaItems] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);

    const [alt, setAlt] = useState(selectedMedia?.alt);
    const [title, setTitle] = useState(selectedMedia?.title);
    const [width, setWidth] = useState(selectedMedia?.width);
    const [height, setHeight] = useState(selectedMedia?.height);


    useEffect(() => {
        const fetchMediaItems = async () => {
            try {
                setIsLoading(true)
                const data = await getAllMedia()
                setMediaItems(data)
            } catch (error) {
                console.error('Error fetching media items:', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (currentAccordionSlug === 'media') {
            fetchMediaItems()
        }
    }, [currentAccordionSlug])

    const handleMediaSelect = (media_id: number) => {
        const media = mediaItems.find(media => media.id === media_id);
        setSelectedMedia(media);
        setAlt(media?.alt);
        setTitle(media?.title);
        setWidth(media?.width);
        setHeight(media?.height);
    }


    return <div
        className="fixed w-full h-full top-0 left-0 flex items-center justify-center bg-black/70 z-90 p-4 xl:p-8">
        <div className="bg-laureo-body dark:bg-laureo-body-dark rounded-md w-full h-full">
            <div className="flex justify-between border-b border-laureo-border dark:border-laureo-border-dark">
                <div className="text-xl font-semibold p-4">Choose or upload media file</div>
                <div className="flex">
                    <button
                        type="button"
                        onClick={onMediaEditorClose}
                        className="cursor-pointer p-4 w-15 h-15 flex items-center justify-center border-l border-laureo-border rounded-tr-md dark:border-laureo-border-dark hover:bg-laureo-secondary hover:text-laureo-body transition-colors"
                    >
                        <X size={20}/>
                    </button>
                </div>
            </div>
            {accordionItems &&
                <div className="flex gap-4 px-4 pt-4 border-b border-laureo-border dark:border-laureo-border-dark">
                    {accordionItems.map((item, index) => (
                        <button
                            type="button"
                            className={`px-3 py-2 text-laureo-base border-t border-l border-r cursor-pointer ${currentAccordionSlug === item.slug ? 'text-laureo-primary border-laureo-border dark:border-laureo-border-dark relative after:absolute after:left-0 after:bottom-[-1px] after:w-full after:h-px after:bg-laureo-body dark:after:bg-laureo-body-dark after:content-[""]' : 'hover:text-laureo-primary border-transparent'}`}
                            key={index}
                            onClick={() => setCurrentAccordionSlug(item.slug)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            }
            {accordionItems && accordionItems.map((item, index) => {
                    return currentAccordionSlug === item.slug && (
                        <div
                            key={index}
                            className={`h-[calc(100%-119px)] flex`}
                        >
                            {(() => {
                                switch (item.slug) {
                                    case 'upload':
                                        return <div className="p-4">todo: upload</div>;
                                    case 'media':
                                        return (
                                            <div className="flex flex-col">
                                                <div className="flex flex-1">
                                                    <div className="flex-1 flex p-4">
                                                        {isLoading ? (<div>Loading...</div>) : (
                                                            <div className="grid grid-cols-10 gap-4">
                                                                {mediaItems.map((media, index) => <MediaItem key={index}
                                                                                                             media={media}
                                                                                                             isActive={selectedMedia?.id === media.id}
                                                                                                             onMediaSelect={() => handleMediaSelect(media.id)}/>)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="w-75 p-4 border-l h-full border-laureo-border dark:border-laureo-border-dark bg-laureo-border/30 dark:bg-laureo-border-dark/30 text-sm">
                                                        {selectedMedia && (
                                                            <>
                                                                <div
                                                                    className="flex flex-col gap-0.5 border-b border-laureo-border dark:border-laureo-border-dark pb-4 mb-4">
                                                                    <p><strong>Uploaded: </strong>
                                                                        <span>{new Intl.DateTimeFormat().format(new Date(selectedMedia.created_at))}</span>
                                                                    </p>
                                                                    <p><strong>User: </strong>
                                                                        <span>{selectedMedia.author.name + " " + selectedMedia.author.surname}</span>
                                                                    </p>
                                                                    <p><strong>File name: </strong>
                                                                        <span>{selectedMedia.file}</span>
                                                                    </p>
                                                                    {selectedMedia.type && <p><strong>File type: </strong>
                                                                        <span>{selectedMedia.type}</span></p>}
                                                                    {selectedMedia.size && <p><strong>File size: </strong>
                                                                        <span>{selectedMedia.size}</span></p>}
                                                                    {selectedMedia.width && selectedMedia.height &&
                                                                        <p><strong>File dimensions: </strong>
                                                                            <span>{selectedMedia.width}x{selectedMedia.height} px</span>
                                                                        </p>}
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
                                                                            requuired
                                                                            defaultValue={selectedMedia?.alt}
                                                                            onChange={(e) => setAlt(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2 mb-2">
                                                                        <Label htmlFor="title">Title</Label>
                                                                        <Input
                                                                            id="title"
                                                                            type="text"
                                                                            placeholder="Enter title"
                                                                            name="title"
                                                                            defaultValue={selectedMedia?.title}
                                                                            onChange={(e) => setTitle(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2 mb-2">
                                                                        <Label htmlFor="width">Width</Label>
                                                                        <Input
                                                                            id="width"
                                                                            type="text"
                                                                            name="width"
                                                                            required
                                                                            defaultValue={selectedMedia?.width}
                                                                            onChange={(e) => setWidth(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2 mb-2">
                                                                        <Label htmlFor="height">Height</Label>
                                                                        <Input
                                                                            id="height"
                                                                            type="text"
                                                                            name="height"
                                                                            required
                                                                            defaultValue={selectedMedia?.height}
                                                                            onChange={(e) => setHeight(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                        }
                                                    </div>
                                                </div>
                                                <div
                                                    className="flex justify-end border-t p-4 border-laureo-border dark:border-laureo-border-dark">
                                                    <Button
                                                        type="button"
                                                        disabled={!selectedMedia}
                                                        onClick={() => onMediaSelect(selectedMedia.id, Settings.cdnUrl + "/" + selectedMedia.id + "_" + selectedMedia.file, alt, title, width, height, blockIndex)}
                                                    >Select</Button>
                                                </div>
                                            </div>
                                        )
                                }
                            })()}
                        </div>
                    )
                }
            )}
        </div>
    </div>
}