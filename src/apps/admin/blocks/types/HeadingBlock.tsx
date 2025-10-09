import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import {Heading} from "lucide-react";

const HeadingBlock = ({block, ...props}: BlockProps) => {
    const Tag = block.tagName;
    const sanitizedHtml = block?.text || ''
    //TODO: DOMPurify
    return <Tag
        className={block.className}
        dangerouslySetInnerHTML={{__html: sanitizedHtml}}
        {...props}
    ></Tag>
};

export const blockConfig: BlockMeta = {
    type: 'heading',
    name: 'Heading',
    icon: Heading,
    isText: true,
    isTagEditable: true,
    tagName: 'h2',
    className: 'text-4xl font-bold mb-2',
    tags: [
        {
            tagName: 'h1',
            className: 'text-7xl font-bold mb-2',
        },
        {
            tagName: 'h2',
            className: 'text-4xl font-bold mb-2',
        },
        {
            tagName: 'h3',
            className: 'text-2xl font-bold mb-2',
        },
        {
            tagName: 'h4',
            className: 'text-xl font-bold mb-2',
        },
        {
            tagName: 'h5',
            className: 'text-lg font-bold mb-2',
        },
        {
            tagName: 'h6',
            className: 'text-base font-bold mb-2',
        }
    ]
};

export default HeadingBlock;
