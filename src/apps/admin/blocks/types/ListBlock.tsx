import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import {List} from "lucide-react";
import {cn, cnEditor} from "../../lib/utils";

const ListBlock = ({children, block, className, isEditor}: BlockProps) => {
    const Tag = block.tagName;

    return <Tag className={isEditor? cnEditor(block.className, className) : cn(block.className, className)}>{children}</Tag>
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
