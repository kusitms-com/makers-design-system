import type { HTMLAttributes, ReactNode } from "react"

export type PaginationProps = HTMLAttributes<HTMLDivElement> & {
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  prevIcon?: ReactNode
  nextIcon?: ReactNode
  firstIcon?: ReactNode
  lastIcon?: ReactNode
}

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ")
}

export function Pagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
  prevIcon,
  nextIcon,
  firstIcon,
  lastIcon,
  className,
  ...props
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className={cn("flex items-center gap-5 pb-5", className)} {...props}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="size-6 flex items-center justify-center"
          onClick={() => onPageChange?.(1)}
          disabled={currentPage === 1}
        >
          {firstIcon}
        </button>
        <button
          type="button"
          className="size-6 flex items-center justify-center"
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {prevIcon}
        </button>
      </div>

      <div className="flex items-center gap-3">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={cn(
              "font-['Pretendard',sans-serif] text-[16px] leading-[24px] tracking-[-0.04px] whitespace-nowrap",
              page === currentPage
                ? "font-bold text-[var(--label-normal)]"
                : "font-medium text-[var(--label-disable)]",
            )}
            onClick={() => onPageChange?.(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="size-6 flex items-center justify-center"
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {nextIcon}
        </button>
        <button
          type="button"
          className="size-6 flex items-center justify-center"
          onClick={() => onPageChange?.(totalPages)}
          disabled={currentPage === totalPages}
        >
          {lastIcon}
        </button>
      </div>
    </div>
  )
}
