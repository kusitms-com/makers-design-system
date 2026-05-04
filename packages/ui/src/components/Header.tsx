import type { HTMLAttributes, ReactNode } from "react"

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  logo?: ReactNode
  children?: ReactNode
}

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ")
}

export function Header({ logo, children, className, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between",
        "mx-auto max-w-[1440px] min-w-[1024px] w-full",
        "bg-[var(--fill-normal)] px-10 py-6",
        className,
      )}
      {...props}
    >
      <div className="shrink-0">{logo}</div>
      <nav className="flex items-center gap-6">{children}</nav>
    </header>
  )
}
