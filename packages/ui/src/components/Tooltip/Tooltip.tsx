import { TooltipArrowIcon } from "@kusitms.com/icons"
import type { HTMLAttributes, ReactNode } from "react"

import { cn } from "../../utils/cn"

export type TooltipProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode
  arrow?: "center" | "end"
}

export function Tooltip({
  label,
  arrow = "center",
  className,
  ...props
}: TooltipProps) {
  return (
    <div
      role="tooltip"
      className={cn(
        "group/tooltip relative flex w-max max-w-[174px] flex-col drop-shadow-[0_1px_6px_rgba(179,179,188,0.6)]",
        arrow === "end" ? "items-end" : "items-center",
        className,
      )}
      {...props}
    >
      <div className="relative -mb-1 w-full overflow-hidden rounded-lg bg-label-netural px-4 py-2">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-colors group-hover/tooltip:bg-interaction-dim"
        />
        <span className="relative block truncate text-body-16r text-label-contrast group-hover/tooltip:underline">
          {label}
        </span>
      </div>
      <span aria-hidden className="relative h-3.5 w-9 shrink-0">
        <TooltipArrowIcon className="absolute inset-0 size-full text-label-netural" />
        <TooltipArrowIcon className="absolute inset-0 size-full text-transparent transition-colors group-hover/tooltip:text-interaction-dim" />
      </span>
    </div>
  )
}
