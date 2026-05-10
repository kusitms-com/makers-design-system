import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { FilterItem, NavigationFilter } from "./NavigationFilter"
import { NavigationTab, NavigationTabItem } from "./NavigationTab"
import { Pagination } from "./Pagination"

describe("NavigationTab", () => {
  it("renders tab semantics for interactive items", () => {
    render(
      <NavigationTab size="m">
        <NavigationTabItem active size="m">
          Active tab
        </NavigationTabItem>
        <NavigationTabItem size="m">Inactive tab</NavigationTabItem>
      </NavigationTab>,
    )

    expect(screen.getByRole("tablist")).toBeInTheDocument()
    expect(
      screen.getByRole("tab", {
        name: "Active tab",
      }),
    ).toHaveAttribute("aria-selected", "true")
  })
})

describe("NavigationFilter", () => {
  it("allows horizontal scrolling on mobile", () => {
    render(
      <NavigationFilter device="mobile">
        <FilterItem device="mobile">One</FilterItem>
      </NavigationFilter>,
    )

    expect(
      screen.getByText("One").parentElement?.parentElement?.className,
    ).toContain("overflow-x-auto")
  })
})

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
})
