import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FilterItem, NavigationFilter } from "./NavigationFilter"

describe("NavigationFilter", () => {
  it("allows horizontal scrolling on mobile", () => {
    render(
      <NavigationFilter device="mobile">
        <FilterItem>One</FilterItem>
      </NavigationFilter>,
    )

    expect(
      screen.getByText("One").parentElement?.parentElement?.className,
    ).toContain("overflow-x-auto")
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
