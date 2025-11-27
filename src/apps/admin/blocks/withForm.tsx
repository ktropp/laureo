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

export function withForm<T extends BaseBlockProps>(
    WrappedComponent: ComponentType<T>,
) {
    return function ImageEditableComponent({
                                               className,
                                               ...props
                                           }: T & WithEditableProps) {
        return <div className={props.block.className}>{props.children}</div>
    }
}
