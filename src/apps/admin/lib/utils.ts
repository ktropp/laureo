import {clsx, type ClassValue} from "clsx"
import {extendTailwindMerge} from "tailwind-merge"

//TODO: this needs to be defined in settings, or parsed from tailwind
const customTwMerge = extendTailwindMerge({
    extend: {
        theme: {
            'text': ['heading-2', 'small', 'heading-numbers'],
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
