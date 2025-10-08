import {BlockJson} from "../../blocks/blockDefinitions";
import {Settings} from "@theme/settings";
import BaseBlock from "../../blocks/BaseBlock";
import {BlockAdd} from "blocks/BlockAdd";
import BlockRegistry from "../../blocks/blockRegistry";
import React, {useState} from "react";
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

export default function BlockEditor({content}: { content: BlockJson[] }) {
    const [blocks, setBlocks] = useState<Array<BlockJson>>(content || []);

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

    const handleBlockAdd = (type: string, parentIndex?: string) => {
        const blockReg = BlockRegistry.find(block => block.type === type)
        const newBlock: BlockJson = {
            index: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: type,
            tagName: blockReg.tagName,
            className: blockReg.className,
        };

        if (parentIndex !== undefined) {
            setBlocks(prev => {
                const updateBlocksRecursively = (blocks: BlockJson[], indices: string[]): BlockJson[] => {
                    return blocks.map((block, index) => {
                        if (index.toString() === indices[0]) {
                            if (indices.length === 1) {
                                return {
                                    ...block,
                                    children: [...(block.children || []), newBlock]
                                };
                            } else {
                                return {
                                    ...block,
                                    children: updateBlocksRecursively(block.children || [], indices.slice(1))
                                };
                            }
                        }
                        return block;
                    });
                };

                const indices = parentIndex.split('-');
                return updateBlocksRecursively(prev, indices);
            });
        } else {
            setBlocks(prev => [...prev, newBlock]);
        }
    };

    const handleBlockDelete = (blockIndex: string) => {
        setBlocks(prev => {
            const deleteBlocksRecursively = (blocks: BlockJson[], indices: string[]): BlockJson[] => {
                if (indices.length === 0) return blocks;

                const currentIndex = parseInt(indices[0]);

                if (indices.length === 1) {
                    return blocks.filter((_, index) => index !== currentIndex);
                }

                return blocks.map((block, index) => {
                    if (index === currentIndex) {
                        return {
                            ...block,
                            children: deleteBlocksRecursively(block.children || [], indices.slice(1))
                        };
                    }
                    return block;
                });
            };

            const indices = blockIndex.split('-');
            return deleteBlocksRecursively(prev, indices);
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

    const renderBlocks = (blocks: BlockJson[], parentBlock: BlockJson) => {
        return blocks?.map((block) => {
            return (
                <BaseBlock
                    key={block.index}
                    index={block.index}
                    parentBlock={parentBlock}
                    blockJson={block}
                    onBlockAdd={(newBlock) => handleBlockAdd(newBlock, block.index)}
                    onContentChange={(text) => handleBlockTextChange(text, block.index)}
                    onClassNameChange={(className) => handleBlockClassNameChange(className, block.index)}
                    onBlockDelete={() => handleBlockDelete(currentIndex)}
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
                                onBlockAdd={(newBlock) => handleBlockAdd(newBlock, block.index)}
                                onContentChange={(text) => handleBlockTextChange(text, block.index)}
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