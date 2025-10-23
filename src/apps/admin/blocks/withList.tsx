import {BlockJson} from "./blockDefinitions";
import {ComponentType} from "react";

export interface WithEditableProps {
    className?: string;
}

interface BaseBlockProps {
    block: BlockJson;
    onContentChange?: (content: string) => void;
}

export function withList<T extends BaseBlockProps>(
    WrappedComponent: ComponentType<T>,
) {
    return function ListComponent({
                                      className,
                                      ...props
                                  }: T & WithEditableProps) {
console.log(props.children)
        return (
            <div className="min-h-7">
                <WrappedComponent block={props.block}>
                    {props.children}
                </WrappedComponent>
            </div>
        )
    }
}
