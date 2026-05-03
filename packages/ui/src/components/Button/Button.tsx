import { ArrowRightIcon, ArrowRightMIcon } from "@kusitms.com/icons"
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
        "group relative overflow-hidden inline-flex items-center justify-center rounded-[48px] transition-colors",
        size === "desktop"
          ? cn("py-2 px-6 gap-2", disabled ? "text-body-18m" : "text-body-18sb")
          : cn(
              "py-2 px-3 gap-1",
              disabled ? "text-label-14r" : "text-label-14m",
            ),
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
      <span>{children}</span>
      {showIcon &&
        (size === "desktop" ? (
          <ArrowRightMIcon
            className={cn(
              "size-6 shrink-0",
              disabled ? "text-label-light" : "text-label-contrast",
            )}
          />
        ) : (
          <ArrowRightIcon
            className={cn(
              "size-5 shrink-0",
              disabled ? "text-label-light" : "text-label-contrast",
            )}
          />
        ))}
    </button>
  )
}
