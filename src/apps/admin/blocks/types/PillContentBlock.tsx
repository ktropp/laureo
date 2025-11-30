import {BlockMeta} from "blocks/blockDefinitions";
import {AlignLeft} from "lucide-react";
import {cn} from "../../lib/utils";

const PillContentBlock = ({children, block, className}: { block: Block }) => {
    const Tag = block.tagName;

    return <Tag className={cn(block.className, className)}>{children}</Tag>
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
