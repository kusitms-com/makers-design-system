import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react"

type FilterDevice = "desktop" | "mobile"

export type FilterItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  active?: boolean
  device?: FilterDevice
}

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ")
}

export function FilterItem({
  children,
  active = false,
  device = "desktop",
  className,
  ...props
}: FilterItemProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-full whitespace-nowrap",
        device === "desktop"
          ? active
            ? "bg-[var(--fill-primary)] w-[120px] p-[10px]"
            : "w-[120px] p-[10px]"
          : active
            ? "bg-[var(--fill-primary)] px-4 py-1"
            : "px-3 py-1",
        className,
      )}
      type="button"
      {...props}
    >
      <span
        className={cn(
          "font-['Pretendard',sans-serif]",
          device === "desktop"
            ? "text-[20px] leading-[32px] tracking-[-0.16px]"
            : "text-[16px] leading-[24px] tracking-[-0.04px]",
          active
            ? device === "desktop"
              ? "font-bold text-[var(--brand-primary)]"
              : "font-semibold text-[var(--brand-primary)]"
            : "font-medium text-[var(--label-netural)]",
        )}
      >
        {children}
      </span>
    </button>
  )
}

export type NavigationFilterProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  device?: FilterDevice
}

export function NavigationFilter({
  children,
  device = "desktop",
  className,
  ...props
}: NavigationFilterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        device === "desktop"
          ? "gap-5 pb-[60px] px-[200px] w-[1024px]"
          : "gap-1 pb-[40px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
