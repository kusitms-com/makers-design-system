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
})
