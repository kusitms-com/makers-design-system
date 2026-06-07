import { ArrowRightIcon, ArrowRightMIcon } from "@kusitms.com/icons"
import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react"
import { cn } from "../../utils/cn"

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    showIcon?: boolean
    variant?: "default" | "websiteCta"
    icon?: ReactNode
  }
>

export function Button({
  children,
  className,
  disabled,
  showIcon = true,
  variant = "default",
  icon,
  ...props
}: ButtonProps) {
  if (variant === "websiteCta") {
    return (
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "text-gray-0 rounded-full cursor-pointer w-fit text-body-8 desktop:text-body-4 flex gap-[12px] justify-center items-center pl-[32px] pr-[24px] py-[10px] bg-dark-blue-500 hover:bg-dark-blue-400 active:bg-dark-blue-600",
          disabled && "cursor-not-allowed bg-fill-alternative text-label-light",
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        {showIcon
          ? (icon ?? (
              <ArrowRightIcon className="w-[20px] h-[20px] desktop:w-[24px] desktop:h-[24px]" />
            ))
          : null}
      </button>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "group relative overflow-hidden inline-flex items-center justify-center rounded-full transition-colors",
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
      <span className={showIcon ? "pl-2" : undefined}>{children}</span>
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
