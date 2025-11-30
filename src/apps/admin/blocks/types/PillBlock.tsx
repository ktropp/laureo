import {BlockProps, BlockMeta} from "blocks/blockDefinitions";
import {ChevronsUpDown} from "lucide-react";
import {cn} from "../../lib/utils";
import PillBlockClient from "@front/components/PillBlock.client";

const PillBlock = ({children, block, className}: BlockProps) => {
    const Tag = block.tagName;

    return <Tag className={cn(block.className, className)}>
        <PillBlockClient>
            {children}
        </PillBlockClient>
    </Tag>
};

export const blockConfig: BlockMeta = {
    type: 'pill',
    name: 'Pill',
    icon: ChevronsUpDown,
    isParent: true,
    tagName: 'div',
    className: '',
    allowedChildren: [
        'pill-link',
        'pill-content'
    ]
};

export default PillBlock;
