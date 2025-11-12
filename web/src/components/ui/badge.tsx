import * as React from "react"
import { cn } from "../../lib/utils" // nếu bạn chưa có utils, xem hướng dẫn dưới

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "bg-primary text-primary-foreground border-transparent": variant === "default",
          "bg-secondary text-secondary-foreground border-transparent": variant === "secondary",
          "text-foreground": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}
