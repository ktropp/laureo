import {BlockJson} from "./blockDefinitions";
import {ComponentType, useRef} from "react";
import {cn} from "lib/utils";
import ContentEditable from "react-contenteditable";

export interface WithEditableProps {
    className?: string;
}

interface BaseBlockProps {
    block: BlockJson;
    onContentChange?: (content: string) => void;
}

export function withEditable<T extends BaseBlockProps>(
    WrappedComponent: ComponentType<T>,
) {
    return function EditableComponent({
                                          className,
                                          ...props
                                      }: T & WithEditableProps) {

        const contentEditableRef = useRef<any>(null);

        const handleChange = (evt: any) => {
            const content = contentEditableRef.current?.innerHTML || '';
            if (props.block.onContentChange && content !== props.block.text) {
                props.block.onContentChange(content);
            }
        };

        const componentProps = {
            className: cn(
                props.block.className,
                'focus:outline-0'
            ),
            innerRef: contentEditableRef,
            html: props.block.text || '',
            tagName: props.block.tagName || 'div',
            onBlur: handleChange
        } as T;
        return <ContentEditable {...componentProps} />
        //return <WrappedComponent {...componentProps} />
    }
}