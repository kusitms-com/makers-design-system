import {
  type ButtonHTMLAttributes,
  Children,
  cloneElement,
  type HTMLAttributes,
  isValidElement,
  type ReactNode,
} from "react"
import { cn } from "../../utils/cn"

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
    item: "min-w-30 px-2.5 py-2.5",
    activeItem: "bg-fill-primary",
    text: "",
    activeText: "text-headline-20b text-brand-primary",
    inactiveText: "text-headline-20m text-label-netural",
  },
  mobile: {
    container:
      "justify-start gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]",
    item: "py-1",
    activeItem: "bg-fill-primary px-4",
    inactiveItem: "px-3",
    text: "",
    activeText: "text-body-16sb text-brand-primary",
    inactiveText: "text-body-16m text-label-netural",
  },
}

export type FilterItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  active?: boolean
  device?: FilterDevice
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
          "font-sans",
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
