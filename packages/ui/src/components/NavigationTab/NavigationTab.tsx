import {
  type ButtonHTMLAttributes,
  Children,
  cloneElement,
  type HTMLAttributes,
  isValidElement,
  type ReactNode,
} from "react"

import { cn } from "../../utils/cn"

type TabSize = "m" | "s" | "website"

const sizeStyles: Record<
  TabSize,
  {
    container: string
    item: string
    text: string
    textOffset: string
    activeText: string
    inactiveText: string
    underline: string
    activeBorder?: string
    inactiveBorder?: string
  }
> = {
  m: {
    container: "max-w-300",
    item: "h-31",
    text: "text-headline-24m",
    textOffset: "translate-y-4.75",
    activeText: "text-headline-24sb text-label-normal",
    inactiveText: "text-label-netural",
    underline: "after:h-0.75",
  },
  s: {
    container: "max-w-256",
    item: "h-26",
    text: "text-body-16m",
    textOffset: "translate-y-7",
    activeText: "text-body-16b text-label-normal",
    inactiveText: "text-label-netural",
    underline: "after:h-0.5",
  },
  website: {
    container: "w-full h-[104px] tablet:h-[158px] tablet:px-10 pt-5",
    item: "h-12 tablet:h-[78px]",
    text: "text-body-6 tablet:text-body-2",
    textOffset: "",
    activeText: "text-body-5 tablet:text-body-1 text-gray-700",
    inactiveText: "text-body-6 tablet:text-body-2 text-gray-700",
    underline: "",
    activeBorder: "border-dark-blue-500 border-b-[3px]",
    inactiveBorder: "border-gray-100 border-b-[2px]",
  },
}

export type NavigationTabItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> & {
  children?: ReactNode
  active?: boolean
  size?: TabSize
}

export function NavigationTabItem({
  children,
  active = false,
  size = "m",
  className,
  ...props
}: NavigationTabItemProps) {
  const styles = sizeStyles[size]
  const isWebsite = size === "website"

  return (
    <button
      className={cn(
        "relative flex min-w-0 flex-1 basis-0 items-center justify-center px-4",
        isWebsite
          ? active
            ? styles.activeBorder
            : styles.inactiveBorder
          : "border-b border-line-alternative",
        styles.item,
        active && !isWebsite
          ? "after:absolute after:bottom-0 after:left-0 after:w-full after:bg-brand-primary"
          : undefined,
        active && !isWebsite ? styles.underline : undefined,
        className,
      )}
      role="tab"
      aria-selected={active}
      type="button"
      {...props}
    >
      <span
        className={cn(
          "max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-sans",
          styles.text,
          styles.textOffset,
          active ? styles.activeText : styles.inactiveText,
        )}
      >
        {children}
      </span>
    </button>
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
  const styles = sizeStyles[size]
  const childrenWithSize = Children.map(children, (child) => {
    if (!isValidElement<Partial<NavigationTabItemProps>>(child)) {
      return child
    }

    return cloneElement(child, {
      size: child.props.size ?? size,
    })
  })

  return (
    <div
      className={cn(
        "mx-auto flex w-full items-stretch",
        styles.container,
        className,
      )}
      role="tablist"
      aria-orientation="horizontal"
      {...props}
    >
      {childrenWithSize}
    </div>
  )
}
