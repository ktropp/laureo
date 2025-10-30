import {BlockJson} from "./blockDefinitions";
import {ComponentType, useRef} from "react";
import {cn} from "lib/utils";
import ContentEditable from "react-contenteditable";
import {getIconByName} from "./iconRegistry";
import {renderToStaticMarkup} from "react-dom/server";

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
        const Icon = props.block.icon ? getIconByName(props.block.icon) : null;

        const handleChange = (evt: any) => {
            const content = contentEditableRef.current?.innerHTML || '';
            if (props.block.onContentChange && content !== props.block.text) {
                props.block.onContentChange(content);
            }
        };

        //TODO: icon displays multiple times, fix
        const iconHtml = Icon
            ? `<span contenteditable="false" class="inline-flex align-middle ml-2">${renderToStaticMarkup(
                <Icon size={16}/>
            )}</span>`
            : "";
        const contentHtml = `${props.block.text || ''}${iconHtml}`;

        const componentProps = {
            className: cn(
                props.block.className,
                Icon ? 'flex items-center' : '',
                'focus:outline-0 min-w-20'
            ),
            innerRef: contentEditableRef,
            html: contentHtml,
            tagName: props.block.tagName || 'div',
            onBlur: handleChange
        } as T;

        return <ContentEditable {...componentProps} />;
    }
}