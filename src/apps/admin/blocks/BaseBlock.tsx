import blockRegistry from "./blockRegistry";
import {BlockAdd} from "./BlockAdd";
import {withEditable} from "./withEditable";

const BaseBlock = ({children, blockJson, onBlockAdd, onContentChange}) => {
    const Block = blockRegistry.find(block => block.type === blockJson.type);
    let BlockComponent = Block?.component;
    if (!BlockComponent)
        return null;

    if(Block.isText){
        BlockComponent = withEditable(BlockComponent);
    }

    const blockWithCallback = {
        ...blockJson,
        onContentChange,
    }

    return <div className="border border-dashed">
        <BlockComponent block={blockWithCallback}>
            {children}
            {Block.isParent && <BlockAdd onBlockAdd={onBlockAdd}/>}
        </BlockComponent>
    </div>;
};

export default BaseBlock;
