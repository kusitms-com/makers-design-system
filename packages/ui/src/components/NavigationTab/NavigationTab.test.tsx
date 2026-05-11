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
})
