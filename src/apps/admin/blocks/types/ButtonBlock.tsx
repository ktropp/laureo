import {BlockProps, BlockMeta} from "blocks/blockDefinitions";
import {RectangleEllipsis} from "lucide-react";
import {getIconByName} from "../iconRegistry";
import blockRegistry from "../blockRegistry";

const ButtonBlock = ({block, ...props}: BlockProps) => {
    const Icon = getIconByName(block?.icon) || null
    const iconPosition = block?.iconPosition || 'after'
    const sanitizedHtml = block?.text || ''
    const registry = blockRegistry.find(b => b.type === block.type)
    const target = block.isTargetBlank ? '_blank' : undefined;

    return <a
        className={block.className}
        href={block.href}
        target={target}
        {...props}
    >
        <span className={`flex items-center gap-${registry.spaceSize || 3}`}>
            {iconPosition == 'before' && Icon && <Icon size={registry.iconSize || 20} className={registry.iconClassName || ''}/>}
            <span dangerouslySetInnerHTML={{__html: sanitizedHtml}}/>
            {iconPosition == 'after' && Icon && <Icon size={registry.iconSize || 20} className={registry.iconClassName || ''}/>}
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
    spaceSize: 2,
    iconClassName: ''
};

export default ButtonBlock;
