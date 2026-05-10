import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Header } from "./Header"
import { HeaderMobile, HeaderMobileMenu } from "./HeaderMobile"
import { HeaderNavigation } from "./HeaderNavigation"

describe("Header navigation", () => {
  it("renders a link when href is provided", () => {
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

  it("exposes the mobile menu toggle state to assistive tech", () => {
    render(
      <HeaderMobile
        logo={<span>Logo</span>}
        menuIcon={<span>Open</span>}
        closeIcon={<span>Close</span>}
        isOpen
      />,
    )

    expect(
      screen.getByRole("button", {
        name: "Close navigation menu",
      }),
    ).toHaveAttribute("aria-expanded", "true")
  })

  it("does not bake desktop frame width into the header component", () => {
    render(<Header logo={<span>Logo</span>} />)

    const classes = screen.getByRole("banner").className.split(" ")

    expect(classes).toContain("w-full")
    expect(classes).not.toContain("w-[1280px]")
    expect(classes).not.toContain("min-w-[1024px]")
  })
})

describe("HeaderMobileMenu", () => {
  it("re-measures content height when the menu opens", () => {
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      get() {
        return this.className === "hidden" ? 0 : 120
      },
    })

    const { rerender, container } = render(
      <HeaderMobileMenu isOpen={false}>
        <div>Menu content</div>
      </HeaderMobileMenu>,
    )

    rerender(
      <HeaderMobileMenu isOpen>
        <div>Menu content</div>
      </HeaderMobileMenu>,
    )

    expect(container.firstChild).toHaveStyle({ maxHeight: "120px" })
  })

  it("does not bake mobile frame width into the mobile header component", () => {
    render(
      <HeaderMobile
        logo={<span>Logo</span>}
        menuIcon={<span>Open</span>}
        closeIcon={<span>Close</span>}
      />,
    )

    const classes = screen
      .getByRole("button")
      .parentElement?.className.split(" ")

    expect(classes).toContain("w-full")
    expect(classes).not.toContain("w-[320px]")
    expect(classes).not.toContain("min-w-[320px]")
  })
})
