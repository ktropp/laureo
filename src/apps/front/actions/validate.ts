import {z} from "zod";

export function getFieldValidationRules(text, dict) {
    const cleanText = text?.replace(/<[^>]*>/g, '').trim();

    const regex = /^(\w+\*?)[\s]+([^\s"]+)[\s]+"([^"]*)"$/;
    const match = cleanText.match(regex);

    if (!match) return null;

    const [, typeWithStar, name, placeholder] = match;
    const isRequired = typeWithStar.endsWith('*');
    const type = typeWithStar.replace('*', '');

    switch (type) {
        case 'acceptance':
            if (isRequired) {
                return {
                    name: name, fieldType: z.literal("on", {message: dict.validation.required})
                }
            } else {
                return {
                    name: name, fieldType: z.boolean().optional()
                }
            }
            break;
        case 'email':
            if (isRequired) {
                return {
                    name: name,
                    fieldType: z.string().trim().nonempty(dict.validation.required).email(dict.validation.email)
                }
            } else {
                return {
                    name: name, fieldType: z.string().optional()
                }
            }
            break;
        case 'file':
            //TODO: validate file input for specific file types
            break;
        default:
            if (isRequired) {
                return {
                    name: name, fieldType: z.string().trim().nonempty(dict.validation.required)
                }
            } else {
                return {
                    name: name, fieldType: z.string().optional()
                }
            }
            break;
    }

    return null
}

export function getValidationSchema(fields){
    fields = fields as { name: string, fieldType: z.ZodSchema }[]

    const generateSchemaFromFields = (fields: { name: string; fieldType: z.ZodSchema }[]) => {
        const schemaObject = Object.fromEntries(fields.map((field) => [field.name, field.fieldType]))

        return z.object(schemaObject)
    }

    return generateSchemaFromFields(fields)
}

export function validateField(){

}