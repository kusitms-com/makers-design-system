import type { HTMLAttributes, PropsWithChildren, ReactNode } from "react"

type LabelType = "brand" | "secondary" | "default"

export type LabelProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    type?: LabelType
    description?: ReactNode
    className?: string
  }
>

function cn(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ")
}

function getChipClasses(type: LabelType) {
  const base = "inline-flex items-center justify-center rounded-[4px] px-4 py-1"

  switch (type) {
    case "brand":
      return cn(
        base,
        "bg-fill-primary text-brand-primary text-label-14sb whitespace-nowrap lg:w-16 lg:h-8",
      )
    case "secondary":
      return cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1",
        "bg-fill-netural text-label-alternative",
        "text-caption-12sb lg:text-label-14sb whitespace-nowrap",
      )
    default:
      return undefined
  }
}

export function Label({
  children,
  className,
  type = "brand",
  description,
  ...props
}: LabelProps) {
  if (type === "default") {
    return (
      <span
        className={cn("inline-flex self-start items-center gap-2.5", className)}
        {...props}
      >
        <span
          className={cn(
            "inline-flex h-7.5 w-20 items-center justify-center rounded-sm bg-fill-netural",
            "text-label-normal text-label-14sb whitespace-nowrap",
          )}
        >
          {children}
        </span>
        {description != null && (
          <span className="text-label-alternative text-label-14m whitespace-nowrap">
            {description}
          </span>
        )}
      </span>
    )
  }

  return (
    <span
      className={cn(getChipClasses(type), "self-start", className)}
      {...props}
    >
      {children}
    </span>
  )
}
