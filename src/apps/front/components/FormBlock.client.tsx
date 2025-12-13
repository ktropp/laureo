"use client"

import {z} from "zod";
import React, {useActionState} from "react";
import {sendForm} from "@front/actions/sendForm";
export default function FormBlockClient({children, block}) {
    const [state, action, pending] = useActionState(sendForm, undefined);

    let fields = []
    React.Children.map(children, (child) => {
        if (child.props.block && child.props.block.text) {
            const block = child.props.block;
            const cleanText = block?.text.replace(/<[^>]*>/g, '').trim();

            // Match the pattern: type* name "placeholder"
            const regex = /^(\w+\*?)[\s]+([^\s"]+)[\s]+"([^"]*)"$/;
            const match = cleanText.match(regex);

            if (!match) return null;

            const [, typeWithStar, name, placeholder] = match;
            const isRequired = typeWithStar.endsWith('*');
            const type = typeWithStar.replace('*', '');

            fields.push({
                name: name, fieldType: z.string()
            })
        }
    })
    fields = fields as { name: string, fieldType: z.ZodSchema }[]

    const generateSchemaFromFields = (fields: { name: string; fieldType: z.ZodSchema }[]) => {
        const schemaObject = Object.fromEntries(fields.map((field) => [field.name, field.fieldType]))

        return z.object(schemaObject)
    }

    const schema = generateSchemaFromFields(fields)

    return <form noValidate className={block.className} action={sendForm}>
        <input type="hidden" name="formId" value={block.index}/>
        {children}
    </form>
}