import {BlockProps, BlockMeta} from "blocks/blockDefinitions";
import {RectangleEllipsis} from "lucide-react";

const ButtonBlock = ({block, ...props}: BlockProps) => {
    const sanitizedHtml = block?.text || ''
    return <a
        className={block.className}
        dangerouslySetInnerHTML={{__html: sanitizedHtml}}
        href={block.href}
        {...props}
    ></a>
};

export const blockConfig: BlockMeta = {
    type: 'button',
    name: 'Button',
    icon: RectangleEllipsis,
    isText: true,
    tagName: 'a',
    className: 'bg-primary text-white',
    variants: [
        {
            name: 'primary',
            className: 'bg-primary text-white'
        },
        {
            name: 'secondary',
            className: 'bg-secondary text-white'
        }
    ]
};

export default ButtonBlock;
