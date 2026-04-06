import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Button } from "./Button"

describe("Button", () => {
  it("renders children and preserves button semantics", () => {
    render(<Button>Continue</Button>)

    expect(
      screen.getByRole("button", {
        name: "Continue",
      }),
    ).toHaveAttribute("type", "button")
  })

  it("applies the requested variant and size classes", () => {
    render(
      <Button size="sm" variant="secondary">
        Secondary
      </Button>,
    )

    const button = screen.getByRole("button", {
      name: "Secondary",
    })

    expect(button.className).toContain("h-9")
    expect(button.className).toContain("border")
  })
})
