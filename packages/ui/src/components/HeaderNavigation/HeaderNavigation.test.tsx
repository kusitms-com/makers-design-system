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
      "px-7",
      "text-body-6",
      "hover:text-body-5",
    )
  })

  it("uses the production active navigation style for pressed state", () => {
    render(<HeaderNavigation state="pressed">About</HeaderNavigation>)

    expect(screen.getByRole("button", { name: "About" })).toHaveClass(
      "text-body-5",
      "text-dark-blue-600",
    )
  })

  it("constrains long labels in narrow header layouts", () => {
    render(<HeaderNavigation>Very long navigation label</HeaderNavigation>)

    expect(
      screen.getByRole("button", { name: "Very long navigation label" }),
    ).toHaveClass("max-w-full", "overflow-hidden", "text-ellipsis")
  })
})
