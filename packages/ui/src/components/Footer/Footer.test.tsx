import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Footer } from "./Footer"

describe("Footer", () => {
  it("renders the default bylaws content as a link when href is provided", () => {
    render(<Footer bylawsHref="/bylaws" logo={<span>Logo</span>} />)

    expect(
      screen.getByRole("link", {
        name: "학회정관",
      }),
    ).toHaveAttribute("href", "/bylaws")
  })

  it("does not bake frame widths into the desktop footer component", () => {
    render(<Footer logo={<span>Logo</span>} />)

    const classes = screen.getByRole("contentinfo").className.split(" ")

    expect(classes).toContain("w-full")
    expect(classes).not.toContain("w-[1280px]")
    expect(classes).not.toContain("min-w-[1024px]")
  })

  it("aligns the responsive footer columns like the production website", () => {
    const { container } = render(<Footer logo={<span>Logo</span>} />)

    const row = container.querySelector("footer > div")

    expect(row).toHaveClass("desktop:flex-row")
    expect(row).toHaveClass("flex-col")
    expect(row).toHaveClass("justify-between")
  })

  it("does not bake frame widths into the responsive footer component", () => {
    render(<Footer logo={<span>Logo</span>} />)

    const classes = screen.getByRole("contentinfo").className.split(" ")

    expect(classes).toContain("w-full")
    expect(classes).not.toContain("w-[320px]")
    expect(classes).not.toContain("min-w-[1024px]")
  })

  it("pushes the contact column to the far edge on desktop", () => {
    const { container } = render(<Footer logo={<span>Logo</span>} />)

    const row = container.querySelector("footer > div")
    const classes = row?.className.split(" ") ?? []

    expect(classes).toContain("justify-between")
    expect(classes).not.toContain("gap-[496px]")
  })

  it("allows copyright text to preserve intended line breaks", () => {
    render(
      <Footer
        logo={<span>Logo</span>}
        copyright="KUSITMS very long copyright text that should wrap in narrow layouts"
      />,
    )

    expect(
      screen.getByText(
        "KUSITMS very long copyright text that should wrap in narrow layouts",
      ),
    ).toHaveClass("whitespace-pre-line")
  })

  it("renders production copy and spacing hooks by default", () => {
    render(
      <Footer
        logo={<span>Logo</span>}
        contactIcons={<a href="mailto:kusitms@gmail.com">mail</a>}
        scrollTopButton={
          <button aria-label="맨 위로 이동" type="button">
            top
          </button>
        }
        bylawsHref="/bylaws"
      />,
    )

    expect(screen.getByRole("contentinfo")).toHaveClass("py-[60px]")
    expect(
      screen.getByText(/KUSITMS \(큐시즘, 한국대학생IT경영학회\)/),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/ⓒ 2023\. KUSITMS\. All rights reserved\./),
    ).toBeInTheDocument()
    expect(screen.getByLabelText("맨 위로 이동")).toBeInTheDocument()
  })

  it("lets the footer omit the scroll top slot", () => {
    render(
      <Footer
        logo={<span>Logo</span>}
        scrollTopButton={
          <button aria-label="맨 위로 이동" type="button">
            top
          </button>
        }
        scrollTopPlacement="none"
      />,
    )

    expect(screen.queryByLabelText("맨 위로 이동")).not.toBeInTheDocument()
  })
})
