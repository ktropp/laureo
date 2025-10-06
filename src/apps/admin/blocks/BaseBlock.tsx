import blockRegistry from "./blockRegistry";
import {BlockAdd} from "./BlockAdd";
import {withEditable} from "./withEditable";
import {ChevronDown, ChevronUp, EllipsisVertical, GripVertical} from "lucide-react";

const BaseBlock = ({children, blockJson, onBlockAdd, onContentChange}) => {
    const Block = blockRegistry.find(block => block.type === blockJson.type);
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

    return <div className="relative border border-dashed">
        <div className="absolute bg-white -top-3 right-2">{Block.name}</div>
        <div className="absolute flex gap-2 -top-15">
            {Block.isParent &&
                <div className="p-2 border bg-laureo-body dark:bg-laureo-body-dark text-laureo-text-dark dark:text-laureo-text">
                    <button className="p-1 cursor-pointer hover:text-laureo-primary">
                        <Block.icon size={20}/>TODO: parent selector
                    </button>
                </div>}
            <div
                className="border bg-laureo-body dark:bg-laureo-body-dark text-laureo-text-dark dark:text-laureo-text flex flex-row items-center">
                <div className="p-2 flex flex-row items-center">
                    <button className="p-1 cursor-pointer hover:text-laureo-primary">
                        <Block.icon size={20}/>
                    </button>
                    <button className="p-1 cursor-pointer hover:text-laureo-primary">
                        <GripVertical size={20}/>
                    </button>
                    <div className="flex flex-col">
                        <button className="cursor-pointer hover:text-laureo-primary">
                            <ChevronUp size={20}/>
                        </button>
                        <button className="cursor-pointer hover:text-laureo-primary">
                            <ChevronDown size={20}/>
                        </button>
                    </div>
                </div>
                <div className="p-2 flex flex-row items-center border-l h-full">
                    TODO: controls if exists
                </div>
                <div className="p-2 flex flex-row items-center border-l h-full">
                    <button className="p-1 cursor-pointer hover:text-laureo-primary">
                        <EllipsisVertical size={20}/>
                    </button>
                </div>
            </div>
        </div>
        <BlockComponent block={blockWithCallback}>
            {children}
            {Block.isParent && <BlockAdd onBlockAdd={onBlockAdd}/>}
        </BlockComponent>
    </div>;
};

export default BaseBlock;
