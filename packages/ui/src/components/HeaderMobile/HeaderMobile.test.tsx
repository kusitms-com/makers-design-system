import { act, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import {
  HeaderMobile,
  HeaderMobileItem,
  HeaderMobileMenu,
} from "./HeaderMobile"

const originalResizeObserver = globalThis.ResizeObserver

afterEach(() => {
  globalThis.ResizeObserver = originalResizeObserver
})

describe("HeaderMobile", () => {
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

  it("re-measures content height while the menu stays open", () => {
    let resizeCallback: ResizeObserverCallback | undefined

    globalThis.ResizeObserver = class {
      constructor(callback: ResizeObserverCallback) {
        resizeCallback = callback
      }

      disconnect = vi.fn()
      observe = vi.fn()
      unobserve = vi.fn()
    } as unknown as typeof ResizeObserver

    let contentHeight = 120

    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      get() {
        return this.textContent?.includes("Expanded") ? contentHeight : 120
      },
    })

    const { rerender, container } = render(
      <HeaderMobileMenu isOpen>
        <div>Menu content</div>
      </HeaderMobileMenu>,
    )

    expect(container.firstChild).toHaveStyle({ maxHeight: "120px" })

    contentHeight = 240
    rerender(
      <HeaderMobileMenu isOpen>
        <div>Expanded menu content</div>
      </HeaderMobileMenu>,
    )

    act(() => {
      resizeCallback?.([], {} as ResizeObserver)
    })

    expect(container.firstChild).toHaveStyle({ maxHeight: "240px" })
  })

  it("preserves internal transition handling when style and onTransitionEnd are provided", () => {
    const onTransitionEnd = vi.fn()
    const { container } = render(
      <HeaderMobileMenu
        isOpen
        onTransitionEnd={onTransitionEnd}
        style={{ color: "red", maxHeight: 999 }}
      >
        <div>Menu content</div>
      </HeaderMobileMenu>,
    )
    const menu = container.firstElementChild as HTMLElement

    expect(menu).toHaveStyle({ color: "rgb(255, 0, 0)", maxHeight: "120px" })

    fireEvent.transitionEnd(menu)

    expect(onTransitionEnd).toHaveBeenCalledTimes(1)
  })
})

describe("HeaderMobileItem", () => {
  it("renders a link when href is provided", () => {
    render(<HeaderMobileItem href="/about">About</HeaderMobileItem>)

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    )
  })

  it("renders a button by default", () => {
    render(<HeaderMobileItem>Projects</HeaderMobileItem>)

    expect(screen.getByRole("button", { name: "Projects" })).toHaveAttribute(
      "type",
      "button",
    )
  })

  it("constrains long mobile menu labels", () => {
    render(
      <HeaderMobileItem>Very long mobile navigation label</HeaderMobileItem>,
    )

    expect(screen.getByText("Very long mobile navigation label")).toHaveClass(
      "overflow-hidden",
      "text-ellipsis",
    )
  })
})
