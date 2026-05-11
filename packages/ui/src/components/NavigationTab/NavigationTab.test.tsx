import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { NavigationTab, NavigationTabItem } from "./NavigationTab"

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

  it("passes container size to tab items by default", () => {
    render(
      <NavigationTab size="s">
        <NavigationTabItem>Small tab</NavigationTabItem>
      </NavigationTab>,
    )

    const tab = screen.getByRole("tab", { name: "Small tab" })

    expect(tab).toHaveClass("h-[104px]")
    expect(screen.getByText("Small tab")).toHaveClass("text-[16px]")
  })
})
