import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FilterItem, NavigationFilter } from "./NavigationFilter"

describe("NavigationFilter", () => {
  it("allows horizontal scrolling on mobile", () => {
    render(
      <NavigationFilter device="mobile">
        <FilterItem device="mobile">One</FilterItem>
      </NavigationFilter>,
    )

    expect(
      screen.getByText("One").parentElement?.parentElement?.className,
    ).toContain("overflow-x-auto")
  })
})
