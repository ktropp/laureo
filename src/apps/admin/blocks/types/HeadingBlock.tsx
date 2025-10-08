import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import {Heading} from "lucide-react";

const HeadingBlock = ({block, ...props}: BlockProps) => {
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
    className: 'text-4xl font-bold mb-2',
    tags: [
        {
            tagName: 'h1',
            className: 'text-7xl font-bold mb-2',
        },
        {
            tagName: 'h2',
            className: 'text-4xl mb-2',
        },
        {
            tagName: 'h3',
            className: 'text-2xl mb-2',
        }
    ]
};

export default HeadingBlock;
