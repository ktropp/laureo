import blockRegistry from "./blockRegistry";
import {BlockAdd} from "./BlockAdd";
import {withEditable} from "./withEditable";
import { GripVertical } from "lucide-react";

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
        <div className="absolute flex gap-2">
            {Block.isParent && <div className="p-2 border bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50"><button className="p-1 cursor-pointer hover:text-primary">
                <Block.icon size={20}/>TODO: parent selector
            </button></div>}
            <div className="p-2 border bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50">
                <button className="p-1 cursor-pointer hover:text-primary">
                    <Block.icon size={20}/>
                </button>
                <button className="p-1 cursor-pointer hover:text-primary">
                    <GripVertical size={20}/>
                </button>
            </div>
        </div>
        <BlockComponent block={blockWithCallback}>
            {children}
            {Block.isParent && <BlockAdd onBlockAdd={onBlockAdd}/>}
        </BlockComponent>
    </div>;
};

export default BaseBlock;
