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

  it("keeps the desktop layout fluid instead of forcing a fixed width", () => {
    render(<Footer logo={<span>Logo</span>} />)

    const classes = screen.getByRole("contentinfo").className.split(" ")

    expect(classes).toContain("w-full")
    expect(classes).not.toContain("w-[1280px]")
  })

  it("keeps desktop content top-aligned with a fixed contact column", () => {
    const { container } = render(<Footer logo={<span>Logo</span>} />)

    const row = container.querySelector("footer > div")
    const contactColumn = screen.getByText("Contact").parentElement

    expect(row?.className.split(" ")).toContain("items-start")
    expect(contactColumn?.className.split(" ")).toContain("w-[316px]")
  })
})
