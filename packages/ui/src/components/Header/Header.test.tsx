import { fireEvent, render, screen } from "@testing-library/react"
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

  it("matches the production website header shell", () => {
    render(
      <Header logo={<span>Logo</span>}>
        <HeaderNavigation href="/about">About</HeaderNavigation>
      </Header>,
    )

    expect(screen.getByRole("banner")).toHaveClass(
      "desktop:px-12",
      "px-4",
      "desktop:fixed",
      "z-50",
    )
    expect(screen.getByRole("navigation")).toHaveClass(
      "desktop:flex",
      "hidden",
      "text-center",
    )
  })

  it("renders mobile controls with a visible icon color", () => {
    render(
      <Header
        logo={<span>Logo</span>}
        mobileLogo={<span>Mobile Logo</span>}
        menuIcon={<svg data-testid="menu-icon" />}
        closeIcon={<svg data-testid="close-icon" />}
      >
        <HeaderNavigation href="/about">About</HeaderNavigation>
      </Header>,
    )

    expect(screen.getByLabelText("Open navigation menu")).toHaveClass(
      "text-label-normal",
    )
  })

  it("opens the mobile menu and renders mobile links", () => {
    render(
      <Header
        logo={<span>Logo</span>}
        mobileLogo={<span>Mobile Logo</span>}
        menuIcon={<span>Open</span>}
        closeIcon={<span>Close</span>}
      >
        <HeaderNavigation href="/about">About</HeaderNavigation>
      </Header>,
    )

    fireEvent.click(screen.getByLabelText("Open navigation menu"))

    expect(screen.getByLabelText("Close navigation menu")).toHaveAttribute(
      "aria-expanded",
      "true",
    )
    expect(screen.getAllByRole("link", { name: "About" })).toHaveLength(2)
    expect(document.body.style.overflow).toBe("hidden")
  })

  it("matches website mobile menu item width and divider", () => {
    const { container } = render(
      <Header
        logo={<span>Logo</span>}
        mobileLogo={<span>Mobile Logo</span>}
        menuIcon={<span>Open</span>}
        closeIcon={<span>Close</span>}
      >
        <HeaderNavigation href="/about">About</HeaderNavigation>
      </Header>,
    )

    fireEvent.click(screen.getByLabelText("Open navigation menu"))

    const mobileLink = screen.getAllByRole("link", { name: "About" }).at(-1)
    const divider = container.querySelector("a[href='/about'] span:last-child")

    expect(mobileLink).toHaveClass("w-[328px]")
    expect(mobileLink).not.toHaveClass("w-full")
    expect(divider).toHaveClass("w-[288px]")
    expect(divider).toHaveClass("h-[2px]")
  })
})
