import type { ButtonHTMLAttributes } from "react"

type PageNavButtonSize = "desktop" | "mobile"
type PageNavButtonColor = "light" | "dark"
type PageNavButtonDirection = "prev" | "next"

export type PageNavButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: PageNavButtonSize
  color?: PageNavButtonColor
  direction?: PageNavButtonDirection
  className?: string
}

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ")
}

function ArrowIcon({ size }: { size: PageNavButtonSize }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 52 52"
      fill="none"
      className="relative z-10 size-full"
    >
      <path
        d="M22 16L32 26L22 36"
        stroke="currentColor"
        strokeWidth={size === "desktop" ? 3.4 : 2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PageNavButton({
  className,
  size = "desktop",
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
        size === "desktop" ? "size-13" : "size-9",
        color === "light"
          ? "bg-fill-transparent-white text-static-white"
          : "bg-fill-transparent-black text-static-white",
        direction === "prev" ? "rotate-180" : undefined,
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-transparent transition-colors group-active:bg-interaction-pressed" />
      <ArrowIcon size={size} />
    </button>
  )
}
