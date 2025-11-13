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
    Link, List, ListOrdered, Paintbrush
} from "lucide-react";
import React, {useState, useRef, useEffect, useCallback} from "react";
import {Input} from "../components/ui/input";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {getIconName} from "./iconRegistry";
import {withImage} from "./withImage";
import {Label} from "components/ui/label";
import {Checkbox} from "../components/ui/checkbox";
import {Button} from "../components/ui/button";
import {debounce} from "../lib/utils";

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
                       onBlockCopy,
                       onBlockPaste,
                       onMediaEditorOpen,
                       parentBlock,
                       autoFocus
                   }) => {
    const Block = blockRegistry.find(block => block.type === blockJson.type);
    const ParentBlock = blockRegistry.find(block => block.type === parentBlock?.type);
    let BlockComponent = Block?.component;
    if (!BlockComponent)
        return null;

    const [isFocused, setIsFocused] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isTagOpen, setIsTagOpen] = useState(false);
    const [isClassOpen, setIsClassOpen] = useState(false);
    const [isLinkOpen, setIsLinkOpen] = useState(false);
    const [isVariantOpen, setIsVariantOpen] = useState(false);
    const [isIconOpen, setIsIconOpen] = useState(false);
    const [href, setHref] = useState(blockJson.href || false);
    const [isTargetBlank, setIsTargetBlank] = useState(false);

    if (Block.isText) {
        BlockComponent = withEditable(BlockComponent);
    }

    if (Block.type === 'image') {
        BlockComponent = withImage(BlockComponent);
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
        onMediaEditorOpen,
        isFocused,
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
        'ul': List,
        'ol': ListOrdered,
    }

    const debouncedClassNameChange = useCallback(
        debounce((value: string) => {
            onClassNameChange(value);
        }, 300),
        [onClassNameChange]
    )

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
            className={`relative outline-1 outline-dashed flex-1 ${!blockJson.children && Block.isParent ? '' : ''} ${isFocused ? 'outline-laureo-text-dark' : 'outline-laureo-text-dark/25'}`}
            tabIndex={0}
            onFocus={(e) => {
                e.stopPropagation();
                setIsFocused(true)
                if (Block.isText && !(isLinkOpen || isClassOpen || isVariantOpen || isIconOpen || isTagOpen)) {
                    setTimeout(() => {
                        const editableElement = blockRef.current?.querySelector('[contenteditable="true"]');
                        if (editableElement) {
                            //TODO: focus on the clicked letter, not to the beginning!
                            editableElement.focus();
                        }
                    }, 0);
                }
            }}
            onBlur={handleBlur}
            onKeyDown={(e) => {
                const selection = window.getSelection();
                if (isFocused && e.shiftKey && e.altKey && e.key.toLowerCase() === 'z') {
                    e.preventDefault();
                    onBlockDelete();
                }
                if (isFocused && !(isClassOpen || isLinkOpen || (selection && !selection.isCollapsed)) && e.ctrlKey && e.key.toLowerCase() === 'c') {
                    e.preventDefault();
                    onBlockCopy();
                }
                if (isFocused && Block.isParent && !(isClassOpen || isLinkOpen || selection && !selection.isCollapsed) && e.ctrlKey && e.key.toLowerCase() === 'v') {
                    e.preventDefault();
                    onBlockPaste();
                }
            }
            }
        >
            <div className={`absolute z-9 gap-2 -translate-y-15 text-base ${isFocused ? 'flex' : 'hidden'}`}>
                {parentBlock &&
                    <div
                        className="font-(family-name:--font-roboto) flex flex-row items-center p-2 border bg-laureo-body dark:bg-laureo-body-dark text-laureo-text-dark dark:text-laureo-text">
                        <button title="Select parent block"
                                type="button"
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
                    </div>
                }
                <div
                    className="font-(family-name:--font-roboto) border bg-laureo-body dark:bg-laureo-body-dark text-laureo-text-dark dark:text-laureo-text flex flex-row items-center">
                    <div className="p-2 flex flex-row items-center gap-1">
                        <button type="button" className="p-1 cursor-pointer hover:text-laureo-primary"
                                title={Block.name}>
                            <Block.icon size={20}/>
                        </button>
                        <button
                            className="p-1 cursor-pointer hover:text-laureo-primary"
                            title="Drag to reorder"
                            type="button"
                            ref={setDraggableNodeRef}
                            {...listeners}
                        >
                            <GripVertical size={20}/>
                        </button>
                        <div className="flex flex-col px-1">
                            <button
                                className="cursor-pointer hover:text-laureo-primary"
                                title="Move up"
                                type="button"
                            >
                                <ChevronUp size={20}/>
                            </button>
                            <button
                                className="cursor-pointer hover:text-laureo-primary"
                                title="Move down"
                                type="button"
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
                                            <div className="flex flex-row items-center gap-2" key={index}>
                                                <button
                                                    type="button"
                                                    className={`cursor-pointer hover:text-laureo-primary flex justify-between w-full p-2 ${(blockJson.icon === getIconName(Icon) && blockJson.iconPosition == 'before') ? 'text-laureo-primary' : ''}`}
                                                    onClick={() => {
                                                        let iconName = getIconName(Icon)
                                                        if (iconName === blockJson.icon) {
                                                            iconName = null;
                                                        }
                                                        onIconChange(iconName, 'before');
                                                        setIsIconOpen(false);
                                                    }}
                                                >
                                                    before
                                                </button>
                                                <Icon
                                                    className={`flex-[1_0_auto] ${blockJson.icon === getIconName(Icon) ? 'text-laureo-primary' : ''}`}
                                                    size={20}/>
                                                <button
                                                    type="button"
                                                    className={`cursor-pointer hover:text-laureo-primary flex justify-between w-full p-2 ${(blockJson.icon === getIconName(Icon) && (blockJson.iconPosition == 'after' || !blockJson.iconPosition)) ? 'text-laureo-primary' : ''}`}
                                                    onClick={() => {
                                                        let iconName = getIconName(Icon)
                                                        if (iconName === blockJson.icon) {
                                                            iconName = null;
                                                        }
                                                        onIconChange(iconName, 'after');
                                                        setIsIconOpen(false);
                                                    }}
                                                >
                                                    after
                                                </button>
                                            </div>
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
                                            const event = new CustomEvent('input', {
                                                bubbles: true,
                                                detail: {isOnce: true}
                                            });
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
                                            const event = new CustomEvent('input', {
                                                bubbles: true,
                                                detail: {isOnce: true}
                                            });
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
                                    {Block.type === 'button' ? (
                                        <div className="p-2 space-y-3">
                                            <div>
                                                <Input
                                                    id=""
                                                    type="text"
                                                    placeholder="Enter link URL"
                                                    name=""
                                                    defaultValue={blockJson.href}
                                                    onChange={(e) => onHrefChange(e.target.value, isTargetBlank)}
                                                    onBlur={(e) => onHrefChange(e.target.value, isTargetBlank)}
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Label className="mb-0" htmlFor={"target_blank" + index}>Open in new
                                                    window</Label>
                                                <Checkbox
                                                    name="target_blank"
                                                    id={"target_blank" + index}
                                                    defaultChecked={blockJson.isTargetBlank}
                                                    onCheckedChange={(checked) => {
                                                        setIsTargetBlank(checked);
                                                        if (blockJson.href) {
                                                            onHrefChange(blockJson.href, checked);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-2 space-y-3">
                                            <div>
                                                <Input
                                                    id=""
                                                    type="text"
                                                    placeholder="Enter link URL"
                                                    name=""
                                                    onChange={(e) => setHref(e.target.value)}
                                                    onBlur={(e) => setHref(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Label className="mb-0" htmlFor={"target_blank" + index}>Open in new
                                                        window</Label>
                                                    <Checkbox
                                                        name="target_blank"
                                                        id={"target_blank" + index}
                                                        onCheckedChange={(checked) => setIsTargetBlank(checked)}
                                                    />
                                                </div>
                                                <Button
                                                    type="button"
                                                    onClick={() => {
                                                        const editableElement = blockRef.current?.querySelector('[contenteditable="true"]');
                                                        if (editableElement) {
                                                            const selection = window.getSelection();
                                                            const range = selection?.getRangeAt(0);

                                                            if (selection && !selection.isCollapsed) {
                                                                // There is selected text
                                                                const selectedText = selection.toString();
                                                                const link = document.createElement('a');
                                                                link.textContent = selectedText;
                                                                link.setAttribute('href', href);
                                                                if (isTargetBlank) link.setAttribute('target', '_blank');
                                                                range?.deleteContents();
                                                                range?.insertNode(link);
                                                            } else {
                                                                // No selection, wrap all content
                                                                const content = editableElement.innerHTML;
                                                                editableElement.innerHTML = `<a href="${href}" ${isTargetBlank ? 'target="blank"' : ''}>${content}</a>`;
                                                            }

                                                            // Trigger content change
                                                            const event = new CustomEvent('input', {
                                                                bubbles: true,
                                                                detail: {isOnce: true}
                                                            });
                                                            editableElement.dispatchEvent(event);

                                                            setIsLinkOpen(false)
                                                        }
                                                    }}
                                                >Create</Button>
                                            </div>
                                        </div>
                                    )}
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
                                    onChange={(e) => debouncedClassNameChange(e.target.value)}
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
                                    type="button"
                                    onClick={() => {
                                        onBlockCopy()
                                    }}
                                    className="cursor-pointer hover:text-laureo-primary flex justify-between w-full p-2">
                                    <span>Kopírovat</span>
                                    <span>Ctrl+C</span>
                                </button>
                            </div>
                            <div className="p-2 border-t">
                                <button
                                    type="button"
                                    onClick={() => {
                                        onBlockPaste()
                                    }}
                                    className="cursor-pointer hover:text-laureo-primary flex justify-between w-full p-2">
                                    <span>Vložit</span>
                                    <span>Ctrl+V</span>
                                </button>
                            </div>
                            <div className="p-2 border-t">
                                <button
                                    type="button"
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
            <BlockComponent block
                                ={
                blockWithCallback
            } className
                                ={
                Block.isParent ? 'min-h-7 min-w-20' : ''
            }>
                {
                    children
                }
                {
                    Block.isParent && isFocused &&
                    <BlockAdd onBlockAdd={onBlockAdd} Block={Block} parentBlock={parentBlock}/>
                }
            </BlockComponent>
        </div>
    )
        ;
};

export default BaseBlock;
