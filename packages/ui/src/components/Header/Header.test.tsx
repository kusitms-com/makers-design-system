import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { HeaderNavigation } from "../HeaderNavigation/HeaderNavigation"
import { Header } from "./Header"

describe("Header", () => {
  it("renders navigation children", () => {
    render(
      <Header logo={<span>Logo</span>}>
        <HeaderNavigation href="/about">About</HeaderNavigation>
      </Header>,
    )

    expect(
      screen.getByRole("link", {
        name: "About",
      }),
    ).toHaveAttribute("href", "/about")
  })

  it("does not bake desktop frame width into the header component", () => {
    render(<Header logo={<span>Logo</span>} />)

    const classes = screen.getByRole("banner").className.split(" ")

    expect(classes).toContain("w-full")
    expect(classes).not.toContain("w-[1280px]")
    expect(classes).not.toContain("min-w-[1024px]")
  })

  it("constrains the desktop navigation region inside the header", () => {
    const { container } = render(
      <Header logo={<span>Logo</span>}>
        <HeaderNavigation>Long navigation label</HeaderNavigation>
      </Header>,
    )

    const nav = container.querySelector("nav")

    expect(nav).toHaveClass("min-w-0", "overflow-hidden")
  })
})
