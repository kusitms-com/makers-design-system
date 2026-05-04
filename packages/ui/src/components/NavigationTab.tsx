import type { HTMLAttributes, ReactNode } from "react"

type TabSize = "m" | "s"

export type NavigationTabItemProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  active?: boolean
  size?: TabSize
}

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ")
}

export function NavigationTabItem({
  children,
  active = false,
  size = "m",
  className,
  ...props
}: NavigationTabItemProps) {
  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-center px-4 min-w-0",
        size === "m"
          ? active
            ? "py-6 border-b-[3px] border-[var(--brand-primary)]"
            : "py-6 border-b-[2px] border-[var(--line-alternative)]"
          : active
            ? "py-3 border-b-[2px] border-[var(--brand-primary)]"
            : "py-3 border-b border-[var(--line-alternative)]",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "whitespace-nowrap font-['Pretendard',sans-serif]",
          size === "m"
            ? "text-[24px] leading-[36px] tracking-[-0.192px]"
            : "text-[16px] leading-[24px] tracking-[-0.04px]",
          active
            ? size === "m"
              ? "font-semibold text-[var(--label-normal)]"
              : "font-bold text-[var(--label-normal)]"
            : "font-medium text-[var(--label-light)]",
        )}
      >
        {children}
      </span>
    </div>
  )
}

export type NavigationTabProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  size?: TabSize
}

export function NavigationTab({
  children,
  size = "m",
  className,
  ...props
}: NavigationTabProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full",
        size === "m" ? "pt-5 pb-[60px]" : "pt-5 pb-9",
        size === "m" ? "max-w-[1200px]" : "max-w-[1024px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
