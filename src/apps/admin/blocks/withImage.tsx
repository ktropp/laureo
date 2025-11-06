import {BlockJson} from "./blockDefinitions";
import {ComponentType} from "react";
import {useState} from "react";
import {Image} from "lucide-react";
import {Button} from "../components/ui/button";

export interface WithEditableProps {
    className?: string;
}

interface BaseBlockProps {
    block: BlockJson;
    onContentChange?: (content: string) => void;
    onMediaEditorOpen?: (slug: string) => void;
    isFocused?: boolean;
}

export function withImage<T extends BaseBlockProps>(
    WrappedComponent: ComponentType<T>,
) {
    return function ImageEditableComponent({
                                               className,
                                               ...props
                                           }: T & WithEditableProps) {
        const isFocused = props.block.isFocused;
        return <div
            className={`${!props.block.src ? "min-h-40 min-w-100 w-full " : ""} ${isFocused ? 'border border-laureo-secondary bg-laureo-border/30 dark:bg-laureo-border-dark/30' : 'bg-laureo-border dark:bg-laureo-border-dark'}`}>
            {!props.block.src && !isFocused && (
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" preserveAspectRatio="none"
                     aria-hidden="true" focusable="false" className="stroke-current max-h-40 w-full">
                    <path vectorEffect="non-scaling-stroke" d="M60 60 0 0"></path>
                </svg>)}
            {!props.block.src && isFocused && (
                <div className="p-4 gap-4 flex flex-col">
                    <div className="flex gap-2 items-center">
                        <Image size={20}/> <span className="text-sm font-semibold">Image</span>
                    </div>
                    <p className="text-sm">Upload or pick an image from the media library</p>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            onClick={() => props.block.onMediaEditorOpen?.('upload')}
                        >
                            Upload
                        </Button>
                        <Button
                            type="button"
                            onClick={() => props.block.onMediaEditorOpen?.('media')}
                            variant="outline"
                        >
                            Select from media library
                        </Button>
                    </div>
                </div>
            )}
            {props.block.src && <WrappedComponent block={props.block}/>}
        </div>
    }
}
