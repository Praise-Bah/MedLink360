import { ButtonHTMLAttributes, forwardRef } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "ghost"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", size = "md", variant = "default", ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    
    const sizeClasses = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-11 px-8 text-lg"
    }
    
    const variantClasses = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-300 hover:bg-gray-50",
      ghost: "hover:bg-gray-100"
    }

    const combinedClassName = [
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      className
    ].filter(Boolean).join(" ")

    return (
      <button
        className={combinedClassName}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
