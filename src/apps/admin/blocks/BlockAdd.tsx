import { Button } from "components/ui/button"
import { useEffect, useRef, useState } from "react";
import blockRegistry from "./blockRegistry";
import { Plus } from "lucide-react";
import {BlockJson, BlockMeta} from "./blockDefinitions";
interface BlockAddProps {
  onBlockAdd: (block: BlockJson) => void;
  parentBlock?: BlockJson;
}
export const BlockAdd = ({ onBlockAdd }: BlockAddProps) => {
  const inputRef = useRef<HTMLParagraphElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });

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

  const handleInput = (
    e: React.FormEvent<HTMLParagraphElement>
  ) => {
    checkIfEmpty();
    const text = inputRef.current?.textContent || '';
    if (text.slice(0, 1) === '/') {
      setShowSlashMenu(true);
      const rect = e.currentTarget.getBoundingClientRect();
      setSlashMenuPosition({ top: rect.bottom, left: rect.left })
    } else {
      setShowSlashMenu(false);
    }
  }

  useEffect(() => {
    checkIfEmpty();
  })

  return (
    <div className="flex justify-between items-center relative">
      <p
        ref={inputRef}
        contentEditable
        suppressContentEditableWarning
        className="w-full focus:outline-0 relative"
        onInput={(e) => handleInput(e)}
      >
        {isEmpty && (
          <span className="absolute pointer-events-none opacity-60" data-rich-text-placeholder="Write / for block selection"></span>
        )}
      </p>
      {showSlashMenu && (
        <div
          className={`fixed flex flex-col border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 p-2`}
          style={{
            top: slashMenuPosition.top,
            left: slashMenuPosition.left
          }}
        >
          {blockRegistry.map((block, index) => (
            <Button
                type="button"
                variant="menu"
                key={index}
                onClick={() => handleBlockSelection(block.type)}
            >
              {block.icon && <block.icon size={20} />}
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
