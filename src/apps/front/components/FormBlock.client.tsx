"use client"

import React, {useActionState} from "react";
import {sendForm} from "@front/actions/sendForm";
import FormFieldBlockClient from "@front/components/FormFieldBlock.client";
import {BlockJson} from "@admin/blocks/blockDefinitions";

export default function FormBlockClient({children, block}) {
    const [state, action, pending] = useActionState(sendForm, undefined);

    return <form noValidate className={block.className} action={async (formData) => {
        const result = await action(formData);

        console.log(result)
        console.log(state)

        if (result?.errors) {
            //show error message
        }
        // show success message
    }}>
        <input type="hidden" name="formId" value={block.index}/>
        {block.children.map((child: BlockJson, index) => <FormFieldBlockClient key={index} block={child} state={state}/>)}
        {children}
    </form>
}