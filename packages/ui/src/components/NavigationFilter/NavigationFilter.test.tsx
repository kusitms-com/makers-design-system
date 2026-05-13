import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FilterItem, NavigationFilter } from "./NavigationFilter"

describe("NavigationFilter", () => {
  it("uses responsive layout by default", () => {
    render(
      <NavigationFilter>
        <FilterItem active>All</FilterItem>
        <FilterItem>Design</FilterItem>
      </NavigationFilter>,
    )

    const container = screen.getByRole("button", {
      name: "All",
    }).parentElement

    expect(container).toHaveClass("overflow-x-auto", "lg:overflow-visible")
    expect(screen.getByRole("button", { name: "All" })).toHaveClass(
      "py-1",
      "lg:min-w-30",
    )
    expect(screen.getByText("All")).toHaveClass(
      "text-body-16sb",
      "lg:text-headline-20b",
    )
  })

  it("passes container device to filter items by default", () => {
    render(
      <NavigationFilter device="mobile">
        <FilterItem>Design</FilterItem>
      </NavigationFilter>,
    )

    expect(screen.getByRole("button", { name: "Design" })).toHaveClass(
      "py-1",
      "px-3",
    )
    expect(screen.getByText("Design")).toHaveClass("text-body-16m")
  })
})
