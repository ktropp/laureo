import React from 'react';
import {Settings} from '@theme/settings';
import {useState} from "react";
import BlockRegistry from "../../blocks/blockRegistry";
import {BlockJson} from "../../blocks/blockDefinitions";
import BaseBlock from "../../blocks/BaseBlock";
import {BlockAdd} from "blocks/BlockAdd";

export default function IframeContent({content}: { content: BlockJson[] }) {
    const [blocks, setBlocks] = useState<Array<BlockJson>>(content || []);
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
    const renderBlocks = (blocks: BlockJson[], parentIndex: string = '') => {
        return blocks?.map((block, index) => {
            const currentIndex = parentIndex ? `${parentIndex}-${index}` : `${index}`;

            return (
                <BaseBlock
                    key={currentIndex}
                    blockJson={block}
                    onBlockAdd={(newBlock) => handleBlockAdd(newBlock, currentIndex)}
                    onContentChange={(text) => handleBlockTextChange(text, currentIndex)}
                >
                    {block.children && renderBlocks(block.children, currentIndex)}
                </BaseBlock>
            );
        });
    };
    return (
        <div className={Settings.bodyClass}>
            {renderBlocks(blocks)}
            <BlockAdd onBlockAdd={handleBlockAdd}></BlockAdd>
        </div>
    );
}
