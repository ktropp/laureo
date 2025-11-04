import * as React from "react"

import {cn} from "lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string[] | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, error, ...props}, ref) => {
        const errorMessage = Array.isArray(error) ? error[0] : error;

        const borderColor = errorMessage ? "border-laureo-error dark:border-laureo-error" : "border-laureo-border dark:border-laureo-border-dark";
        const backgroundColor = props.readOnly ? "bg-laureo-border/30 dark:bg-laureo-border-dark/30" : "bg-laureo-body dark:bg-laureo-body-dark";

        return (
            <>
                <input
                    type={type}
                    className={cn(
                        `flex h-10 w-full rounded-md border ${borderColor} ${backgroundColor} px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {errorMessage && (<div className="text-laureo-error text-sm mt-2">{errorMessage}</div>)}
            </>
        )
    }
)
Input.displayName = "Input"

export {Input}