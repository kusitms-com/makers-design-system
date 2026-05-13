import {
  type ButtonHTMLAttributes,
  Children,
  cloneElement,
  type HTMLAttributes,
  isValidElement,
  type ReactNode,
} from "react"

import { cn } from "../../utils/cn"

type TabSize = "m" | "s" | "responsive"

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
  responsive: {
    container: "max-w-256 lg:max-w-300",
    item: "h-26 lg:h-31",
    text: "text-body-16m lg:text-headline-24m",
    textOffset: "translate-y-7 lg:translate-y-4.75",
    activeText:
      "text-body-16b text-label-normal lg:text-headline-24sb lg:text-label-normal",
    inactiveText: "text-label-netural",
    underline: "after:h-0.5 lg:after:h-0.75",
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
  size = "responsive",
  className,
  ...props
}: NavigationTabItemProps) {
  const styles = sizeStyles[size]

  return (
    <button
      className={cn(
        "relative flex min-w-0 flex-1 basis-0 items-center justify-center border-b border-line-alternative px-4",
        styles.item,
        active
          ? "after:absolute after:bottom-0 after:left-0 after:w-full after:bg-brand-primary"
          : undefined,
        active ? styles.underline : undefined,
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
  size = "responsive",
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
