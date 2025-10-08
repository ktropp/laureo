import {Button} from "components/ui/button"
import {useEffect, useRef, useState} from "react";
import blockRegistry from "./blockRegistry";
import {Plus} from "lucide-react";
import {BlockJson, BlockMeta} from "./blockDefinitions";

interface BlockAddProps {
    onBlockAdd: (block: BlockJson) => void;
    parentBlock?: BlockJson;
}

export const BlockAdd = ({onBlockAdd}: BlockAddProps) => {
    const inputRef = useRef<HTMLParagraphElement>(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const [showSlashMenu, setShowSlashMenu] = useState(false);
    const [slashMenuPosition, setSlashMenuPosition] = useState({top: 0, left: 0});
    const [filteredBlocks, setFilteredBlocks] = useState(blockRegistry);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleBlockSelection = (type: string) => {
        onBlockAdd(type);
        setShowSlashMenu(false);
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
        if (!showSlashMenu) return;

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
                e.preventDefault();
                setShowSlashMenu(false);
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
            const filteredBlocks = blockRegistry.filter(block =>
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
        <div className="flex flex-1 justify-between items-center relative">
            <p
                ref={inputRef}
                contentEditable
                suppressContentEditableWarning
                className="w-full focus:outline-0 relative"
                onInput={(e) => handleInput(e)}
                onKeyDown={handleKeyDown}
            >
                {isEmpty && (
                    <span className="absolute pointer-events-none opacity-60"
                          data-rich-text-placeholder="Write / for block selection"></span>
                )}
            </p>
            {showSlashMenu && (
                <div
                    className={`fixed flex flex-col border border-laureo-border dark:border-laureo-border-dark bg-laureo-body dark:bg-laureo-body-dark p-2`}
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
            <Button variant="secondary" size="icon_small" className="absolute right-0">
                <Plus></Plus>
            </Button>
        </div>
    )
}
