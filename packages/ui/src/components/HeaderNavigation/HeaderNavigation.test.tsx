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
})
