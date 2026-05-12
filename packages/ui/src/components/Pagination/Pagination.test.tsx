import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { Pagination } from "./Pagination"

describe("Pagination", () => {
  it("clamps invalid page numbers to the available range", () => {
    const onPageChange = vi.fn()

    render(
      <Pagination currentPage={0} totalPages={3} onPageChange={onPageChange} />,
    )

    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "1" })).toHaveAttribute(
      "aria-current",
      "page",
    )

    fireEvent.click(screen.getByRole("button", { name: "Next page" }))

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it("styles page controls by disabled state", () => {
    render(<Pagination currentPage={2} totalPages={3} />)

    expect(screen.getByRole("button", { name: "Previous page" })).toHaveClass(
      "text-label-normal",
    )
    expect(screen.getByRole("button", { name: "Next page" })).toHaveClass(
      "text-label-normal",
    )
  })

  it("constrains pagination icon size inside controls", () => {
    render(<Pagination currentPage={2} totalPages={3} />)

    expect(screen.getByRole("button", { name: "Previous page" })).toHaveClass(
      "[&_svg]:size-6",
      "[&_svg]:shrink-0",
    )
  })

  it("renders a compact page window when total pages are large", () => {
    render(<Pagination currentPage={10} totalPages={20} />)

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "9" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "10" })).toHaveAttribute(
      "aria-current",
      "page",
    )
    expect(screen.getByRole("button", { name: "11" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "20" })).toBeInTheDocument()
    expect(screen.getAllByText("...")).toHaveLength(2)
  })

  it("does not render every page button for large totals", () => {
    render(<Pagination currentPage={10} totalPages={20} />)

    const numericButtons = screen
      .getAllByRole("button")
      .filter((button) => /^\d+$/.test(button.textContent ?? ""))

    expect(numericButtons).toHaveLength(5)
  })
})
