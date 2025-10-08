import blockRegistry from "./blockRegistry";
import {BlockAdd} from "./BlockAdd";
import {withEditable} from "./withEditable";
import {Braces, ChevronDown, ChevronUp, EllipsisVertical, GripVertical} from "lucide-react";
import React, {useState} from "react";
import {Input} from "../components/ui/input";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const BaseBlock = ({
                       children,
                       index,
                       blockJson,
                       onBlockAdd,
                       onContentChange,
                       onClassNameChange,
                       onBlockDelete,
                       parentBlock
                   }) => {
    const Block = blockRegistry.find(block => block.type === blockJson.type);
    const ParentBlock = blockRegistry.find(block => block.type === parentBlock?.type);
    let BlockComponent = Block?.component;
    if (!BlockComponent)
        return null;

    if (Block.isText) {
        BlockComponent = withEditable(BlockComponent);
    }

    const blockWithCallback = {
        ...blockJson,
        onContentChange,
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
    const [isClassOpen, setIsClassOpen] = useState(false);

    const handleBlur = (e) => {
        // Check if the related target is a child of the current element
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocused(false);
            setIsOptionsOpen(false);
            setIsClassOpen(false);
        }
    };

    return (
        <div
            id={index}
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={`relative outline-1 outline-dashed ${isFocused ? 'outline-laureo-text-dark' : 'outline-laureo-text-dark/50'}`}
            tabIndex={0}
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
            <div className={`absolute gap-2 -top-15 text-base ${isFocused ? 'flex' : 'hidden'}`}>
                {parentBlock &&
                    <div
                        className="font-(family-name:--font-roboto) flex flex-row items-center p-2 border bg-laureo-body dark:bg-laureo-body-dark text-laureo-text-dark dark:text-laureo-text">
                        <button title="TODO: Select parent block"
                                className="p-1 cursor-pointer hover:text-laureo-primary">
                            <ParentBlock.icon size={20}/>
                        </button>
                    </div>}
                <div
                    className="font-(family-name:--font-roboto) border bg-laureo-body dark:bg-laureo-body-dark text-laureo-text-dark dark:text-laureo-text flex flex-row items-center">
                    <div className="p-2 flex flex-row items-center gap-1">
                        <button className="p-1 cursor-pointer hover:text-laureo-primary">
                            <Block.icon size={20}/>
                        </button>
                        <button
                            className="p-1 cursor-pointer hover:text-laureo-primary"
                            ref={setDraggableNodeRef}
                            {...listeners}
                        >
                            <GripVertical size={20}/>
                        </button>
                        <div className="flex flex-col px-1">
                            <button className="cursor-pointer hover:text-laureo-primary">
                                <ChevronUp size={20}/>
                            </button>
                            <button className="cursor-pointer hover:text-laureo-primary">
                                <ChevronDown size={20}/>
                            </button>
                        </div>
                    </div>
                    <div className="font-(family-name:--font-roboto) p-2 flex flex-row items-center border-l h-full">
                        <button type="button" className="p-1 cursor-pointer hover:text-laureo-primary"
                                onClick={() => setIsClassOpen(!isClassOpen)}>
                            <Braces size={20}/>
                        </button>
                        <div
                            className={`absolute z-2 top-16 left-0 bg-laureo-body dark:bg-laureo-body-dark border min-w-60 flex-col ${isClassOpen ? 'flex' : 'hidden'}`}>
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
                        TODO: other controls if they exist
                    </div>
                    <div
                        className="relative font-(family-name:--font-roboto) p-2 flex flex-row items-center border-l h-full">
                        <button type="button" className="p-1 cursor-pointer hover:text-laureo-primary"
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
    );
};

export default BaseBlock;
