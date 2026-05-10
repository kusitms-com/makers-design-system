import {
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"

export type HeaderMobileProps = HTMLAttributes<HTMLDivElement> & {
  logo?: ReactNode
  menuIcon?: ReactNode
  closeIcon?: ReactNode
  isOpen?: boolean
  onToggle?: () => void
  menuId?: string
}

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ")
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
        "bg-[var(--fill-normal)] px-4 py-5",
        "min-w-[320px] max-w-[767px] w-full h-[69px]",
        className,
      )}
      {...props}
    >
      <div className="shrink-0">{logo}</div>
      <button
        type="button"
        className="shrink-0 size-6 flex items-center justify-center transition-transform duration-200"
        onClick={onToggle}
        style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
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
  ...props
}: HeaderMobileMenuProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    }
  }, [isOpen])

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsVisible(false)
    }
  }

  return (
    <div
      className={cn(
        "overflow-hidden transition-[max-height] duration-300 ease-in-out",
        className,
      )}
      style={{ maxHeight: isOpen ? height : 0 }}
      onTransitionEnd={handleTransitionEnd}
      {...props}
    >
      <div ref={contentRef} className={isVisible || isOpen ? "" : "hidden"}>
        {children}
      </div>
    </div>
  )
}

export type HeaderMobileItemProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
}

export function HeaderMobileItem({
  children,
  className,
  ...props
}: HeaderMobileItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3",
        "bg-[var(--fill-netural)] px-4 py-5 w-full",
        className,
      )}
      {...props}
    >
      <p className="w-full text-center font-['Pretendard',sans-serif] text-[20px] font-semibold leading-[32px] tracking-[-0.16px] text-[var(--label-normal)] whitespace-nowrap">
        {children}
      </p>
      <div className="w-full h-px bg-[var(--line-alternative)]" />
    </div>
  )
}
