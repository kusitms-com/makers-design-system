import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Footer } from "./Footer"

describe("Footer", () => {
  it("renders the default bylaws content as a link when href is provided", () => {
    render(<Footer bylawsHref="/bylaws" logo={<span>Logo</span>} />)

    const links = screen.getAllByRole("link", {
      name: "학회정관",
    })

    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute("href", "/bylaws")
    expect(links[1]).toHaveAttribute("href", "/bylaws")
  })

  it("does not bake frame widths into the desktop footer component", () => {
    render(<Footer logo={<span>Logo</span>} />)

    const classes = screen.getByRole("contentinfo").className.split(" ")

    expect(classes).toContain("w-full")
    expect(classes).not.toContain("w-[1280px]")
    expect(classes).not.toContain("min-w-[1024px]")
  })

  it("aligns the desktop footer columns to the bottom edge", () => {
    const { container } = render(<Footer logo={<span>Logo</span>} />)

    const row = container.querySelector("footer > div > div")

    expect(row?.className.split(" ")).toContain("items-end")
  })

  it("pushes the desktop contact column to the far edge", () => {
    const { container } = render(<Footer logo={<span>Logo</span>} />)

    const row = container.querySelector("footer > div > div")
    const classes = row?.className.split(" ") ?? []

    expect(classes).toContain("justify-between")
    expect(classes).not.toContain("gap-[496px]")
  })

  it("does not bake mobile frame widths into the footer component", () => {
    render(<Footer logo={<span>Logo</span>} />)

    const classes = screen.getByRole("contentinfo").className.split(" ")

    expect(classes).toContain("w-full")
    expect(classes).not.toContain("w-[320px]")
    expect(classes).not.toContain("min-w-[320px]")
  })

  it("allows desktop copyright text to wrap inside its column", () => {
    render(
      <Footer
        logo={<span>Logo</span>}
        copyright="KUSITMS very long copyright text that should wrap in narrow layouts"
      />,
    )

    const copyrightTexts = screen.getAllByText(
      "KUSITMS very long copyright text that should wrap in narrow layouts",
    )

    expect(copyrightTexts[0]).toHaveClass("whitespace-pre-wrap")
    expect(copyrightTexts[1]).toHaveClass("whitespace-pre-wrap")
  })

  it("renders desktop and mobile logo variants from one component", () => {
    render(
      <Footer
        logo={<span>Desktop Logo</span>}
        mobileLogo={<span>Mobile Logo</span>}
        scrollTopButton={<button type="button">Scroll top</button>}
      />,
    )

    expect(screen.getByText("Desktop Logo")).toBeInTheDocument()
    expect(screen.getByText("Mobile Logo")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Scroll top" }),
    ).toBeInTheDocument()
  })
})
