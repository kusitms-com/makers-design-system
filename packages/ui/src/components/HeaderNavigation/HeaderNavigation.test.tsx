import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { HeaderNavigation } from "./HeaderNavigation"

describe("HeaderNavigation", () => {
  it("renders a link when href is provided", () => {
    render(<HeaderNavigation href="/about">About</HeaderNavigation>)

    expect(
      screen.getByRole("link", {
        name: "About",
      }),
    ).toHaveAttribute("href", "/about")
  })

  it("includes interactive hover and pressed styles for default navigation", () => {
    render(<HeaderNavigation>About</HeaderNavigation>)

    expect(screen.getByRole("button", { name: "About" })).toHaveClass(
      "p-3",
      "text-body-16m",
      "text-label-light",
      "hover:text-label-normal",
    )
  })

  it("uses the active style for pressed state", () => {
    render(<HeaderNavigation state="pressed">About</HeaderNavigation>)

    expect(screen.getByRole("button", { name: "About" })).toHaveClass(
      "text-body-16sb",
      "text-label-normal",
    )
  })

  it("isActive marks the link as the current page", () => {
    render(
      <HeaderNavigation href="/about" isActive>
        About
      </HeaderNavigation>,
    )

    const link = screen.getByRole("link", { name: "About" })
    expect(link).toHaveClass("text-body-16sb", "text-label-normal")
    expect(link).toHaveAttribute("aria-current", "page")
  })

  it("constrains long labels in narrow header layouts", () => {
    render(<HeaderNavigation>Very long navigation label</HeaderNavigation>)

    expect(
      screen.getByRole("button", { name: "Very long navigation label" }),
    ).toHaveClass("max-w-full", "overflow-hidden", "text-ellipsis")
  })
})
