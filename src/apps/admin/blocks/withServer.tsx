import {BlockJson} from "./blockDefinitions";
import {ComponentType} from "react";

export interface WithEditableProps {
    className?: string;
}

interface BaseBlockProps {
    block: BlockJson;
    onContentChange?: (content: string) => void;
    onMediaEditorOpen?: (slug: string) => void;
    isFocused?: boolean;
}

export function withServer<T extends BaseBlockProps>(
    WrappedComponent: ComponentType<T>,
) {
    return function ServerEditableComponent({
                                               className,
                                               ...props
                                           }: T & WithEditableProps) {
        return <div className={props.block.className}></div>
    }
}
