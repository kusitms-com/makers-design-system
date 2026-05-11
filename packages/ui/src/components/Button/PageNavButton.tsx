import { RightSIcon } from "@kusitms.com/icons"
import type { ButtonHTMLAttributes } from "react"
import { cn } from "../../utils/cn"

type PageNavButtonColor = "light" | "dark"
type PageNavButtonDirection = "prev" | "next"

export type PageNavButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: PageNavButtonColor
  direction?: PageNavButtonDirection
  className?: string
}

export function PageNavButton({
  className,
  color = "light",
  direction = "next",
  ...props
}: PageNavButtonProps) {
  return (
    <button
      type="button"
      aria-label={
        direction === "next" ? "다음 페이지로 이동" : "이전 페이지로 이동"
      }
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full transition-colors cursor-pointer",
        "size-9 lg:size-13",
        color === "light"
          ? "bg-fill-transparent-white text-static-white"
          : "bg-fill-transparent-black text-static-white",
        direction === "prev" ? "rotate-180" : undefined,
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-transparent transition-colors group-active:bg-interaction-pressed" />
      <RightSIcon className="relative z-10 size-7 lg:size-10 translate-x-px" />
    </button>
  )
}
