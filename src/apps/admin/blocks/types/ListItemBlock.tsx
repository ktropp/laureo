import {BlockProps, BlockMeta} from "blocks/blockDefinitions";
import {Minus} from "lucide-react";

const ListItemBlock = ({block, GlobalFields, ...props}: BlockProps) => {
    const sanitizedHtml = block?.text || ''
    return <li
        className={block.className}
        dangerouslySetInnerHTML={{__html: sanitizedHtml}}
        {...props}
    ></li>
};

export const blockConfig: BlockMeta = {
    type: 'list-item',
    name: 'List Item',
    icon: Minus,
    isText: true,
    tagName: 'li',
    className: '',
    allowedParents: [
        'list'
    ]
};

export default ListItemBlock;
