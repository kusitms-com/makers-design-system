import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { Button } from "./Button"
import { PageNavButton } from "./PageNavButton"
import { ScrollTopButton } from "./ScrollTopButton"

afterEach(() => {
  cleanup()
})

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
    expect(screen.getByRole("button").className).toContain("px-3")
  })

  it("ArrowRightIcon이 항상 렌더링된다", () => {
    render(<Button>텍스트</Button>)
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument()
  })

  it("showIcon=false일 때 아이콘이 렌더링되지 않는다", () => {
    render(<Button showIcon={false}>텍스트</Button>)
    expect(
      screen.getByRole("button").querySelector("svg"),
    ).not.toBeInTheDocument()
  })

  it("아이콘이 있을 때 텍스트에 ml-2가 적용된다", () => {
    render(<Button>텍스트</Button>)
    expect(
      screen.getByRole("button").querySelector("span:last-of-type"),
    ).toHaveClass("ml-2")
  })

  it("아이콘이 없을 때 텍스트에 ml-2가 적용되지 않는다", () => {
    render(<Button showIcon={false}>텍스트</Button>)
    expect(screen.getByRole("button").querySelector("span")).not.toHaveClass(
      "ml-2",
    )
  })

  it("disabled 상태에서는 hover 오버레이가 렌더링되지 않는다", () => {
    render(<Button disabled>텍스트</Button>)
    expect(
      screen.getByRole("button").querySelector(".pointer-events-none"),
    ).not.toBeInTheDocument()
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

describe("ScrollTopButton", () => {
  it("aria-label이 적용된다", () => {
    render(<ScrollTopButton />)
    expect(
      screen.getByRole("button", { name: "맨 위로 이동" }),
    ).toBeInTheDocument()
  })

  it("type=button이 기본값이다", () => {
    render(<ScrollTopButton />)
    expect(screen.getByRole("button")).toHaveAttribute("type", "button")
  })

  it("desktop 사이즈 클래스가 적용된다", () => {
    render(<ScrollTopButton size="desktop" />)
    expect(screen.getByRole("button").className).toContain("size-12")
    expect(screen.getByRole("button")).toHaveClass(
      "active:bg-interaction-pressed",
    )
    expect(screen.getByRole("button").querySelector("svg")).toHaveAttribute(
      "viewBox",
      "0 0 48 48",
    )
  })

  it("mobile 사이즈 클래스가 적용된다", () => {
    render(<ScrollTopButton size="mobile" />)
    expect(screen.getByRole("button").className).toContain("size-10")
    expect(screen.getByRole("button").querySelector("svg")).toHaveAttribute(
      "viewBox",
      "0 0 40 40",
    )
  })

  it("pressed 상태 스타일 클래스가 적용된다", () => {
    render(<ScrollTopButton />)
    expect(screen.getByRole("button")).toHaveClass(
      "active:bg-interaction-pressed",
    )
  })

  it("클릭 핸들러가 호출된다", () => {
    const onClick = vi.fn()
    render(<ScrollTopButton onClick={onClick} />)
    fireEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe("PageNavButton", () => {
  it("direction에 따라 aria-label이 적용된다", () => {
    render(<PageNavButton direction="next" />)
    expect(
      screen.getByRole("button", { name: "다음 페이지로 이동" }),
    ).toBeInTheDocument()
  })

  it("type=button이 기본값이다", () => {
    render(<PageNavButton />)
    expect(screen.getByRole("button")).toHaveAttribute("type", "button")
  })

  it("desktop 사이즈와 light 컬러 클래스가 적용된다", () => {
    render(<PageNavButton size="desktop" color="light" />)
    expect(screen.getByRole("button")).toHaveClass("size-13")
    expect(screen.getByRole("button")).toHaveClass("bg-fill-transparent-white")
    expect(screen.getByRole("button").querySelector("span")).toHaveClass(
      "group-active:bg-interaction-pressed",
    )
    expect(screen.getByRole("button").querySelector("svg")).toHaveAttribute(
      "viewBox",
      "0 0 52 52",
    )
  })

  it("mobile 사이즈와 dark 컬러 클래스가 적용된다", () => {
    render(<PageNavButton size="mobile" color="dark" />)
    expect(screen.getByRole("button")).toHaveClass("size-9")
    expect(screen.getByRole("button")).toHaveClass("bg-fill-transparent-black")
    expect(screen.getByRole("button").querySelector("svg")).toHaveAttribute(
      "viewBox",
      "0 0 52 52",
    )
    expect(screen.getByRole("button").querySelector("path")).toHaveAttribute(
      "stroke-width",
      "2.8",
    )
  })

  it("prev direction일 때 회전 클래스가 적용된다", () => {
    render(<PageNavButton direction="prev" />)
    expect(screen.getByRole("button")).toHaveClass("rotate-180")
  })

  it("클릭 핸들러가 호출된다", () => {
    const onClick = vi.fn()
    render(<PageNavButton onClick={onClick} />)
    fireEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
