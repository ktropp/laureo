import {clsx, type ClassValue} from "clsx"
import {extendTailwindMerge} from "tailwind-merge"
import {GlobalField} from "@front/lib/globalFields"

//TODO: this needs to be defined in settings, or parsed from tailwind
const customTwMerge = extendTailwindMerge({
    extend: {
        theme: {
            'text': ['heading-2', 'heading-3', 'small', 'heading-numbers'],
            'color': ['primary', 'primary-button', 'body-inverse', 'body'],
        },
    }
})

export function cn(...inputs: ClassValue[]) {
    return customTwMerge(clsx(inputs))
}

export function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export function sanitizeFrontendHtml(html: string, GlobalFields: GlobalField[]) {
    let returnHtml = html
    GlobalFields?.forEach(field => {
        returnHtml = returnHtml.replace('['+field.slug+']', field.value)
    })
    return returnHtml
}