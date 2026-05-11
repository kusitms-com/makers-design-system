import {
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
  KeyboardDoubleArrowLeftIcon,
  KeyboardDoubleArrowRightIcon,
} from "@kusitms.com/icons"
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

const paginationControlClassName =
  "flex size-6 items-center justify-center disabled:pointer-events-none"

export function Pagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
  prevIcon = <KeyboardArrowLeftIcon aria-hidden="true" />,
  nextIcon = <KeyboardArrowRightIcon aria-hidden="true" />,
  firstIcon = <KeyboardDoubleArrowLeftIcon aria-hidden="true" />,
  lastIcon = <KeyboardDoubleArrowRightIcon aria-hidden="true" />,
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

  const isFirstPage = safeCurrentPage === 1
  const isLastPage = safeCurrentPage === safeTotalPages
  const getControlClassName = (disabled: boolean) =>
    cn(
      paginationControlClassName,
      disabled ? "text-[var(--label-disable)]" : "text-[var(--label-normal)]",
    )

  return (
    <div
      className={cn("inline-flex h-11 items-center gap-5", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={getControlClassName(isFirstPage)}
          onClick={() => handlePageChange(1)}
          disabled={isFirstPage}
          aria-label="First page"
        >
          {firstIcon}
        </button>
        <button
          type="button"
          className={getControlClassName(isFirstPage)}
          onClick={() => handlePageChange(safeCurrentPage - 1)}
          disabled={isFirstPage}
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
          className={getControlClassName(isLastPage)}
          onClick={() => handlePageChange(safeCurrentPage + 1)}
          disabled={isLastPage}
          aria-label="Next page"
        >
          {nextIcon}
        </button>
        <button
          type="button"
          className={getControlClassName(isLastPage)}
          onClick={() => handlePageChange(safeTotalPages)}
          disabled={isLastPage}
          aria-label="Last page"
        >
          {lastIcon}
        </button>
      </div>
    </div>
  )
}
