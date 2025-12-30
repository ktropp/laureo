"use client"
export default function FormFieldBlockClient({block, state, onInputChange}) {
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
            return <div className="form-field-text flex flex-col gap-1">
                <input type={type} required={isRequired} name={name} placeholder={placeholder}
                       onChange={(e) => onInputChange(e.target, block?.text)}
                       onBlur={(e) => onInputChange(e.target, block?.text)}
                       className={block.className}
                       data-invalid={(state?.errors?.[name] && state?.formErrors?.[name] === undefined) || state?.formErrors?.[name]}
                       defaultValue={state?.data?.[name]}/>
                {((state?.errors?.[name] && state?.formErrors?.[name] === undefined) || state?.formErrors?.[name]) &&
                    <span
                        className="error text-sm text-error">{state?.errors?.[name]?.[0] || state?.formErrors?.[name]?.[0]}</span>}
            </div>
        case 'textarea':
            return <div className="form-field-textarea flex flex-col gap-1">
                <textarea required={isRequired} name={name} placeholder={placeholder} className={block.className}
                          onChange={(e) => onInputChange(e.target, block?.text)}
                          onBlur={(e) => onInputChange(e.target, block?.text)}
                          rows={5}
                          data-invalid={(state?.errors?.[name] && state?.formErrors?.[name] === undefined) || state?.formErrors?.[name]}
                          defaultValue={state?.data?.[name]}/>
                {((state?.errors?.[name] && state?.formErrors?.[name] === undefined) || state?.formErrors?.[name]) &&
                    <span
                        className="error text-sm text-error">{state?.errors?.[name]?.[0] || state?.formErrors?.[name]?.[0]}</span>}
            </div>
        case 'select':
            return <div className="form-field-select flex flex-col gap-1">
                <select name={name} className={block.className} required={isRequired}
                        onChange={(e) => onInputChange(e.target, block?.text)}
                        onBlur={(e) => onInputChange(e.target, block?.text)}
                        data-invalid={(state?.errors?.[name] && state?.formErrors?.[name] === undefined) || state?.formErrors?.[name]}
                        defaultValue={state?.data?.[name]}>
                    <option value="">{placeholder}</option>
                    <option value="test">test</option>
                </select>
                {((state?.errors?.[name] && state?.formErrors?.[name] === undefined) || state?.formErrors?.[name]) &&
                    <span
                        className="error text-sm text-error">{state?.errors?.[name]?.[0] || state?.formErrors?.[name]?.[0]}</span>}
            </div>
        case 'acceptance':
            return <div className="form-field-acceptance flex flex-col gap-1">
                <label className="checkbox">{placeholder}<input type="checkbox" name={name}
                                                                required={isRequired}
                                                                onChange={(e) => onInputChange(e.target, block?.text)}
                                                                onBlur={(e) => onInputChange(e.target, block?.text)}
                                                                defaultChecked={state?.data?.[name] === 'on'}/><span
                    className="checkmark"></span></label>
                {((state?.errors?.[name] && state?.formErrors?.[name] === undefined) || state?.formErrors?.[name]) &&
                    <span
                        className="error text-sm text-error">{state?.errors?.[name]?.[0] || state?.formErrors?.[name]?.[0]}</span>}
            </div>
        case 'file':
            return <div className="form-field-file flex flex-col gap-1">
                <label>{placeholder}</label>
                <div className="form-field-file-input">
                    <input type="file" name={name} required={isRequired}
                           onChange={(e) => onInputChange(e.target, block?.text)} className={block.className}/>
                </div>
                {((state?.errors?.[name] && state?.formErrors?.[name] === undefined) || state?.formErrors?.[name]) &&
                    <span
                        className="error text-sm text-error">{state?.errors?.[name]?.[0] || state?.formErrors?.[name]?.[0]}</span>}
            </div>
    }

    return null
}