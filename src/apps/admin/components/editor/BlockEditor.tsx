import {BlockJson} from "../../blocks/blockDefinitions";
import {Settings} from "@theme/settings";
import BaseBlock from "../../blocks/BaseBlock";
import {BlockAdd} from "blocks/BlockAdd";
import BlockRegistry from "../../blocks/blockRegistry";
import {useState} from "react";

export default function BlockEditor({content}: { content: BlockJson[] }) {
    const [blocks, setBlocks] = useState<Array<BlockJson>>(content || []);

    let bodyClass = Settings.bodyClass;
    Settings.fonts.forEach(font => {
        bodyClass = bodyClass.concat(" ", font.variable)
    });

    const handleBlockAdd = (type: string, parentIndex?: string) => {
        const blockReg = BlockRegistry.find(block => block.type === type)
        const newBlock: BlockJson = {
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
            const updateBlocksRecursively = (blocks: BlockJson[], indices: string[]): BlockJson[] => {
                return blocks.map((block, index) => {
                    if (index.toString() === indices[0]) {
                        if (indices.length === 1) {
                            return {
                                ...block,
                                text: text
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

            const indices = blockIndex.split('-');
            return updateBlocksRecursively(prev, indices);
        });
    };


    const renderBlocks = (blocks: BlockJson[], parentIndex: string = '', parentBlock: BlockJson) => {
        return blocks?.map((block, index) => {
            const currentIndex = parentIndex ? `${parentIndex}-${index}` : `${index}`;

            return (
                <BaseBlock
                    key={currentIndex}
                    parentBlock={parentBlock}
                    blockJson={block}
                    onBlockAdd={(newBlock) => handleBlockAdd(newBlock, currentIndex)}
                    onContentChange={(text) => handleBlockTextChange(text, currentIndex)}
                    onBlockDelete={() => handleBlockDelete(currentIndex)}
                >
                    {block.children && renderBlocks(block.children, currentIndex, block)}
                </BaseBlock>
            );
        });
    };

    return (
        <div className={bodyClass}>
            {renderBlocks(blocks)}
            <BlockAdd onBlockAdd={handleBlockAdd}></BlockAdd>
        </div>
    )
}