import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import {RectangleEllipsis} from "lucide-react";
import {getIconByName} from "../iconRegistry";
import blockRegistry from "../blockRegistry";

const FormSubmitBlock = ({block, GlobalFields, ...props}: BlockProps) => {
    const Icon = getIconByName(block?.icon) || null
    const iconPosition = block?.iconPosition || 'after'
    const sanitizedHtml = block?.text || ''
    const registry = blockRegistry.find(b => b.type === block.type)

    return <button
        type="submit"
        className={block.className}
        {...props}
    >
        <span className={`flex items-center gap-${registry.spaceSize || 3}`}>
            {iconPosition == 'before' && Icon && <Icon size={registry.iconSize || 20} className={registry.iconClassName || ''}/>}
            <span dangerouslySetInnerHTML={{__html: sanitizedHtml}}/>
            {iconPosition == 'after' && Icon && <Icon size={registry.iconSize || 20} className={registry.iconClassName || ''}/>}
        </span>
    </button>
};

export const blockConfig: BlockMeta = {
    type: 'form-submit',
    name: 'Form Submit',
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

export default FormSubmitBlock;
