import {BlockMeta, BlockProps} from "blocks/blockDefinitions";
import {RectangleEllipsis} from "lucide-react";

const FormFieldBlock = ({block, GlobalFields, ...props}: BlockProps) => {
    const Tag = block.tagName;
    const cleanText = block?.text.replace(/<[^>]*>/g, '').trim();

    // Match the pattern: type* name "placeholder"
    const regex = /^(\w+\*?)[\s]+([^\s"]+)[\s]+"([^"]*)"$/;
    const match = cleanText.match(regex);

    if (!match) return null;

    const [, typeWithStar, name, placeholder] = match;
    const isRequired = typeWithStar.endsWith('*');
    const type = typeWithStar.replace('*', '');

    switch (type) {
        case 'text':
        case'email':
            return <input type={type} required={isRequired} name={name} placeholder={placeholder} className={block.className}/>
        case 'textarea':
            return <textarea required={isRequired} name={name} placeholder={placeholder} className={block.className} rows={5}/>
        case 'select':
            return <select name={name} className={block.className} required={isRequired}>
                <option value="">{placeholder}</option>
            </select>
        case 'acceptance':
            return <label className="checkbox">{placeholder}<input type="checkbox" name={name} required={isRequired}/><span className="checkmark"></span></label>
    }

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
