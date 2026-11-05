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
      "desktop:px-10",
      "px-6",
      "desktop:h-[76px]",
      "h-16",
      "desktop:fixed",
      "z-50",
      "backdrop-blur-[30px]",
    )
    expect(screen.getByRole("navigation").parentElement).toHaveClass(
      "desktop:flex",
      "hidden",
    )
  })

  it("renders desktop and mobile CTA slots", () => {
    render(
      <Header
        logo={<span>Logo</span>}
        mobileLogo={<span>Mobile Logo</span>}
        menuIcon={<span>Open</span>}
        closeIcon={<span>Close</span>}
        cta={<a href="/apply">지원하기</a>}
        mobileCta={<a href="/apply-mobile">지원하기</a>}
      >
        <HeaderNavigation href="/about">About</HeaderNavigation>
      </Header>,
    )

    fireEvent.click(screen.getByLabelText("Open navigation menu"))

    expect(screen.getAllByRole("link", { name: "지원하기" })).toHaveLength(2)
    expect(screen.getByRole("banner")).toHaveClass("bg-label-contrast")
    expect(screen.getByRole("banner")).not.toHaveClass("backdrop-blur-[30px]")
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

  it("passes the active menu state to mobile items", () => {
    render(
      <Header
        logo={<span>Logo</span>}
        mobileLogo={<span>Mobile Logo</span>}
        menuIcon={<span>Open</span>}
        closeIcon={<span>Close</span>}
      >
        <HeaderNavigation href="/about" state="pressed">
          About
        </HeaderNavigation>
        <HeaderNavigation href="/projects">Projects</HeaderNavigation>
      </Header>,
    )

    fireEvent.click(screen.getByLabelText("Open navigation menu"))

    const activeMobile = screen.getAllByRole("link", { name: "About" }).at(-1)
    const inactiveMobile = screen
      .getAllByRole("link", { name: "Projects" })
      .at(-1)

    expect(activeMobile).toHaveClass("text-body-16sb", "text-label-normal")
    expect(activeMobile).toHaveAttribute("aria-current", "page")
    expect(inactiveMobile).toHaveClass("text-body-16m", "text-label-light")
  })
})
