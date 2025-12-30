"use client"

import React, {useActionState, useState} from "react";
import {sendForm, validateFormField} from "@front/actions/sendForm";
import FormFieldBlockClient from "@front/components/FormFieldBlock.client";
import FormSubmitBlockClient from "@front/components/FormSubmitBlock.client";
import {BlockJson} from "@admin/blocks/blockDefinitions";
import {getFieldValidationRules, getValidationSchema} from "@front/actions/validate";

export default function FormBlockClient({children, block, dict}) {
    const [state, action, pending] = useActionState(sendForm, undefined);
    const [formErrors, setFormErrors] = useState({})

    const handleInputChange = (target, fieldText) => {
        const rule = getFieldValidationRules(fieldText, dict)
        const schema = getValidationSchema([rule])
        const fieldName = target.getAttribute('name')
        let validation = schema.safeParse({[fieldName]: target.value})
        if (target.type === 'checkbox') {
            validation = schema.safeParse({[fieldName]: target.checked ? target.value : ''})
        }

        if (!validation.success) {
            setFormErrors(prev => ({
                ...prev,
                [fieldName]: validation.error.flatten().fieldErrors[fieldName]
            }))
        } else {
            setFormErrors(prev => ({
                ...prev,
                [fieldName]: null
            }))
        }
    }

    const renderChildren = (children): React.ReactNode => {
        return React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) {
                return child
            }

            if (child._owner.name === 'FormSubmitBlock') {
                return <FormSubmitBlockClient
                    pending={pending}
                    {...child.props}
                >{child}</FormSubmitBlockClient>
            }

            // Process nested children if they exist
            if (child.props.children) {
                child = React.cloneElement(child, {
                    ...child.props,
                    children: renderChildren(child.props.children)
                })
            }


            return child
        })
    }

    return <form noValidate className={block.className} action={action}>
        {state?.success && <div className="form-success">{state?.success}</div>}
        <input type="hidden" name="formId" value={block.index}/>
        {block.children.map((child: BlockJson, index) => <FormFieldBlockClient key={index} block={child}
                                                                               onInputChange={handleInputChange}
                                                                               state={{...state, formErrors}}/>)}
        {renderChildren(children)}
    </form>
}