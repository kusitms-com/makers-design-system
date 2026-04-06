import type { ButtonHTMLAttributes, PropsWithChildren } from "react"

type ButtonVariant = "primary" | "secondary"
type ButtonSize = "sm" | "md"

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: ButtonSize
    variant?: ButtonVariant
  }
>

const baseStyles =
  "inline-flex items-center justify-center rounded-[var(--radius-md)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

const sizeStyles: Record<ButtonSize, string> = {
  md: "h-10 px-4 text-sm",
  sm: "h-9 px-3 text-sm",
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-brand-600)] text-[var(--color-neutral-0)] shadow-[var(--shadow-sm)] hover:bg-[var(--color-brand-700)]",
  secondary:
    "border border-[var(--color-neutral-300)] bg-[var(--color-neutral-0)] text-[var(--color-neutral-950)] hover:bg-[var(--color-neutral-50)]",
}

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ")
}

export function Button({
  children,
  className,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}
