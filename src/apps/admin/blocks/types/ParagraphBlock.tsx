import {BlockMeta} from "blocks/blockDefinitions";
import {Pilcrow} from "lucide-react";

const ParagraphBlock = ({block}: { block: Block }) => {
    return <p
        contentEditable
        suppressContentEditableWarning
    >Paragraph</p>
};

export const blockConfig: BlockMeta = {
    type: 'paragraph',
    name: 'Paragraph',
    icon: Pilcrow
};

export default ParagraphBlock;
