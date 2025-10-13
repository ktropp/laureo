import {BlockProps, BlockMeta} from "blocks/blockDefinitions";
import {RectangleEllipsis} from "lucide-react";
import {getIconByName} from "../iconRegistry";
import blockRegistry from "../blockRegistry";

const ButtonBlock = ({block, ...props}: BlockProps) => {
    const Icon = getIconByName(block?.icon) || null
    const sanitizedHtml = block?.text || ''
    const registry = blockRegistry.find(b => b.type === block.type)

    return <a
        className={block.className}
        href={block.href}
        {...props}
    >
        <span className="flex items-center">
            <span dangerouslySetInnerHTML={{__html: sanitizedHtml}}/>
            {Icon && <Icon size={registry.iconSize || 20} className={registry.iconClassName || 'ml-4'}/>}
        </span>
    </a>
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
    ],
    icons: [],
    iconSize: 20,
    iconClassName: 'ml-4'
};

export default ButtonBlock;
