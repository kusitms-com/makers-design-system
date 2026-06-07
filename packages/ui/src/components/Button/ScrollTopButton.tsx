import { ArrowRightIcon } from "@kusitms.com/icons"
import type { ButtonHTMLAttributes, MouseEventHandler } from "react"
import { useEffect, useState } from "react"
import { cn } from "../../utils/cn"

export type ScrollTopButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  behavior?: ScrollBehavior
  fixed?: boolean
}

export function ScrollTopButton({
  className,
  onClick,
  behavior = "smooth",
  fixed = false,
  ...props
}: ScrollTopButtonProps) {
  const [fixedStyle, setFixedStyle] = useState({
    bottom: 16,
    right: 16,
  })

  useEffect(() => {
    if (!fixed) {
      return
    }

    const updatePosition = () => {
      const isDesktop = window.innerWidth >= 1024
      const defaultBottom = isDesktop ? 40 : 16
      const footerSafeBottom = isDesktop ? 177 : 226
      const right = isDesktop ? 40 : 16
      const remainingToBottom =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight)

      const bottom =
        remainingToBottom <= footerSafeBottom
          ? Math.min(
              defaultBottom + (footerSafeBottom - remainingToBottom),
              footerSafeBottom,
            )
          : defaultBottom

      setFixedStyle({ bottom, right })
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition)

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition)
    }
  }, [fixed])

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event)

    if (event.defaultPrevented || onClick) {
      return
    }

    window.scrollTo({ top: 0, behavior })
  }

  return (
    <button
      type="button"
      aria-label="맨 위로 이동"
      className={cn(
        "group inline-flex items-center justify-center overflow-hidden rounded-full border transition-colors cursor-pointer",
        "size-10 lg:size-12",
        "border-line-neutral bg-fill-normal text-static-black active:bg-interaction-pressed",
        fixed ? "fixed z-50" : "relative",
        className,
      )}
      style={fixed ? fixedStyle : undefined}
      onClick={handleClick}
      {...props}
    >
      <ArrowRightIcon aria-hidden className="-rotate-90 size-5 lg:size-6" />
    </button>
  )
}
