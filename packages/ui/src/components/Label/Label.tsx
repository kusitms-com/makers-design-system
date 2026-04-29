import type { HTMLAttributes, PropsWithChildren, ReactNode } from "react"

type LabelType = "brand" | "secondary" | "default"
type LabelSize = "desktop" | "mobile"

export type LabelProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    type?: LabelType
    size?: LabelSize
    /**
     * type="default"일 때 라벨 박스 옆에 함께 표시되는 보조 텍스트.
     * 다른 type에서는 무시된다.
     */
    description?: ReactNode
    className?: string
  }
>

function cn(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ")
}

const TEXT_BASE = "font-semibold leading-5 tracking-[0.175px] whitespace-nowrap"
const TEXT_CAPTION =
  "font-semibold leading-[18px] tracking-[0.168px] whitespace-nowrap"

function getChipClasses(type: LabelType, size: LabelSize) {
  const base = "inline-flex items-center justify-center rounded-[4px] px-4 py-1"

  switch (type) {
    case "brand":
      // brand는 desktop/mobile 디자인이 동일
      return cn(base, "bg-fill-primary text-brand-primary text-sm", TEXT_BASE)
    case "secondary":
      return cn(
        "inline-flex items-center justify-center rounded-[6px] px-3 py-1",
        "bg-fill-netural text-label-alternative",
        size === "mobile" ? `text-xs ${TEXT_CAPTION}` : `text-sm ${TEXT_BASE}`,
      )
    default:
      return undefined
  }
}

export function Label({
  children,
  className,
  type = "brand",
  size = "desktop",
  description,
  ...props
}: LabelProps) {
  if (type === "default") {
    return (
      <span
        className={cn("inline-flex items-center gap-2.5", className)}
        {...props}
      >
        <span
          className={cn(
            "inline-flex h-[30px] w-20 items-center justify-center rounded-[4px] bg-fill-netural",
            "text-label-normal text-sm",
            TEXT_BASE,
          )}
        >
          {children}
        </span>
        {description != null && (
          <span
            className={cn(
              "text-label-alternative text-sm font-medium leading-5 tracking-[0.175px] whitespace-nowrap",
            )}
          >
            {description}
          </span>
        )}
      </span>
    )
  }

  return (
    <span className={cn(getChipClasses(type, size), className)} {...props}>
      {children}
    </span>
  )
}
