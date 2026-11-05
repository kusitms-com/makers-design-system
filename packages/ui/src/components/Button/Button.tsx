import { ArrowRightIcon, ArrowRightMIcon } from "@kusitms.com/icons"
import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react"
import { cn } from "../../utils/cn"

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    showIcon?: boolean
    variant?: "default" | "glass" | "websiteCta"
    /** Button/Rounded size. desktop에서만 차이가 있고 mobile은 동일하다. */
    size?: "l" | "m"
    icon?: ReactNode
  }
>

export function Button({
  children,
  className,
  disabled,
  showIcon = true,
  variant = "default",
  size = "l",
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

  if (variant === "glass") {
    return (
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-label-contrast bg-fill-transparent-white px-5 py-2",
          "text-body-16b text-brand-primary cursor-pointer disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  }

  const isM = size === "m"

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "group relative overflow-hidden inline-flex items-center justify-center rounded-full transition-colors",
        "py-2 px-3 gap-1 lg:gap-2",
        isM ? "lg:px-5" : "lg:px-6",
        disabled
          ? cn(
              "text-label-14r bg-fill-alternative text-label-light cursor-not-allowed",
              isM ? "lg:text-body-16m" : "lg:text-body-18m",
            )
          : cn(
              "text-label-14m bg-brand-primary text-label-contrast cursor-pointer",
              isM ? "lg:text-body-16sb" : "lg:text-body-18sb",
            ),
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
