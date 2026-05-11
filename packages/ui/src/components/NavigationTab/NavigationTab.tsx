import {
  type ButtonHTMLAttributes,
  Children,
  cloneElement,
  type HTMLAttributes,
  isValidElement,
  type ReactNode,
} from "react"

type TabSize = "m" | "s"

const sizeStyles: Record<
  TabSize,
  {
    container: string
    item: string
    text: string
    textOffset: number
    activeText: string
    inactiveText: string
    underline: string
  }
> = {
  m: {
    container: "max-w-[1200px]",
    item: "h-[124px]",
    text: "text-[24px] leading-[36px] tracking-[-0.192px]",
    textOffset: 19,
    activeText: "font-semibold text-[var(--label-normal)]",
    inactiveText: "font-medium text-[var(--label-netural)]",
    underline: "after:h-[3px]",
  },
  s: {
    container: "max-w-[1024px]",
    item: "h-[104px]",
    text: "text-[16px] leading-[24px] tracking-[-0.04px]",
    textOffset: 28,
    activeText: "font-bold text-[var(--label-normal)]",
    inactiveText: "font-medium text-[var(--label-netural)]",
    underline: "after:h-[2px]",
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
  const styles = sizeStyles[size]

  return (
    <button
      className={cn(
        "relative flex min-w-0 flex-1 basis-0 items-center justify-center border-b border-[var(--line-alternative)] px-4",
        styles.item,
        active
          ? "after:absolute after:bottom-0 after:left-0 after:w-full after:bg-[var(--brand-primary)]"
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
          "whitespace-nowrap font-['Pretendard',sans-serif]",
          styles.text,
          active ? styles.activeText : styles.inactiveText,
        )}
        style={{ transform: `translateY(${styles.textOffset}px)` }}
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
