import { ArrowRightIcon } from "@kusitms.com/icons"
import type { ButtonHTMLAttributes } from "react"

export type ScrollTopButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
}

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ")
}

export function ScrollTopButton({ className, ...props }: ScrollTopButtonProps) {
  return (
    <button
      type="button"
      aria-label="맨 위로 이동"
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full border transition-colors cursor-pointer",
        "size-10 lg:size-12",
        "border-line-neutral bg-fill-normal text-static-black active:bg-interaction-pressed",
        className,
      )}
      {...props}
    >
      <ArrowRightIcon aria-hidden className="-rotate-90 size-5 lg:size-6" />
    </button>
  )
}
