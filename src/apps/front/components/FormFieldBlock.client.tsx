"use client"
export default function FormFieldBlockClient({block, state}) {
    const cleanText = block?.text?.replace(/<[^>]*>/g, '').trim();

    // Match the pattern: type* name "placeholder"
    const regex = /^(\w+\*?)[\s]+([^\s"]+)[\s]+"([^"]*)"$/;
    const match = cleanText?.match(regex);

    if (!match) return null;

    const [, typeWithStar, name, placeholder] = match;
    const isRequired = typeWithStar.endsWith('*');
    const type = typeWithStar.replace('*', '');

    switch (type) {
        case 'text':
        case'email':
            return <div className="flex flex-col gap-1">
                <input type={type} required={isRequired} name={name} placeholder={placeholder}
                       className={block.className} data-invalid={state?.errors[name]} defaultValue={state?.data[name]}/>
                {state?.errors[name] && <span className="error text-sm text-error">{state?.errors[name][0]}</span>}
            </div>
        case 'textarea':
            return <div className="flex flex-col gap-1">
                <textarea required={isRequired} name={name} placeholder={placeholder} className={block.className}
                          rows={5} data-invalid={state?.errors[name]} defaultValue={state?.data[name]}/>
                {state?.errors[name] && <span className="error text-sm text-error">{state?.errors[name][0]}</span>}
            </div>
        case 'select':
            return <div className="flex flex-col gap-1">
                <select name={name} className={block.className} required={isRequired} data-invalid={state?.errors[name]} defaultValue={state?.data[name]}>
                    <option value="">{placeholder}</option>
                </select>
                {state?.errors[name] && <span className="error text-sm text-error">{state?.errors[name][0]}</span>}
            </div>
        case 'acceptance':
            return <div className="flex flex-col gap-1">
                <label className="checkbox">{placeholder}<input type="checkbox" name={name}
                                                                required={isRequired}/><span
                    className="checkmark"></span></label>
                {state?.errors[name] && <span className="error text-sm text-error">{state?.errors[name][0]}</span>}
            </div>
    }

    return null
}