import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react"

export type NavigationButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    icon?: ReactNode
    showArrow?: boolean
  }
>

function cn(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ")
}

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
      <span className="relative z-10 flex-1 text-left text-base font-medium leading-6 tracking-[-0.04px]">
        {children}
      </span>
      {showArrow ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="relative z-10 size-5 shrink-0 text-label-alternative"
        >
          <path
            d="M7 4L13 10L7 16"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </button>
  )
}
