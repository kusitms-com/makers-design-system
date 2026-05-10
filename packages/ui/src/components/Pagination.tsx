import type { HTMLAttributes, ReactNode, SVGProps } from "react"

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

function ChevronIcon({
  direction,
  ...props
}: SVGProps<SVGSVGElement> & { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d={direction === "left" ? "M15 18L9 12L15 6" : "M9 6L15 12L9 18"}
      />
    </svg>
  )
}

function DoubleChevronIcon({
  direction,
  ...props
}: SVGProps<SVGSVGElement> & { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d={
          direction === "left"
            ? "M18 17L13 12L18 7M11 17L6 12L11 7"
            : "M6 7L11 12L6 17M13 7L18 12L13 17"
        }
      />
    </svg>
  )
}

export function Pagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
  prevIcon = <ChevronIcon direction="left" />,
  nextIcon = <ChevronIcon direction="right" />,
  firstIcon = <DoubleChevronIcon direction="left" />,
  lastIcon = <DoubleChevronIcon direction="right" />,
  className,
  ...props
}: PaginationProps) {
  const safeTotalPages = Math.max(1, Math.floor(totalPages))
  const safeCurrentPage = Math.min(
    safeTotalPages,
    Math.max(1, Math.floor(currentPage)),
  )
  const pages = Array.from({ length: safeTotalPages }, (_, i) => i + 1)

  const handlePageChange = (page: number) => {
    onPageChange?.(Math.min(safeTotalPages, Math.max(1, page)))
  }

  return (
    <div
      className={cn("inline-flex h-11 items-center gap-5", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex size-6 items-center justify-center text-[var(--label-normal)] disabled:text-[var(--label-disable)] disabled:pointer-events-none"
          onClick={() => handlePageChange(1)}
          disabled={safeCurrentPage === 1}
          aria-label="First page"
        >
          {firstIcon}
        </button>
        <button
          type="button"
          className="flex size-6 items-center justify-center text-[var(--label-normal)] disabled:text-[var(--label-disable)] disabled:pointer-events-none"
          onClick={() => handlePageChange(safeCurrentPage - 1)}
          disabled={safeCurrentPage === 1}
          aria-label="Previous page"
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
              page === safeCurrentPage
                ? "font-bold text-[var(--label-normal)]"
                : "font-medium text-[var(--label-disable)]",
            )}
            onClick={() => handlePageChange(page)}
            aria-current={page === safeCurrentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex size-6 items-center justify-center text-[var(--label-normal)] disabled:text-[var(--label-disable)] disabled:pointer-events-none"
          onClick={() => handlePageChange(safeCurrentPage + 1)}
          disabled={safeCurrentPage === safeTotalPages}
          aria-label="Next page"
        >
          {nextIcon}
        </button>
        <button
          type="button"
          className="flex size-6 items-center justify-center text-[var(--label-normal)] disabled:text-[var(--label-disable)] disabled:pointer-events-none"
          onClick={() => handlePageChange(safeTotalPages)}
          disabled={safeCurrentPage === safeTotalPages}
          aria-label="Last page"
        >
          {lastIcon}
        </button>
      </div>
    </div>
  )
}
