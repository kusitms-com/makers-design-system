import {
  Children,
  type HTMLAttributes,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type TransitionEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"

import { cn } from "../../utils/cn"

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
}

type NavigationChildProps = {
  children?: ReactNode
  href?: string
  onClick?: () => void
}

function HeaderMobileBar({
  logo,
  menuIcon,
  closeIcon,
  isOpen,
  onToggle,
  menuId,
}: {
  logo?: ReactNode
  menuIcon?: ReactNode
  closeIcon?: ReactNode
  isOpen: boolean
  onToggle: () => void
  menuId: string
}) {
  return (
    <div className="flex h-17.25 w-full items-center justify-between bg-fill-normal px-4 py-5">
      <div className="shrink-0">{logo}</div>
      <button
        type="button"
        className={cn(
          "flex size-6 shrink-0 items-center justify-center transition-transform duration-200",
          isOpen && "rotate-90",
        )}
        onClick={onToggle}
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? closeIcon : menuIcon}
      </button>
    </div>
  )
}

function HeaderMobileMenu({
  children,
  isOpen,
  menuId,
}: {
  children?: ReactNode
  isOpen: boolean
  menuId: string
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const updateHeight = useCallback(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen])

  useEffect(() => {
    updateHeight()
  }, [updateHeight])

  useEffect(() => {
    const content = contentRef.current

    if (!isOpen || !content || typeof ResizeObserver === "undefined") {
      return
    }

    const observer = new ResizeObserver(updateHeight)
    observer.observe(content)

    return () => observer.disconnect()
  }, [isOpen, updateHeight])

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    }
  }, [isOpen])

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !isOpen) {
      setIsVisible(false)
    }
  }

  return (
    <div
      id={menuId}
      className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
      style={{ maxHeight: isOpen ? height : 0 }}
      onTransitionEnd={handleTransitionEnd}
    >
      <nav
        ref={contentRef}
        className={isVisible || isOpen ? "bg-fill-netural" : "hidden"}
      >
        {children}
      </nav>
    </div>
  )
}

function HeaderMobileNavigationItem({
  child,
}: {
  child: ReactElement<NavigationChildProps>
}) {
  const className = cn(
    "flex w-full flex-col items-center gap-3 bg-fill-netural px-4 py-5",
  )
  const content = (
    <>
      <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center font-sans text-headline-20sb text-label-normal">
        {child.props.children}
      </span>
      <span className="h-px w-full bg-line-alternative" />
    </>
  )

  if (child.props.href) {
    return (
      <a className={className} href={child.props.href}>
        {content}
      </a>
    )
  }

  return (
    <button className={className} type="button" onClick={child.props.onClick}>
      {content}
    </button>
  )
}

function HeaderMobileNavigation({ children }: { children?: ReactNode }) {
  return Children.map(children, (child) => {
    if (!isValidElement<NavigationChildProps>(child)) {
      return child
    }

    return <HeaderMobileNavigationItem child={child} />
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
  className,
  ...props
}: HeaderProps) {
  const generatedMenuId = useId()
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const hasResponsiveHeader = Boolean(mobileLogo || menuIcon || closeIcon)
  const isMenuOpen = isOpen ?? uncontrolledOpen
  const resolvedMenuId = menuId ?? generatedMenuId

  const handleToggle = () => {
    const nextOpen = !isMenuOpen

    if (isOpen === undefined) {
      setUncontrolledOpen(nextOpen)
    }

    onOpenChange?.(nextOpen)
  }

  if (hasResponsiveHeader) {
    return (
      <header className={cn("w-full bg-fill-normal", className)} {...props}>
        <div className="hidden items-center justify-between px-10 py-6 lg:flex">
          <div className="shrink-0">{logo}</div>
          <nav className="flex min-w-0 items-center justify-end gap-6 overflow-hidden">
            {children}
          </nav>
        </div>

        <div className="lg:hidden">
          <HeaderMobileBar
            logo={mobileLogo ?? logo}
            menuIcon={menuIcon}
            closeIcon={closeIcon}
            isOpen={isMenuOpen}
            onToggle={handleToggle}
            menuId={resolvedMenuId}
          />
          <HeaderMobileMenu menuId={resolvedMenuId} isOpen={isMenuOpen}>
            <HeaderMobileNavigation>{children}</HeaderMobileNavigation>
          </HeaderMobileMenu>
        </div>
      </header>
    )
  }

  return (
    <header
      className={cn(
        "flex items-center justify-between",
        "w-full",
        "bg-fill-normal px-10 py-6",
        className,
      )}
      {...props}
    >
      <div className="shrink-0">{logo}</div>
      <nav className="flex min-w-0 items-center justify-end gap-6 overflow-hidden">
        {children}
      </nav>
    </header>
  )
}
