import * as React from "react"

import { cn } from "lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string[] | undefined;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    const errorMessage = Array.isArray(error) ? error[0] : error;
    const borderColor = errorMessage ? "border-red-600 dark:border-red-600" : "border-laureo-border dark:border-laureo-border-dark";
    return (
      <textarea
        className={cn(
          `flex min-h-[80px] w-full rounded-md border ${borderColor} bg-laureo-body dark:bg-laureo-body-dark px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
