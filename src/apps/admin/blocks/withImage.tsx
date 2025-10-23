import {BlockJson} from "./blockDefinitions";
import {ComponentType} from "react";

export interface WithEditableProps {
    className?: string;
}

interface BaseBlockProps {
    block: BlockJson;
    onContentChange?: (content: string) => void;
}

export function withImage<T extends BaseBlockProps>(
    WrappedComponent: ComponentType<T>,
) {
    return function ImageEditableComponent({
                                               className,
                                               ...props
                                           }: T & WithEditableProps) {

        return <div
            className={`${props.block.src ? "" : "min-h-40 min-w-100 w-full bg-laureo-border dark:bg-laureo-border-dark"}`}>
            {!props.block.src && (
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" preserveAspectRatio="none"
                     aria-hidden="true" focusable="false" className="stroke-current max-h-40 w-full">
                    <path vector-effect="non-scaling-stroke" d="M60 60 0 0"></path>
                </svg>)}
            {props.block.src && <WrappedComponent block={props.block}/>}
        </div>
    }
}
