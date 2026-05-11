import { RightSIcon } from "@kusitms.com/icons"
import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react"
import { cn } from "../../utils/cn"

export type NavigationButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    icon?: ReactNode
    showArrow?: boolean
  }
>

export function NavigationButton({
  children,
  className,
  icon,
  showArrow = true,
  ...props
}: NavigationButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "group relative inline-flex items-center overflow-hidden rounded-lg bg-fill-netural pl-3 pr-2 py-2 gap-2 text-label-netural transition-colors cursor-pointer",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 rounded-lg bg-transparent transition-colors group-hover:bg-interaction-hover-inverse" />
      {icon ? (
        <span className="relative z-10 inline-flex size-5 shrink-0 items-center justify-center overflow-hidden">
          {icon}
        </span>
      ) : null}
      <span
        className={cn(
          "relative z-10 flex-1 text-left text-body-16m",
          !showArrow && "pr-1",
        )}
      >
        {children}
      </span>
      {showArrow ? (
        <RightSIcon
          aria-hidden="true"
          className="relative z-10 size-5 shrink-0 text-label-alternative"
        />
      ) : null}
    </button>
  )
}
