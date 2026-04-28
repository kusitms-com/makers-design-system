import { ArrowRightIcon } from "@kusitms.com/icons"
import type { ButtonHTMLAttributes, PropsWithChildren } from "react"

type ButtonSize = "desktop" | "mobile"

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: ButtonSize
    className?: string
    showIcon?: boolean
  }
>

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ")
}

export function Button({
  children,
  className,
  size = "desktop",
  disabled,
  showIcon = true,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "group relative overflow-hidden inline-flex items-center justify-between rounded-[48px] transition-colors",
        size === "desktop"
          ? "py-2 px-6 gap-2 text-base"
          : "py-2 px-3 gap-1 text-sm",
        disabled
          ? "bg-fill-alternative text-label-light cursor-not-allowed"
          : "bg-brand-primary text-label-contrast cursor-pointer",
        className,
      )}
      {...props}
    >
      {!disabled && (
        <span className="pointer-events-none absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/25 group-active:bg-black/8" />
      )}
      <span className={showIcon ? "ml-2" : undefined}>{children}</span>
      {showIcon && (
        <ArrowRightIcon
          className={cn(
            size === "desktop" ? "size-6" : "size-5",
            disabled ? "text-label-light" : "text-label-contrast",
          )}
        />
      )}
    </button>
  )
}
