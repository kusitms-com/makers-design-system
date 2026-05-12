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
      "hover:text-label-normal",
      "active:text-brand-primary",
    )
  })

  it("constrains long labels in narrow header layouts", () => {
    render(<HeaderNavigation>Very long navigation label</HeaderNavigation>)

    expect(
      screen.getByRole("button", { name: "Very long navigation label" }),
    ).toHaveClass("max-w-full", "overflow-hidden", "text-ellipsis")
  })
})
