import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  type TransitionEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "../../utils/cn"

export type HeaderMobileProps = HTMLAttributes<HTMLDivElement> & {
  logo?: ReactNode
  menuIcon?: ReactNode
  closeIcon?: ReactNode
  isOpen?: boolean
  onToggle?: () => void
  menuId?: string
}

export function HeaderMobile({
  logo,
  menuIcon,
  closeIcon,
  isOpen = false,
  onToggle,
  menuId,
  className,
  ...props
}: HeaderMobileProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        "bg-fill-normal px-4 py-5",
        "h-17.25 w-full",
        className,
      )}
      {...props}
    >
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

export type HeaderMobileMenuProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  isOpen?: boolean
}

export function HeaderMobileMenu({
  children,
  isOpen = false,
  className,
  style,
  onTransitionEnd,
  ...props
}: HeaderMobileMenuProps) {
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

    if (!isOpen || !content) {
      return
    }

    if (typeof ResizeObserver === "undefined") {
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

    onTransitionEnd?.(event)
  }

  return (
    <div
      className={cn(
        "overflow-hidden transition-[max-height] duration-300 ease-in-out",
        className,
      )}
      style={{ ...style, maxHeight: isOpen ? height : 0 }}
      onTransitionEnd={handleTransitionEnd}
      {...props}
    >
      <div ref={contentRef} className={isVisible || isOpen ? "" : "hidden"}>
        {children}
      </div>
    </div>
  )
}

type HeaderMobileItemBaseProps = {
  children?: ReactNode
}

type HeaderMobileItemButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> & {
  href?: undefined
}

type HeaderMobileItemLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

export type HeaderMobileItemProps = HeaderMobileItemBaseProps &
  (HeaderMobileItemButtonProps | HeaderMobileItemLinkProps)

function isHeaderMobileItemLinkProps(
  props: HeaderMobileItemProps,
): props is HeaderMobileItemBaseProps & HeaderMobileItemLinkProps {
  return "href" in props && typeof props.href === "string"
}

export function HeaderMobileItem({
  children,
  className,
  ...props
}: HeaderMobileItemProps) {
  const sharedClassName = cn(
    "flex w-full flex-col items-center gap-3",
    "bg-fill-netural px-4 py-5",
    className,
  )
  const content = (
    <>
      <span className="w-full whitespace-nowrap text-center font-sans text-headline-20sb text-label-normal">
        {children}
      </span>
      <span className="h-px w-full bg-line-alternative" />
    </>
  )

  if (isHeaderMobileItemLinkProps(props)) {
    return (
      <a className={sharedClassName} {...props}>
        {content}
      </a>
    )
  }

  const buttonProps = props as HeaderMobileItemButtonProps

  return (
    <button className={sharedClassName} {...buttonProps} type="button">
      {content}
    </button>
  )
}
