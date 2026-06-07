import type { HTMLAttributes, PropsWithChildren, ReactNode } from "react"
import { cn } from "../../utils/cn"

type LabelType = "brand" | "secondary" | "default"

export type LabelProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    type?: LabelType
    description?: ReactNode
    className?: string
  }
>

function getChipClasses(type: "brand" | "secondary") {
  switch (type) {
    case "brand":
      return cn(
        "inline-flex items-center justify-center rounded px-4 py-1",
        "bg-fill-primary text-brand-primary text-label-14sb whitespace-nowrap lg:w-16 lg:h-8",
      )
    case "secondary":
      return cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1",
        "bg-fill-netural text-label-alternative",
        "text-caption-12sb lg:text-label-14sb whitespace-nowrap",
      )
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
        {description != null && description !== "" && (
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
