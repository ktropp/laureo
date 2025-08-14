import blockRegistry from "./blockRegistry";
import {BlockAdd} from "./BlockAdd";

const BaseBlock = ({children, blockJson, onBlockAdd}) => {
    const Block = blockRegistry.find(block => block.type === blockJson.type);
    const BlockComponent = Block?.component;
    if (!BlockComponent)
        return null;

    return <div className="border border-dashed">
        <BlockComponent block={blockJson}>
            {children}
            {Block.isParent && <BlockAdd onBlockAdd={onBlockAdd}/>}
        </BlockComponent>
    </div>;
};

export default BaseBlock;
