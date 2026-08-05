"use client"
import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'accent' | 'outline' | 'ghost' | 'glass'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"
    
    const variants = {
      default: "bg-foreground text-white hover:bg-black/90 shadow-soft hover:shadow-medium",
      accent: "bg-accent text-black hover:bg-yellow-300 shadow-soft hover:shadow-glow font-semibold",
      outline: "border border-border bg-white hover:bg-muted text-foreground",
      ghost: "hover:bg-muted text-foreground",
      glass: "bg-white/80 backdrop-blur-md border border-white/20 shadow-soft hover:bg-white/90 hover:shadow-medium",
    }
    
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-[15px]",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10",
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
export { Button }
