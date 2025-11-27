import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import {BookText} from "lucide-react";
import {cn} from "../../lib/utils";

const FormBlock = ({children, block, className}: BlockProps) => {
    return <form className={cn(block.className, className)}>{children}</form>
};

export const blockConfig: BlockMeta = {
    type: 'form',
    name: 'Form',
    icon: BookText,
    isParent: true,
    tagName: 'div',
    className: 'flex flex-col gap-4',
    allowedChildren: [
        'group',
        'form-field',
        'form-submit',
    ]
};

export default FormBlock;
