import {BlockJson} from "../../blocks/blockDefinitions";
import {Settings} from "@theme/settings";
import BaseBlock from "../../blocks/BaseBlock";
import {BlockAdd} from "blocks/BlockAdd";
import BlockRegistry from "../../blocks/blockRegistry";
import React, {useEffect, useState} from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export default function BlockEditor({content, onChange}: {
    content: BlockJson[],
    onChange?: (blocks: BlockJson[]) => void
}) {
    const [blocks, setBlocksState] = useState<Array<BlockJson>>(content || []);
    const [lastAddedBlockIndex, setLastAddedBlockIndex] = useState<string | null>(null);

    const setBlocks = (updater: BlockJson[] | ((prev: BlockJson[]) => BlockJson[])) => {
        const newBlocks = typeof updater === 'function' ? updater(blocks) : updater;
        setBlocksState(newBlocks);
        // Use useEffect to handle onChange after state is updated
        if (onChange) {
            // Use setTimeout to ensure this runs after the current render cycle
            setTimeout(() => {
                onChange(newBlocks);
            }, 0);
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    let bodyClass = Settings.bodyClass;
    Settings.fonts.forEach(font => {
        bodyClass = bodyClass.concat(" ", font.variable)
    });
    bodyClass += " mt-14";

    const handleBlockAdd = (type: string, parentIndex?: string) => {
        const blockReg = BlockRegistry.find(block => block.type === type)
        const newBlock: BlockJson = {
            index: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: type,
            tagName: blockReg.tagName,
            className: blockReg.className,
        };

        setLastAddedBlockIndex(newBlock.index);

        setTimeout(() => {
            setLastAddedBlockIndex(null);
        }, 100);

        if (parentIndex !== undefined) {
            setBlocks(prev => {
                const updateBlocksRecursively = (blocks: BlockJson[]): BlockJson[] => {
                    return blocks.map(block => {
                        if (block.index === parentIndex) {
                            return {
                                ...block,
                                children: [...(block.children || []), newBlock]
                            };
                        }
                        if (block.children && block.children.length > 0) {
                            return {
                                ...block,
                                children: updateBlocksRecursively(block.children)
                            };
                        }
                        return block;
                    });
                };

                return updateBlocksRecursively(prev);
            });
        } else {
            setBlocks(prev => [...prev, newBlock]);
        }
    };

    const handleBlockDelete = (blockIndex: string) => {
        setBlocks(prev => {
            const deleteBlocksRecursively = (blocks: BlockJson[]): BlockJson[] => {
                return blocks.filter(block => {
                    if (block.index === blockIndex) {
                        return false;
                    }
                    if (block.children && block.children.length > 0) {
                        return {
                            ...block,
                            children: deleteBlocksRecursively(block.children)
                        };
                    }
                    return true;
                });
            };

            return deleteBlocksRecursively(prev);
        });
    };

    const handleBlockTextChange = (text: string, blockIndex: string) => {
        setBlocks(prev => {
            const updateBlocksRecursively = (blocks: BlockJson[]): BlockJson[] => {
                return blocks.map(block => {
                    if (block.index === blockIndex) {
                        return {
                            ...block,
                            text: text
                        };
                    }
                    if (block.children && block.children.length > 0) {
                        return {
                            ...block,
                            children: updateBlocksRecursively(block.children)
                        };
                    }
                    return block;
                });
            };

            return updateBlocksRecursively(prev);
        });
    };

    const handleBlockClassNameChange = (className: string, blockIndex: string) => {
        setBlocks(prev => {
            const updateBlocksRecursively = (blocks: BlockJson[]): BlockJson[] => {
                return blocks.map(block => {
                    if (block.index === blockIndex) {
                        return {
                            ...block,
                            className: className
                        };
                    }
                    if (block.children && block.children.length > 0) {
                        return {
                            ...block,
                            children: updateBlocksRecursively(block.children)
                        };
                    }
                    return block;
                });
            };

            return updateBlocksRecursively(prev);
        });
    };

    const handleBlockHrefChange = (href: string, blockIndex: string) => {
        setBlocks(prev => {
            const updateBlocksRecursively = (blocks: BlockJson[]): BlockJson[] => {
                return blocks.map(block => {
                    if (block.index === blockIndex) {
                        return {
                            ...block,
                            href: href
                        };
                    }
                    if (block.children && block.children.length > 0) {
                        return {
                            ...block,
                            children: updateBlocksRecursively(block.children)
                        };
                    }
                    return block;
                });
            };

            return updateBlocksRecursively(prev);
        });
    };

    const handleBlockTagNameChange = (tagName: string, className: string, blockIndex: string) => {
        setBlocks(prev => {
            const updateBlocksRecursively = (blocks: BlockJson[]): BlockJson[] => {
                return blocks.map(block => {
                    if (block.index === blockIndex) {
                        return {
                            ...block,
                            tagName: tagName,
                            className: className,
                        };
                    }
                    if (block.children && block.children.length > 0) {
                        return {
                            ...block,
                            children: updateBlocksRecursively(block.children)
                        };
                    }
                    return block;
                });
            };

            return updateBlocksRecursively(prev);
        });
    };

    const renderBlocks = (blocks: BlockJson[], parentBlock: BlockJson) => {
        return blocks?.map((block) => {
            return (
                <BaseBlock
                    key={block.index}
                    index={block.index}
                    parentBlock={parentBlock}
                    blockJson={block}
                    autoFocus={block.index === lastAddedBlockIndex}
                    onBlockAdd={(newBlock) => handleBlockAdd(newBlock, block.index)}
                    onContentChange={(text) => handleBlockTextChange(text, block.index)}
                    onClassNameChange={(className) => handleBlockClassNameChange(className, block.index)}
                    onHrefChange={(href) => handleBlockHrefChange(href, block.index)}
                    onTagNameChange={(tagName, className) => handleBlockTagNameChange(tagName, className, block.index)}
                    onBlockDelete={() => handleBlockDelete(block.index)}
                >
                    {block.children && renderBlocks(block.children, block)}
                </BaseBlock>
            );
        });
    };

    return (
        <div className={bodyClass}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={blocks}
                    strategy={verticalListSortingStrategy}
                >
                    {blocks.map((block) => {
                        return (
                            <BaseBlock
                                key={block.index}
                                index={block.index}
                                blockJson={block}
                                autoFocus={block.index === lastAddedBlockIndex}
                                onBlockAdd={(newBlock) => handleBlockAdd(newBlock, block.index)}
                                onContentChange={(text) => handleBlockTextChange(text, block.index)}
                                onClassNameChange={(className) => handleBlockClassNameChange(className, block.index)}
                                onHrefChange={(href) => handleBlockHrefChange(href, block.index)}
                                onTagNameChange={(tagName, className) => handleBlockTagNameChange(tagName, className, block.index)}
                                onBlockDelete={() => handleBlockDelete(block.index)}
                            >
                                {block.children && renderBlocks(block.children, block)}
                            </BaseBlock>
                        );
                    })}
                </SortableContext>
            </DndContext>
            <BlockAdd onBlockAdd={handleBlockAdd}></BlockAdd>
        </div>
    )

    function handleDragEnd(event) {
        const {active, over} = event;
        console.log("TODO: " + event)

        if (active.id !== over.id) {
            setBlocks((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
}