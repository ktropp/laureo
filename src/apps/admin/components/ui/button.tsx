import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "lib/utils"

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-laureo-primary text-laureo-text hover:bg-laureo-primary/90",
        destructive:
          "bg-red-600 text-laureo-text hover:bg-red-600/90",
        outline:
          "border border-laureo-border bg-laureo-body hover:bg-slate-200 hover:text-laureo-text-dark dark:bg-laureo-body-dark dark:border-laureo-border-dark dark:hover:bg-slate-900 dark:hover:text-laureo-text",
        secondary:
          "bg-laureo-secondary text-laureo-text hover:bg-laureo-secondary/80 dark:bg-laureo-body dark:text-laureo-text-dark",
        ghost: "hover:bg-slate-200 hover:text-laureo-text-dark dark:hover:bg-slate-900 dark:hover:text-laureo-text",
        link: "text-laureo-primary underline-offset-4 hover:underline",
        menu: "text-laureo-text-lighter hover:bg-slate-200 hover:text-laureo-text-dark focus:bg-slate-200 focus:text-laureo-text-dark dark:text-laureo-text-lighter-dark dark:hover:bg-slate-900 dark:hover:text-slate-100 dark:focus:bg-slate-900 dark:focus:text-slate-100 w-full justify-center xl:justify-start",
        menu_focus: "text-laureo-text-lighter bg-slate-200 text-laureo-text-dark dark:bg-slate-900 dark:text-slate-100 w-full justify-center xl:justify-start",
        menu_active: "bg-laureo-primary text-laureo-text shadow-sm w-full justify-center xl:justify-start"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        icon_small: "h-6 w-6 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
