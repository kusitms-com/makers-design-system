import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { Button } from "./Button"

describe("Button", () => {
  it("텍스트를 렌더링한다", () => {
    render(<Button>텍스트</Button>)
    expect(screen.getByRole("button", { name: /텍스트/ })).toBeInTheDocument()
  })

  it("type=button이 기본값이다", () => {
    render(<Button>텍스트</Button>)
    expect(screen.getByRole("button")).toHaveAttribute("type", "button")
  })

  it("desktop 사이즈 클래스가 적용된다", () => {
    render(<Button size="desktop">텍스트</Button>)
    expect(screen.getByRole("button").className).toContain("px-6")
  })

  it("mobile 사이즈 클래스가 적용된다", () => {
    render(<Button size="mobile">텍스트</Button>)
    expect(screen.getByRole("button").className).toContain("px-5")
  })

  it("ArrowRightIcon이 항상 렌더링된다", () => {
    render(<Button>텍스트</Button>)
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument()
  })

  it("disabled 상태에서 클릭이 동작하지 않는다", () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        텍스트
      </Button>,
    )
    fireEvent.click(screen.getByRole("button"))
    expect(onClick).not.toHaveBeenCalled()
  })

  it("클릭 핸들러가 호출된다", () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>텍스트</Button>)
    fireEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
