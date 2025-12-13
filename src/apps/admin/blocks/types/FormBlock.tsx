import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import {BookText} from "lucide-react";
import FormBlockClient from "@front/components/FormBlock.client";

const FormBlock = ({children, block}: BlockProps) => {
    return <FormBlockClient block={block}>{children}</FormBlockClient>
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
