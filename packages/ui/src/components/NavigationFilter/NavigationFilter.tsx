import {
  type ButtonHTMLAttributes,
  Children,
  cloneElement,
  type HTMLAttributes,
  isValidElement,
  type ReactNode,
} from "react"

type FilterDevice = "desktop" | "mobile"

const filterStyles: Record<
  FilterDevice,
  {
    container: string
    item: string
    activeItem?: string
    inactiveItem?: string
    text: string
    activeText: string
    inactiveText: string
  }
> = {
  desktop: {
    container: "justify-center gap-5",
    item: "min-w-[120px] px-[10px] py-[10px]",
    activeItem: "bg-[var(--fill-primary)]",
    text: "text-[20px] leading-[32px] tracking-[-0.16px]",
    activeText: "font-bold text-[var(--brand-primary)]",
    inactiveText: "font-medium text-[var(--label-netural)]",
  },
  mobile: {
    container:
      "justify-start gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]",
    item: "py-1",
    activeItem: "bg-[var(--fill-primary)] px-4",
    inactiveItem: "px-3",
    text: "text-[16px] leading-[24px] tracking-[-0.04px]",
    activeText: "font-semibold text-[var(--brand-primary)]",
    inactiveText: "font-medium text-[var(--label-netural)]",
  },
}

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
  const styles = filterStyles[device]

  return (
    <button
      aria-pressed={active}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full whitespace-nowrap",
        styles.item,
        active ? styles.activeItem : styles.inactiveItem,
        className,
      )}
      type="button"
      {...props}
    >
      <span
        className={cn(
          "font-['Pretendard',sans-serif]",
          styles.text,
          active ? styles.activeText : styles.inactiveText,
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
  const styles = filterStyles[device]
  const childrenWithDevice = Children.map(children, (child) => {
    if (!isValidElement<Partial<FilterItemProps>>(child)) {
      return child
    }

    return cloneElement(child, {
      device: child.props.device ?? device,
    })
  })

  return (
    <div
      className={cn(
        "flex w-full items-center",
        device === "desktop" ? "flex-wrap" : undefined,
        styles.container,
        className,
      )}
      {...props}
    >
      {childrenWithDevice}
    </div>
  )
}
