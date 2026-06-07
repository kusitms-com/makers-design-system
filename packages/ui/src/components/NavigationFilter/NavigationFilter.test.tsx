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

  it("supports the production website filter style", () => {
    render(
      <NavigationFilter device="website">
        <FilterItem active>기획</FilterItem>
        <FilterItem>디자인</FilterItem>
      </NavigationFilter>,
    )

    expect(screen.getByRole("button", { name: "기획" })).toHaveClass(
      "desktop:w-[120px]",
      "bg-dark-blue-50",
    )
    expect(screen.getByText("기획")).toHaveClass(
      "text-body-5",
      "desktop:text-body-1",
      "text-dark-blue-600",
    )
    expect(screen.getByText("디자인")).toHaveClass(
      "text-body-6",
      "desktop:text-body-2",
      "text-gray-700",
    )
  })
})
