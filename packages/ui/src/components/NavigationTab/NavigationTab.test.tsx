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

    expect(tab).toHaveClass("h-26")
    expect(screen.getByText("Small tab")).toHaveClass("text-body-16m")
  })

  it("uses responsive sizing by default", () => {
    render(
      <NavigationTab>
        <NavigationTabItem active>Responsive tab</NavigationTabItem>
      </NavigationTab>,
    )

    const tab = screen.getByRole("tab", { name: "Responsive tab" })

    expect(screen.getByRole("tablist")).toHaveClass("max-w-256", "lg:max-w-300")
    expect(tab).toHaveClass("h-26", "lg:h-31")
    expect(screen.getByText("Responsive tab")).toHaveClass(
      "text-body-16m",
      "lg:text-headline-24m",
    )
  })

  it("constrains long tab labels inside the tab item", () => {
    render(
      <NavigationTabItem>Very long navigation tab label</NavigationTabItem>,
    )

    expect(screen.getByText("Very long navigation tab label")).toHaveClass(
      "max-w-full",
      "overflow-hidden",
      "text-ellipsis",
    )
  })
})
