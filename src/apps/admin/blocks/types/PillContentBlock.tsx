import {BlockMeta} from "blocks/blockDefinitions";
import {AlignLeft} from "lucide-react";
import {cn, cnEditor} from "../../lib/utils";

const PillContentBlock = ({children, block, className, isEditor}: { block: Block }) => {
    const Tag = block.tagName;

    return <Tag className={isEditor? cnEditor(block.className, className) : cn(block.className, className)}>{children}</Tag>
};

export const blockConfig: BlockMeta = {
    type: 'pill-content',
    name: 'Pill content',
    icon: AlignLeft,
    isParent: true,
    tagName: 'div',
    className: '',
    allowedParents: [
        'pill'
    ]
};

export default PillContentBlock;
