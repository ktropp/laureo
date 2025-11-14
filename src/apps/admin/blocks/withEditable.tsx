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
        const iconPosition = props.block.iconPosition || 'after';
        const handleBlur = (evt: any) => {
            const content = contentEditableRef.current?.innerHTML || '';
            if (props.block.onContentChange && content !== props.block.text) {
                props.block.onContentChange(content);
            }
        };

        const handleChange = (evt: any) => {
            const isOnce = evt.nativeEvent.detail.isOnce || false;
            if (isOnce) {
                handleBlur(evt);
            }
        }

        //TODO: icon displays multiple times, fix
        const iconHtml = Icon
            ? `<span contenteditable="false" class="inline-flex align-middle">${renderToStaticMarkup(
                <Icon size={16}/>
            )}</span>`
            : "";
        const hasExistingIcon = props.block.text?.includes(iconHtml);
        const contentHtml = hasExistingIcon
            ? props.block.text
            : `${iconPosition == 'before' ? iconHtml : ''}${props.block.text || ''}${iconPosition == 'after' ? iconHtml : ''}`;

        const componentProps = {
            className: cn(
                props.block.className,
                Icon ? 'flex items-center gap-2' : '',
                'focus:outline-0 min-w-20 min-h-10'
            ),
            innerRef: contentEditableRef,
            html: contentHtml,
            tagName: props.block.tagName || 'div',
            onBlur: handleBlur,
            onChange: handleChange
        } as T;

        return <ContentEditable {...componentProps} />;
    }
}