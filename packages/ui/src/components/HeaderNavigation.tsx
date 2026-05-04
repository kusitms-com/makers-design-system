import type { ButtonHTMLAttributes, PropsWithChildren } from "react"

type HeaderNavState = "default" | "hovered" | "pressed"

export type HeaderNavigationProps = PropsWithChildren<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
    state?: HeaderNavState
  }
>

const stateStyles: Record<HeaderNavState, string> = {
  default: "font-medium text-[var(--label-light)]",
  hovered: "font-bold text-[var(--label-normal)]",
  pressed: "font-bold text-[var(--brand-primary)]",
}

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ")
}

export function HeaderNavigation({
  children,
  className,
  state = "default",
  ...props
}: HeaderNavigationProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center px-4 whitespace-nowrap",
        "font-['Pretendard',sans-serif] text-[16px] leading-[24px] tracking-[-0.04px]",
        stateStyles[state],
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}
