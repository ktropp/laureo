import {X} from "lucide-react"
import {useState, useEffect} from "react";
import {getAllMedia} from "../../actions/getAllMedia";
import MediaItem from "./MediaItem";
import {Button} from "components/ui/button";
import {Settings} from "@theme/settings";

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
        setSelectedMedia(mediaItems.find(media => media.id === media_id))
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
                                                                <p><strong>File type: </strong> <span></span></p>
                                                                <p><strong>File size: </strong> <span></span></p>
                                                                <p><strong>File dimensions: </strong> <span></span></p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div
                                                    className="flex justify-end border-t p-4 border-laureo-border dark:border-laureo-border-dark">
                                                    <Button
                                                        type="button"
                                                        disabled={!selectedMedia}
                                                        onClick={() => onMediaSelect(selectedMedia.id, Settings.cdnUrl+"/"+selectedMedia.id+"_"+selectedMedia.file, 'TODO:alt', 200, 200, blockIndex)}
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