import {
  Children,
  type HTMLAttributes,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useId,
  useState,
} from "react"

import { cn } from "../../utils/cn"
import { HeaderMobileItem } from "../HeaderMobile/HeaderMobile"
import type { HeaderNavigationProps } from "../HeaderNavigation/HeaderNavigation"

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  logo?: ReactNode
  children?: ReactNode
  mobileLogo?: ReactNode
  menuIcon?: ReactNode
  closeIcon?: ReactNode
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  menuId?: string
  mobileIconClassName?: string
  mobileMenuClassName?: string
}

function getMobileItems(children?: ReactNode) {
  return Children.map(children, (child) => {
    if (!isValidElement<HeaderNavigationProps>(child)) {
      return child
    }

    const element = child as ReactElement<HeaderNavigationProps>
    const childProps = element.props

    if ("href" in childProps && typeof childProps.href === "string") {
      return (
        <HeaderMobileItem href={childProps.href}>
          {childProps.children}
        </HeaderMobileItem>
      )
    }

    return (
      <HeaderMobileItem onClick={childProps.onClick}>
        {childProps.children}
      </HeaderMobileItem>
    )
  })
}

export function Header({
  logo,
  children,
  mobileLogo,
  menuIcon,
  closeIcon,
  isOpen,
  defaultOpen = false,
  onOpenChange,
  menuId,
  mobileIconClassName,
  mobileMenuClassName,
  className,
  ...props
}: HeaderProps) {
  const generatedMenuId = useId()
  const resolvedMenuId = menuId ?? generatedMenuId
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isMenuOpen = isOpen ?? internalOpen
  const hasMobileControls = Boolean(mobileLogo || menuIcon || closeIcon)

  const setMenuOpen = (nextOpen: boolean) => {
    if (isOpen === undefined) {
      setInternalOpen(nextOpen)
    }

    onOpenChange?.(nextOpen)
  }

  return (
    <header className={cn("w-full bg-fill-normal", className)} {...props}>
      <div className="hidden items-center justify-between px-10 py-6 lg:flex">
        <div className="shrink-0">{logo}</div>
        <nav className="flex min-w-0 items-center justify-end gap-6 overflow-hidden">
          {children}
        </nav>
      </div>

      {hasMobileControls ? (
        <div className="lg:hidden">
          <div className="flex h-17.25 w-full items-center justify-between bg-fill-normal px-4 py-5">
            <div className="shrink-0">{mobileLogo ?? logo}</div>
            <button
              type="button"
              className={cn(
                "flex size-6 shrink-0 items-center justify-center transition-transform duration-200",
                "text-label-normal",
                isMenuOpen && "rotate-90",
                mobileIconClassName,
              )}
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-controls={resolvedMenuId}
              aria-expanded={isMenuOpen}
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              {isMenuOpen ? closeIcon : menuIcon}
            </button>
          </div>

          <div
            id={resolvedMenuId}
            className={cn(
              "fixed top-[69px] left-0 right-0 bottom-0 z-40 bg-white",
              !isMenuOpen && "hidden",
              mobileMenuClassName,
            )}
          >
            <nav
              className={
                isMenuOpen ? "flex flex-col items-center bg-white" : "hidden"
              }
            >
              {getMobileItems(children)}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  )
}
