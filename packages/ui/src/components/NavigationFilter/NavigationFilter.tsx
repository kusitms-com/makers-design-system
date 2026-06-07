import {
  type ButtonHTMLAttributes,
  Children,
  cloneElement,
  type HTMLAttributes,
  isValidElement,
  type ReactNode,
} from "react"
import { cn } from "../../utils/cn"

type FilterDevice = "desktop" | "mobile" | "responsive" | "website"

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
  responsive: {
    container:
      "justify-start gap-1 overflow-x-auto pb-10 [scrollbar-width:none] [-ms-overflow-style:none] lg:justify-center lg:gap-5 lg:overflow-visible lg:px-50 lg:pb-15",
    item: "py-1 lg:min-w-30 lg:px-2.5 lg:py-2.5",
    activeItem: "bg-fill-primary px-4 lg:px-2.5",
    inactiveItem: "px-3 lg:px-2.5",
    text: "",
    activeText: "text-body-16sb text-brand-primary lg:text-headline-20b",
    inactiveText: "text-body-16m text-label-netural lg:text-headline-20m",
  },
  website: {
    container: "justify-center gap-1 desktop:gap-[20px]",
    item: "py-[4px] desktop:w-[120px] transition-colors duration-300",
    activeItem: "bg-dark-blue-50 px-[16px] desktop:py-[10px]",
    inactiveItem:
      "px-[12px] hover:bg-gray-50 hover:px-[16px] hover:desktop:py-[10px]",
    text: "",
    activeText: "text-body-5 desktop:text-body-1 text-dark-blue-600",
    inactiveText: "text-body-6 desktop:text-body-2 text-gray-700",
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
  device = "responsive",
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
  device = "responsive",
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
        device === "responsive" ? "lg:flex-wrap" : undefined,
        styles.container,
        className,
      )}
      {...props}
    >
      {childrenWithDevice}
    </div>
  )
}
