import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import {Heading} from "lucide-react";
import {cn} from "../../lib/utils";

const HeadingBlock = ({block, className, ...props}: BlockProps) => {
    return <h2
        className={block.className}
        {...props}
    >{block?.text}</h2>
};

export const blockConfig: BlockMeta = {
    type: 'heading',
    name: 'Heading',
    icon: Heading,
    isText: true,
    tagName: 'h2',
    className: 'text-4xl font-bold mb-2'
};

export default HeadingBlock;
