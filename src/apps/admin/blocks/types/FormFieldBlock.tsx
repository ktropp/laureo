import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import {RectangleEllipsis} from "lucide-react";

const FormFieldBlock = ({block, GlobalFields, ...props}: BlockProps) => {
    return null
};

export const blockConfig: BlockMeta = {
    type: 'form-field',
    name: 'Form Field',
    icon: RectangleEllipsis,
    isText: true,
    tagName: 'div',
    className: 'px-3 py-4 lg:px-3 lg:py-3 border focus:outline-0 user-invalid:border-red-800 placeholder:text-slate-700',
};

export default FormFieldBlock;
