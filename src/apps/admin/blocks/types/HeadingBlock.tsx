import {BlockJson, BlockMeta} from "blocks/blockDefinitions";
import {Heading} from "lucide-react";

const HeadingBlock = ({block}: { block: BlockJson }) => {
    return <h2
        contentEditable
        suppressContentEditableWarning
        className="text-4xl font-bold mb-2 focus:outline-0"
    >{block?.text}</h2>
};

export const blockConfig: BlockMeta = {
    type: 'heading',
    name: 'Heading',
    icon: Heading
};

export default HeadingBlock;
