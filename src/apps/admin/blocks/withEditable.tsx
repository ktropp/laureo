import {BlockJson} from "./blockDefinitions";
import {ComponentType} from "react";
import {cn} from "lib/utils";

export interface WithEditableProps {
    className?: string;
}

interface BaseBlockProps {
    block: BlockJson
}

export function withEditable<T extends BaseBlockProps>(
    WrappedComponent: ComponentType<T>,
) {
    return function EditableComponent({
                                          className,
                                          ...props
                                      }: T & WithEditableProps) {
        const componentProps = {
            ...props,
            className: cn(
                className,
                withEditable && 'focus:outline-0'
            ),
            contentEditable: true,
            suppressContentEditableWarning: true,
        } as T;

        return <WrappedComponent {...componentProps} />
    }
}