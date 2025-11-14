import {Button} from "components/ui/button"
import {useEffect, useRef, useState} from "react";
import blockRegistry from "./blockRegistry";
import {Plus, Search} from "lucide-react";
import {BlockJson, BlockMeta} from "./blockDefinitions";
import {Input} from "../components/ui/input";

interface BlockAddProps {
    onBlockAdd: (block: BlockJson) => void;
    Block?: BlockMeta;
    parentBlock?: BlockJson;
}

export const BlockAdd = ({onBlockAdd, Block, parentBlock}: BlockAddProps) => {
    const inputRef = useRef<HTMLParagraphElement>(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const [showSlashMenu, setShowSlashMenu] = useState(false);
    const [slashMenuPosition, setSlashMenuPosition] = useState({top: 0, left: 0});
    const [blockRegistryFiltered, setBlockRegistryFiltered] = useState(blockRegistry)
    const [filteredBlocks, setFilteredBlocks] = useState(blockRegistryFiltered);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showMenu, setShowMenu] = useState(false);

    const parentBlockMeta = blockRegistry.find(block => block.type === parentBlock?.type);

    useEffect(() => {
        if (Block) {
            const filtered = blockRegistry.filter(block => {
                if (block.allowedParents) {
                    return block.allowedParents.includes(Block.type) || (parentBlockMeta && block.allowedParents.includes(parentBlockMeta.type));
                }
                if(Block.allowedChildren){
                    return Block.allowedChildren.includes(block.type);
                }
                return true;
            });
            setBlockRegistryFiltered(filtered);
        }
    }, [Block]);


    const handleBlockSelection = (type: string) => {
        onBlockAdd(type);
        setShowSlashMenu(false);
        setShowMenu(false);
        if (inputRef.current) {
            inputRef.current.textContent = '';
        }
        setIsEmpty(true);
    }
    const checkIfEmpty = () => {
        const text = inputRef.current?.textContent || '';
        setIsEmpty(text.trim() === '');
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSlashMenu && !showMenu) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault(); // Prevent cursor movement
                setSelectedIndex((prev) =>
                    prev < filteredBlocks.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault(); // Prevent cursor movement
                setSelectedIndex((prev) =>
                    prev > 0 ? prev - 1 : prev
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredBlocks[selectedIndex]) {
                    handleBlockSelection(filteredBlocks[selectedIndex].type);
                }
                break;
            case 'Escape':
                //TODO: nefunguje
                e.preventDefault();
                setShowSlashMenu(false);
                setShowMenu(false);
                break;
        }
    };

    const handleInput = (e: React.FormEvent<HTMLParagraphElement>) => {
        checkIfEmpty();
        const text = inputRef.current?.textContent || '';

        if (text.startsWith('/')) {
            setShowSlashMenu(true);
            const rect = e.currentTarget.getBoundingClientRect();
            setSlashMenuPosition({top: rect.bottom, left: rect.left});

            const searchQuery = text.slice(1).toLowerCase();
            const filteredBlocks = blockRegistryFiltered.filter(block =>
                block.name.toLowerCase().includes(searchQuery)
            );

            setFilteredBlocks(filteredBlocks);
            setSelectedIndex(0); // Reset selection when filter changes
        } else {
            setShowSlashMenu(false);
        }
    };


    useEffect(() => {
        checkIfEmpty();
    })

    const handleMenuItemMouseEnter = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <div
            className={`flex justify-between items-center relative z-20 ${parentBlock ? 'mt-auto -translate-y-3' : 'flex-1'}`}>
            {!parentBlock && (
                <p
                    ref={inputRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="w-full min-w-30 focus:outline-0 relative"
                    onInput={(e) => handleInput(e)}
                    onKeyDown={handleKeyDown}
                >
                    {isEmpty && (
                        <span className="absolute pointer-events-none opacity-60"
                              data-rich-text-placeholder="Write / for block selection"></span>
                    )}
                </p>
            )}
            {showSlashMenu && (
                <div
                    className={`fixed z-20 flex flex-col border border-laureo-border dark:border-laureo-border-dark bg-laureo-body dark:bg-laureo-body-dark p-2`}
                    style={{
                        top: slashMenuPosition.top,
                        left: slashMenuPosition.left
                    }}
                >
                    {filteredBlocks.map((block, index) => (
                        <Button
                            type="button"
                            variant={selectedIndex == index ? 'menu_focus' : 'menu'}
                            key={index}
                            data-slash-menu-item
                            onClick={() => handleBlockSelection(block.type)}
                            onMouseEnter={() => handleMenuItemMouseEnter(index)}
                        >
                            {block.icon && <block.icon size={20}/>}
                            {block.name}
                        </Button>
                    ))}
                </div>
            )}
            <Button
                variant="secondary"
                size="icon_small"
                className="absolute right-0"
                type="button"
                onClick={() => {
                    setFilteredBlocks(blockRegistryFiltered);
                    setSelectedIndex(0);
                    setShowMenu(!showMenu)
                }}
            >
                <Plus size={20}/>
            </Button>
            {showMenu && (
                <div className="absolute right-0 top-8 z-20">
                    <div className="bg-laureo-body dark:bg-laureo-body-dark rounded-lg shadow-lg p-2">
                        <div className="flex flex-col gap-2">
                            <div className="relative">
                                <Input
                                    placeholder="Search"
                                />
                                <Search
                                    size={20}
                                    className="absolute right-2 top-2.5"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                {filteredBlocks.map((block, index) => (
                                    <Button
                                        type="button"
                                        variant={selectedIndex == index ? 'menu_focus' : 'menu'}
                                        key={index}
                                        data-slash-menu-item
                                        onClick={() => handleBlockSelection(block.type)}
                                        onMouseEnter={() => handleMenuItemMouseEnter(index)}
                                    >
                                        {block.icon && <block.icon size={20}/>}
                                        {block.name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
