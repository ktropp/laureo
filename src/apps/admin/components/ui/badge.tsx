import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-slate-50 hover:bg-primary/80",
        secondary:
          "border-transparent bg-slate-800 text-slate-50 hover:bg-secondary/80 dark:bg-slate-50 dark:text-slate-950",
        destructive:
          "border-transparent bg-red-600 text-slate-50 hover:bg-red-600/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
