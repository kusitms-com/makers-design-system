import type { ButtonHTMLAttributes } from "react"

type ScrollTopButtonSize = "desktop" | "mobile"

export type ScrollTopButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ScrollTopButtonSize
  className?: string
}

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ")
}

function DesktopArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      className="relative z-10 size-full"
    >
      <path
        d="M16.002 22L24.002 14L32.002 22"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.002 14V33"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      fill="none"
      className="relative z-10 size-full"
    >
      <path
        d="M13.333 18.333L20 11.667L26.667 18.333"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12V25.333"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ScrollTopButton({
  className,
  size = "desktop",
  ...props
}: ScrollTopButtonProps) {
  return (
    <button
      type="button"
      aria-label="맨 위로 이동"
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full border transition-colors cursor-pointer",
        size === "desktop" ? "size-12" : "size-10",
        "border-line-neutral bg-fill-normal text-static-black active:bg-interaction-pressed",
        className,
      )}
      {...props}
    >
      {size === "desktop" ? <DesktopArrowIcon /> : <MobileArrowIcon />}
    </button>
  )
}
