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
  /** 데스크톱 우측 CTA. 보통 `<Button size="m" showIcon={false}>` */
  cta?: ReactNode
  /** 모바일 메뉴 하단 CTA. 보통 `<DefaultButton size="m">` */
  mobileCta?: ReactNode
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
    const isActive = Boolean(
      childProps.isActive || childProps.state === "pressed",
    )

    if ("href" in childProps && typeof childProps.href === "string") {
      return (
        <HeaderMobileItem href={childProps.href} isActive={isActive}>
          {childProps.children}
        </HeaderMobileItem>
      )
    }

    return (
      <HeaderMobileItem onClick={childProps.onClick} isActive={isActive}>
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
  cta,
  mobileCta,
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
        "w-full h-16 px-6 py-5 desktop:h-[76px] desktop:px-10 desktop:py-4 desktop:fixed top-0 left-0 z-50",
        // 열린 상태 모바일에서 backdrop-filter를 빼야 내부 fixed 메뉴가 viewport 기준으로 잡힌다.
        hasMobileControls && isMenuOpen
          ? "bg-label-contrast desktop:bg-fill-netural/10 desktop:backdrop-blur-[30px]"
          : "bg-fill-netural/10 backdrop-blur-[30px]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "max-w-[1360px] h-full w-full mx-auto flex items-center justify-between",
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
        <div className="desktop:flex hidden min-w-0 items-center gap-6">
          <nav className="flex min-w-0 items-center justify-end gap-6 overflow-hidden text-center">
            {children}
          </nav>
          {cta ? <div className="shrink-0">{cta}</div> : null}
        </div>

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
                "fixed top-16 left-0 right-0 bottom-0 z-40 px-5 pt-6 pb-9",
                "bg-linear-to-t from-white/0 to-white backdrop-blur-[7.5px]",
                isMenuOpen ? "flex flex-col" : "hidden",
                mobileMenuClassName,
              )}
            >
              <nav className="flex flex-col items-start gap-2 pl-1">
                {getMobileItems(children)}
                {mobileCta}
              </nav>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
