import {
  Children,
  type HTMLAttributes,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useEffect,
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
  innerClassName?: string
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
  innerClassName,
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

  useEffect(() => {
    if (!hasMobileControls || !isMenuOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [hasMobileControls, isMenuOpen])

  return (
    <header
      className={cn(
        "w-full desktop:px-12 px-4 py-6 desktop:fixed top-0 left-0 z-50 bg-white",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "max-w-[2000px] w-full mx-auto flex items-center justify-between",
          innerClassName,
        )}
      >
        {hasMobileControls && mobileLogo ? (
          <>
            <div className="hidden shrink-0 desktop:block">{logo}</div>
            <div className="shrink-0 desktop:hidden">{mobileLogo}</div>
          </>
        ) : (
          <div className="shrink-0">{logo}</div>
        )}
        <nav className="desktop:flex hidden min-w-0 items-center justify-end overflow-hidden text-center">
          {children}
        </nav>

        {hasMobileControls ? (
          <div className="desktop:hidden flex items-center">
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

            <div
              id={resolvedMenuId}
              className={cn(
                "fixed top-[69px] left-0 right-0 bottom-0 z-40 bg-white",
                isMenuOpen ? "flex flex-col" : "hidden",
                mobileMenuClassName,
              )}
            >
              <nav className="flex flex-col justify-center items-center">
                {getMobileItems(children)}
              </nav>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
