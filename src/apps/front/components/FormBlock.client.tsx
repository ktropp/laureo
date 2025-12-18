"use client"

import React, {useActionState} from "react";
import {sendForm} from "@front/actions/sendForm";

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
        {children}
    </form>
}