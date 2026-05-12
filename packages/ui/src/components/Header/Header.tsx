import type { HTMLAttributes, ReactNode } from "react"

import { cn } from "../../utils/cn"

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  logo?: ReactNode
  children?: ReactNode
}

export function Header({ logo, children, className, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between",
        "w-full",
        "bg-fill-normal px-10 py-6",
        className,
      )}
      {...props}
    >
      <div className="shrink-0">{logo}</div>
      <nav className="flex min-w-0 items-center justify-end gap-6 overflow-hidden">
        {children}
      </nav>
    </header>
  )
}
