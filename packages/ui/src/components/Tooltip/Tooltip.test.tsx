import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Tooltip } from "./Tooltip"

describe("Tooltip", () => {
  it("renders the label inside a tooltip role", () => {
    render(<Tooltip label="kusitms@gmail.com" />)

    expect(screen.getByRole("tooltip")).toHaveTextContent("kusitms@gmail.com")
  })

  it("centers the arrow by default and aligns it to the end when asked", () => {
    const { rerender } = render(<Tooltip label="mail" />)
    expect(screen.getByRole("tooltip")).toHaveClass("items-center")

    rerender(<Tooltip label="mail" arrow="end" />)
    expect(screen.getByRole("tooltip")).toHaveClass("items-end")
  })

  it("dims the bubble and the arrow with the interaction token on hover", () => {
    const { container } = render(<Tooltip label="mail" />)

    expect(
      container.querySelector("div > div > span[aria-hidden]"),
    ).toHaveClass("group-hover/tooltip:bg-interaction-dim")
    const arrows = container.querySelectorAll("svg")
    expect(arrows).toHaveLength(2)
    expect(arrows[1]).toHaveClass("group-hover/tooltip:text-interaction-dim")
    expect(screen.getByText("mail")).toHaveClass(
      "group-hover/tooltip:underline",
    )
  })
})
