import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 ${variant === "default" ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow" : ""} ${variant === "outline" ? "border border-slate-200 bg-transparent shadow-sm hover:bg-slate-100 hover:text-slate-900" : ""} ${variant === "ghost" ? "hover:bg-slate-100 hover:text-slate-900" : ""} ${size === "default" ? "h-9 px-4 py-2" : ""} ${size === "sm" ? "h-8 rounded-md px-3 text-xs" : ""} ${size === "lg" ? "h-10 rounded-md px-8" : ""} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
