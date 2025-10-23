import {BlockMeta} from "blocks/blockDefinitions";
import {List} from "lucide-react";
import {cn} from "../../lib/utils";

const ListBlock = ({children, block, className}: { block: Block }) => {
    const Tag = block.tagName;

    return <Tag className={cn(block.className, className)}>{children}</Tag>
};

export const blockConfig: BlockMeta = {
    type: 'list',
    name: 'List',
    icon: List,
    isParent: true,
    tagName: 'ul',
    className: '',
    tags: [
        {
            tagName: 'ul',
            className: '',
        },
        {
            tagName: 'ol',
            className: '',
        }
    ],
    allowedChildren: [
        'list-item'
    ]
};

export default ListBlock;
