import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "../../utils/cn"

type DefaultButtonSize = "xl" | "l" | "m" | "s"
type DefaultButtonVariant =
  | "strong"
  | "primary"
  | "outlined"
  | "error"
  | "disabled"

export type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: DefaultButtonSize
  variant?: DefaultButtonVariant
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const sizeStyles: Record<DefaultButtonSize, string> = {
  xl: "h-12 min-w-[140px] px-6 rounded-[8px] text-body-16sb",
  l: "h-11 min-w-[140px] px-6 rounded-[8px] text-body-16sb",
  m: "h-10 min-w-[100px] px-4 rounded-[8px] text-label-14sb",
  s: "h-9 min-w-[90px] px-4 rounded-[6px] text-label-14sb",
}

const variantStyles: Record<DefaultButtonVariant, string> = {
  strong: "bg-brand-primary text-label-contrast",
  primary: "bg-fill-primary text-brand-primary",
  outlined: "border border-line-normal bg-fill-normal text-label-netural",
  error: "bg-fill-destructive text-status-negative",
  disabled: "bg-fill-alternative text-label-light cursor-not-allowed",
}

/** Figma Button/Default. 8px radius 사각 버튼. */
export function DefaultButton({
  size = "m",
  variant = "strong",
  leftIcon,
  rightIcon,
  disabled,
  className,
  children,
  ...props
}: DefaultButtonProps) {
  const resolvedVariant = disabled ? "disabled" : variant

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1 py-2 cursor-pointer",
        sizeStyles[size],
        variantStyles[resolvedVariant],
        // Figma: xl disabled만 Medium 굵기
        size === "xl" && resolvedVariant === "disabled" && "text-body-16m",
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
