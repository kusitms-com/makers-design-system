import { ArrowRightIcon, ArrowRightMIcon } from "@kusitms.com/icons"
import type { ButtonHTMLAttributes, PropsWithChildren } from "react"

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
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
  disabled,
  showIcon = true,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "group relative overflow-hidden inline-flex items-center justify-center rounded-[48px] transition-colors",
        "py-2 px-3 gap-1 lg:px-6 lg:gap-2",
        disabled
          ? "text-label-14r lg:text-body-18m bg-fill-alternative text-label-light cursor-not-allowed"
          : "text-label-14m lg:text-body-18sb bg-brand-primary text-label-contrast cursor-pointer",
        className,
      )}
      {...props}
    >
      {!disabled && (
        <span className="pointer-events-none absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/25 group-active:bg-black/8" />
      )}
      <span className="pl-2">{children}</span>
      {showIcon && (
        <>
          <ArrowRightIcon
            className={cn(
              "size-5 shrink-0 lg:hidden",
              disabled ? "text-label-light" : "text-label-contrast",
            )}
          />
          <ArrowRightMIcon
            className={cn(
              "size-6 shrink-0 hidden lg:block",
              disabled ? "text-label-light" : "text-label-contrast",
            )}
          />
        </>
      )}
    </button>
  )
}
