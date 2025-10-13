import blockRegistry from "./blockRegistry";
import {BlockAdd} from "./BlockAdd";
import {withEditable} from "./withEditable";
import {
    Bold,
    Braces,
    ChevronDown,
    ChevronUp, Diamond,
    EllipsisVertical,
    GripVertical,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Italic,
    Link, Paintbrush
} from "lucide-react";
import React, {useState, useRef, useEffect} from "react";
import {Input} from "../components/ui/input";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {getIconName} from "./iconRegistry";

const BaseBlock = ({
                       children,
                       index,
                       blockJson,
                       onBlockAdd,
                       onContentChange,
                       onClassNameChange,
                       onTagNameChange,
                       onHrefChange,
                       onIconChange,
                       onBlockDelete,
                       parentBlock,
                       autoFocus
                   }) => {
    const Block = blockRegistry.find(block => block.type === blockJson.type);
    const ParentBlock = blockRegistry.find(block => block.type === parentBlock?.type);
    let BlockComponent = Block?.component;
    if (!BlockComponent)
        return null;

    if (Block.isText) {
        BlockComponent = withEditable(BlockComponent);
    }

    const blockRef = useRef(null)
    useEffect(() => {
        if (autoFocus && Block.isText && blockRef.current) {
            // Find the editable element inside the block component and focus it
            const editableElement = blockRef.current.querySelector('[contenteditable="true"]');
            if (editableElement) {
                editableElement.focus();
            }
        }
    }, [autoFocus, Block.isText]);

    const blockWithCallback = {
        ...blockJson,
        onContentChange,
        ref: blockRef
    }

    const {
        attributes,
        listeners,
        setNodeRef,
        setDraggableNodeRef,
        transform,
        transition,
    } = useSortable({id: index});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [isFocused, setIsFocused] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isTagOpen, setIsTagOpen] = useState(false);
    const [isClassOpen, setIsClassOpen] = useState(false);
    const [isLinkOpen, setIsLinkOpen] = useState(false);
    const [isVariantOpen, setIsVariantOpen] = useState(false);
    const [isIconOpen, setIsIconOpen] = useState(false);

    const handleBlur = (e) => {
        // Check if the related target is a child of the current element
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocused(false);
            setIsOptionsOpen(false);
            setIsClassOpen(false);
        }
    };

    const tagNameIcons = {
        'h1': Heading1,
        'h2': Heading2,
        'h3': Heading3,
        'h4': Heading4,
        'h5': Heading5,
        'h6': Heading6,
    }

    return (
        <div
            id={index}
            data-block-index={index}
            ref={(node) => {
                setNodeRef(node);
                blockRef.current = node;
            }}
            style={style}
            {...attributes}
            className={`relative outline-1 flex-1 outline-dashed ${isFocused ? 'outline-laureo-text-dark' : 'outline-laureo-text-dark/25'}`}
            tabIndex={Block.isText ? -1 : 0}
            onFocus={(e) => {
                e.stopPropagation();
                setIsFocused(true)
            }}
            onBlur={handleBlur}
            onKeyDown={(e) => {
                if (isFocused && e.shiftKey && e.altKey && e.key.toLowerCase() === 'z') {
                    e.preventDefault();
                    onBlockDelete();
                }
            }}
        >
            <div className={`absolute z-2 gap-2 -translate-y-15 text-base ${isFocused ? 'flex' : 'hidden'}`}>
                {parentBlock &&
                    <div
                        className="font-(family-name:--font-roboto) flex flex-row items-center p-2 border bg-laureo-body dark:bg-laureo-body-dark text-laureo-text-dark dark:text-laureo-text">
                        <button title="Select parent block"
                                className="p-1 cursor-pointer hover:text-laureo-primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (parentBlock?.index) {
                                        const parentElement = blockRef.current?.closest(`[data-block-index="${parentBlock.index}"`);
                                        if (parentElement) {
                                            parentElement.focus();
                                        }
                                    }
                                }}
                        >
                            <ParentBlock.icon size={20}/>
                        </button>
                    </div>}
                <div
                    className="font-(family-name:--font-roboto) border bg-laureo-body dark:bg-laureo-body-dark text-laureo-text-dark dark:text-laureo-text flex flex-row items-center">
                    <div className="p-2 flex flex-row items-center gap-1">
                        <button className="p-1 cursor-pointer hover:text-laureo-primary" title={Block.name}>
                            <Block.icon size={20}/>
                        </button>
                        <button
                            className="p-1 cursor-pointer hover:text-laureo-primary"
                            title="Drag to reorder"
                            ref={setDraggableNodeRef}
                            {...listeners}
                        >
                            <GripVertical size={20}/>
                        </button>
                        <div className="flex flex-col px-1">
                            <button
                                className="cursor-pointer hover:text-laureo-primary"
                                title="Move up"
                            >
                                <ChevronUp size={20}/>
                            </button>
                            <button
                                className="cursor-pointer hover:text-laureo-primary"
                                title="Move down"
                            >
                                <ChevronDown size={20}/>
                            </button>
                        </div>
                    </div>
                    <div className="font-(family-name:--font-roboto) p-2 flex flex-row items-center border-l h-full">
                        {Block.tags && (
                            <div className="relative">
                                <button
                                    type="button"
                                    className="p-1 cursor-pointer hover:text-laureo-primary"
                                    title="Change tag"
                                    onClick={() => setIsTagOpen(!isTagOpen)}
                                >
                                    {blockJson.tagName && tagNameIcons[blockJson.tagName] ? (
                                        (() => {
                                            const IconComponent = tagNameIcons[blockJson.tagName];
                                            return <IconComponent size={20}/>;
                                        })()
                                    ) : blockJson.tagName || 'div'}
                                </button>
                                <div
                                    className={`absolute z-2 top-13 left-0 bg-laureo-body dark:bg-laureo-body-dark border min-w-20 flex-col ${isTagOpen ? 'flex' : 'hidden'}`}>
                                    <div className="p-2">
                                        {Block.tags?.map((tag, index) => (
                                            <button
                                                key={index}
                                                className="cursor-pointer hover:text-laureo-primary flex justify-between w-full p-2"
                                                data-tag-name={tag.tagName}
                                                data-tag-class={tag.className}
                                                onClick={(e) => {
                                                    const tagName = e.currentTarget.dataset.tagName;
                                                    const className = e.currentTarget.dataset.tagClass;

                                                    onTagNameChange(tagName, className);

                                                    setIsTagOpen(false);
                                                }}
                                            >
                                                {tagNameIcons[tag.tagName] ? (
                                                    (() => {
                                                        const IconComponent = tagNameIcons[tag.tagName];
                                                        return <IconComponent size={20}/>;
                                                    })()
                                                ) : tag.tagName || 'div'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {Block.variants && (
                            <div className="relative">
                                <button
                                    type="button"
                                    className="p-1 cursor-pointer hover:text-laureo-primary"
                                    title="Change variant"
                                    onClick={() => setIsVariantOpen(!isVariantOpen)}
                                >
                                    <Paintbrush size={20}/>
                                </button>
                                <div
                                    className={`absolute z-2 top-13 left-0 bg-laureo-body dark:bg-laureo-body-dark border min-w-20 flex-col ${isVariantOpen ? 'flex' : 'hidden'}`}>
                                    <div className="p-2">
                                        {Block.variants?.map((variant, index) => (
                                            <button
                                                key={index}
                                                className="cursor-pointer hover:text-laureo-primary flex justify-between w-full p-2"
                                                data-variant-class={variant.className}
                                                onClick={(e) => {
                                                    const className = e.currentTarget.dataset.variantClass;

                                                    onClassNameChange(className);

                                                    setIsVariantOpen(false);
                                                }}
                                            >
                                                {variant.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {Block.icons && (
                            <div className="relative">
                                <button
                                    type="button"
                                    className="p-1 cursor-pointer hover:text-laureo-primary"
                                    title="Change icon"
                                    onClick={() => setIsIconOpen(!isIconOpen)}
                                >
                                    <Diamond size={20}/>
                                </button>
                                <div
                                    className={`absolute z-2 top-13 left-0 bg-laureo-body dark:bg-laureo-body-dark border min-w-20 flex-col ${isIconOpen ? 'flex' : 'hidden'}`}>
                                    <div className="p-2">
                                        {Block.icons?.map((Icon, index) => (
                                            <button
                                                key={index}
                                                className={`cursor-pointer hover:text-laureo-primary flex justify-between w-full p-2 ${blockJson.icon === getIconName(Icon) ? 'text-laureo-primary' : ''}`}
                                                onClick={() => {
                                                    let iconName = getIconName(Icon)

                                                    if (iconName === blockJson.icon) {
                                                        iconName = null;
                                                    }

                                                    onIconChange(iconName);

                                                    setIsIconOpen(false);
                                                }}
                                            >
                                                <Icon size={20}/>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {Block.isText && (
                            <>
                                <button
                                    type="button"
                                    className="p-1 cursor-pointer hover:text-laureo-primary"
                                    title="Bold"
                                    onClick={() => {
                                        const editableElement = blockRef.current?.querySelector('[contenteditable="true"]');
                                        if (editableElement) {
                                            const selection = window.getSelection();
                                            const range = selection?.getRangeAt(0);

                                            if (selection && !selection.isCollapsed) {
                                                // There is selected text
                                                const selectedText = selection.toString();
                                                const strong = document.createElement('strong');
                                                strong.textContent = selectedText;
                                                range?.deleteContents();
                                                range?.insertNode(strong);
                                            } else {
                                                // No selection, wrap all content
                                                const content = editableElement.innerHTML;
                                                editableElement.innerHTML = `<strong>${content}</strong>`;
                                            }

                                            // Trigger content change
                                            const event = new Event('input', {bubbles: true});
                                            editableElement.dispatchEvent(event);
                                        }
                                    }}
                                >
                                    <Bold size={20}/>
                                </button>
                                <button
                                    type="button"
                                    className="p-1 cursor-pointer hover:text-laureo-primary"
                                    title="Italic"
                                    onClick={() => {
                                        const editableElement = blockRef.current?.querySelector('[contenteditable="true"]');
                                        if (editableElement) {
                                            const selection = window.getSelection();
                                            const range = selection?.getRangeAt(0);

                                            if (selection && !selection.isCollapsed) {
                                                // There is selected text
                                                const selectedText = selection.toString();
                                                const strong = document.createElement('em');
                                                strong.textContent = selectedText;
                                                range?.deleteContents();
                                                range?.insertNode(strong);
                                            } else {
                                                // No selection, wrap all content
                                                const content = editableElement.innerHTML;
                                                editableElement.innerHTML = `<em>${content}</em>`;
                                            }

                                            // Trigger content change
                                            const event = new Event('input', {bubbles: true});
                                            editableElement.dispatchEvent(event);
                                        }
                                    }}
                                >
                                    <Italic size={20}/>
                                </button>
                                <button
                                    type="button"
                                    className="p-1 cursor-pointer hover:text-laureo-primary"
                                    title="Link"
                                    onClick={() => setIsLinkOpen(!isLinkOpen)}
                                >
                                    <Link size={20}/>
                                </button>
                                <div
                                    className={`absolute z-2 top-16 left-0 bg-laureo-body dark:bg-laureo-body-dark border min-w-full flex-col ${isLinkOpen ? 'flex' : 'hidden'}`}>
                                    <div className="p-2">
                                        <Input
                                            id=""
                                            type="text"
                                            placeholder="Enter link URL"
                                            name=""
                                            defaultValue={blockJson.href}
                                            onChange={(e) => onHrefChange(e.target.value)}
                                            onBlur={(e) => onHrefChange(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        <button
                            type="button"
                            className="p-1 cursor-pointer hover:text-laureo-primary"
                            title="Change class"
                            onClick={() => setIsClassOpen(!isClassOpen)}
                        >
                            <Braces size={20}/>
                        </button>
                        <div
                            className={`absolute z-2 top-16 left-0 bg-laureo-body dark:bg-laureo-body-dark border min-w-full flex-col ${isClassOpen ? 'flex' : 'hidden'}`}>
                            <div className="p-2">
                                <Input
                                    id=""
                                    type="text"
                                    placeholder="Enter class name"
                                    name=""
                                    defaultValue={blockJson.className}
                                    onChange={(e) => onClassNameChange(e.target.value)}
                                    onBlur={(e) => onClassNameChange(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative font-(family-name:--font-roboto) p-2 flex flex-row items-center border-l h-full">
                        <button
                            type="button"
                            className="p-1 cursor-pointer hover:text-laureo-primary"
                            title="More options"
                            onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
                            <EllipsisVertical size={20}/>
                        </button>
                        <div
                            className={`absolute z-2 top-16 left-0 bg-laureo-body dark:bg-laureo-body-dark border min-w-60 flex-col ${isOptionsOpen ? 'flex' : 'hidden'}`}>
                            <div className="p-2">
                                <button
                                    className="cursor-pointer hover:text-laureo-primary flex justify-between w-full p-2">
                                    <span>Kopírovat</span>
                                    <span>TODO</span>
                                </button>
                            </div>
                            <div className="p-2 border-t">
                                <button
                                    onClick={() => {
                                        onBlockDelete()
                                    }}
                                    className="cursor-pointer hover:text-laureo-primary flex justify-between w-full p-2">
                                    <span>Smazat</span>
                                    <span>Shift+Alt+Z</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BlockComponent block={blockWithCallback}>
                {children}
                {Block.isParent && <BlockAdd onBlockAdd={onBlockAdd}/>}
            </BlockComponent>
        </div>
    )
        ;
};

export default BaseBlock;
