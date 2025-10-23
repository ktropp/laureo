import {BlockProps, BlockMeta} from "blocks/blockDefinitions";
import {Minus} from "lucide-react";

const ListItemBlock = ({block, ...props}: BlockProps) => {
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
    className: ''
};

export default ListItemBlock;
