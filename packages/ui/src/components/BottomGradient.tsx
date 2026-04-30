import type { HTMLAttributes } from "react"

export type BottomGradientProps = HTMLAttributes<HTMLDivElement> & {
  height?: number
}

export function BottomGradient({
  height = 54,
  className,
  style,
  ...props
}: BottomGradientProps) {
  return (
    <div
      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-none ${className ?? ""}`}
      style={{ height: `${height}px`, ...style }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white rounded-b-2xl" />
    </div>
  )
}
