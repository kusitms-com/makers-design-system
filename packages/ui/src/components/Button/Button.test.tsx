import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { Button } from "./Button"
import { NavigationButton } from "./NavigationButton"
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

  it("justify-center가 적용된다", () => {
    render(<Button>텍스트</Button>)
    expect(screen.getByRole("button")).toHaveClass("justify-center")
  })

  it("모바일 기본 패딩 클래스가 적용된다", () => {
    render(<Button>텍스트</Button>)
    expect(screen.getByRole("button").className).toContain("px-3")
  })

  it("desktop 패딩 breakpoint 클래스가 적용된다", () => {
    render(<Button>텍스트</Button>)
    expect(screen.getByRole("button").className).toContain("lg:px-6")
  })

  it("기본 상태에서 모바일 타이포그라피 클래스가 적용된다", () => {
    render(<Button>텍스트</Button>)
    expect(screen.getByRole("button").className).toContain("text-label-14m")
  })

  it("기본 상태에서 desktop 타이포그라피 breakpoint 클래스가 적용된다", () => {
    render(<Button>텍스트</Button>)
    expect(screen.getByRole("button").className).toContain("lg:text-body-18sb")
  })

  it("disabled 상태에서 모바일 타이포그라피 클래스가 적용된다", () => {
    render(<Button disabled>텍스트</Button>)
    expect(screen.getByRole("button").className).toContain("text-label-14r")
  })

  it("disabled 상태에서 desktop 타이포그라피 breakpoint 클래스가 적용된다", () => {
    render(<Button disabled>텍스트</Button>)
    expect(screen.getByRole("button").className).toContain("lg:text-body-18m")
  })

  it("아이콘이 렌더링된다", () => {
    render(<Button>텍스트</Button>)
    const svgs = screen.getByRole("button").querySelectorAll("svg")
    expect(svgs.length).toBe(2)
  })

  it("showIcon=false일 때 아이콘이 렌더링되지 않는다", () => {
    render(<Button showIcon={false}>텍스트</Button>)
    expect(
      screen.getByRole("button").querySelector("svg"),
    ).not.toBeInTheDocument()
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

  it("모바일 기본 사이즈 클래스가 적용된다", () => {
    render(<ScrollTopButton />)
    expect(screen.getByRole("button").className).toContain("size-10")
  })

  it("desktop 사이즈 breakpoint 클래스가 적용된다", () => {
    render(<ScrollTopButton />)
    expect(screen.getByRole("button").className).toContain("lg:size-12")
  })

  it("아이콘에 -rotate-90이 적용된다", () => {
    render(<ScrollTopButton />)
    expect(screen.getByRole("button").querySelector("svg")).toHaveClass(
      "-rotate-90",
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

  it("모바일 기본 사이즈 클래스가 적용된다", () => {
    render(<PageNavButton />)
    expect(screen.getByRole("button").className).toContain("size-9")
  })

  it("desktop 사이즈 breakpoint 클래스가 적용된다", () => {
    render(<PageNavButton />)
    expect(screen.getByRole("button").className).toContain("lg:size-13")
  })

  it("light 컬러 클래스가 적용된다", () => {
    render(<PageNavButton color="light" />)
    expect(screen.getByRole("button")).toHaveClass("bg-fill-transparent-white")
  })

  it("dark 컬러 클래스가 적용된다", () => {
    render(<PageNavButton color="dark" />)
    expect(screen.getByRole("button")).toHaveClass("bg-fill-transparent-black")
    expect(screen.getByRole("button")).toHaveClass("text-static-white")
  })

  it("light 컬러 클래스가 적용된다", () => {
    render(<PageNavButton color="light" />)
    expect(screen.getByRole("button")).toHaveClass("bg-fill-transparent-white")
    expect(screen.getByRole("button")).toHaveClass("text-static-white")
  })

  it("아이콘이 렌더링된다", () => {
    render(<PageNavButton />)
    const svg = screen.getByRole("button").querySelector("svg")
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute("viewBox", "0 0 20 20")
    expect(svg?.getAttribute("class")).toContain("size-7")
    expect(svg?.getAttribute("class")).toContain("lg:size-10")
  })

  it("pressed 오버레이 클래스가 적용된다", () => {
    render(<PageNavButton />)
    expect(screen.getByRole("button").querySelector("span")).toHaveClass(
      "group-active:bg-interaction-pressed",
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

describe("NavigationButton", () => {
  const icon = <div data-testid="nav-icon">icon</div>

  it("type=button이 기본값이다", () => {
    render(<NavigationButton>Behance</NavigationButton>)
    expect(screen.getByRole("button")).toHaveAttribute("type", "button")
  })

  it("텍스트를 렌더링한다", () => {
    render(<NavigationButton>Behance</NavigationButton>)
    expect(screen.getByRole("button", { name: /Behance/ })).toBeInTheDocument()
  })

  it("icon이 있으면 아이콘이 렌더링된다", () => {
    render(<NavigationButton icon={icon}>Behance</NavigationButton>)
    expect(screen.getByTestId("nav-icon")).toBeInTheDocument()
  })

  it("icon이 없으면 아이콘이 렌더링되지 않는다", () => {
    render(<NavigationButton>Behance</NavigationButton>)
    expect(screen.queryByTestId("nav-icon")).not.toBeInTheDocument()
  })

  it("showArrow=false이면 오른쪽 화살표가 렌더링되지 않는다", () => {
    render(<NavigationButton showArrow={false}>Behance</NavigationButton>)
    expect(
      screen.getByRole("button").querySelector("svg"),
    ).not.toBeInTheDocument()
  })

  it("hover 스타일 클래스가 적용된다", () => {
    render(<NavigationButton>Behance</NavigationButton>)
    expect(
      screen.getByRole("button").querySelector(".pointer-events-none"),
    ).toHaveClass("group-hover:bg-interaction-hover-inverse")
  })

  it("클릭 핸들러가 호출된다", () => {
    const onClick = vi.fn()
    render(<NavigationButton onClick={onClick}>Behance</NavigationButton>)
    fireEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
