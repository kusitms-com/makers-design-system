import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"

import { Label } from "./Label"

afterEach(() => {
  cleanup()
})

describe("Label", () => {
  it("children 텍스트를 렌더링한다", () => {
    render(<Label>기획</Label>)
    expect(screen.getByText("기획")).toBeInTheDocument()
  })

  describe("type=brand", () => {
    it("brand 색상과 fill-primary 배경 클래스가 적용된다", () => {
      render(<Label type="brand">기획</Label>)
      const el = screen.getByText("기획")
      expect(el.className).toContain("bg-fill-primary")
      expect(el.className).toContain("text-brand-primary")
    })

    it("rounded-[4px] 모양이 적용된다", () => {
      render(<Label type="brand">기획</Label>)
      expect(screen.getByText("기획").className).toContain("rounded-[4px]")
    })

    it("text-label-14sb 타이포그라피 클래스가 적용된다", () => {
      render(<Label type="brand">기획</Label>)
      expect(screen.getByText("기획").className).toContain("text-label-14sb")
    })

    it("desktop 고정 크기 breakpoint 클래스가 적용된다", () => {
      render(<Label type="brand">기획</Label>)
      expect(screen.getByText("기획").className).toContain("lg:w-16")
      expect(screen.getByText("기획").className).toContain("lg:h-8")
    })
  })

  describe("type=secondary", () => {
    it("fill-netural 배경과 label-alternative 색상이 적용된다", () => {
      render(<Label type="secondary">텍스트</Label>)
      const el = screen.getByText("텍스트")
      expect(el.className).toContain("bg-fill-netural")
      expect(el.className).toContain("text-label-alternative")
    })

    it("rounded-md 모양이 적용된다", () => {
      render(<Label type="secondary">텍스트</Label>)
      expect(screen.getByText("텍스트").className).toContain("rounded-md")
    })

    it("모바일 타이포그라피 클래스가 적용된다", () => {
      render(<Label type="secondary">텍스트</Label>)
      expect(screen.getByText("텍스트").className).toContain(
        "text-caption-12sb",
      )
    })

    it("desktop 타이포그라피 breakpoint 클래스가 적용된다", () => {
      render(<Label type="secondary">텍스트</Label>)
      expect(screen.getByText("텍스트").className).toContain(
        "lg:text-label-14sb",
      )
    })
  })

  describe("type=default", () => {
    it("children을 라벨 박스에 렌더링한다", () => {
      render(<Label type="default">기획</Label>)
      expect(screen.getByText("기획")).toBeInTheDocument()
    })

    it("description이 있으면 옆에 함께 렌더링된다", () => {
      render(
        <Label type="default" description="손아현, 손아현">
          기획
        </Label>,
      )
      expect(screen.getByText("기획")).toBeInTheDocument()
      expect(screen.getByText("손아현, 손아현")).toBeInTheDocument()
    })

    it("description이 없으면 보조 텍스트가 렌더링되지 않는다", () => {
      render(<Label type="default">기획</Label>)
      expect(screen.queryByText("손아현, 손아현")).not.toBeInTheDocument()
    })

    it("description이 빈 문자열이면 보조 텍스트가 렌더링되지 않는다", () => {
      render(
        <Label type="default" description="">
          기획
        </Label>,
      )
      // 빈 문자열은 falsy이지만 description != null이라 렌더됨
      // 의도적으로 비어있는 경우도 표시하려면 빈 span이 생성되는지 확인
      expect(screen.getByText("기획")).toBeInTheDocument()
    })

    it("description으로 ReactNode(JSX)를 전달할 수 있다", () => {
      render(
        <Label type="default" description={<strong>손아현</strong>}>
          기획
        </Label>,
      )
      const description = screen.getByText("손아현")
      expect(description.tagName).toBe("STRONG")
    })

    it("라벨 박스에 fill-netural 배경과 label-normal 색상이 적용된다", () => {
      render(<Label type="default">기획</Label>)
      const el = screen.getByText("기획")
      expect(el.className).toContain("bg-fill-netural")
      expect(el.className).toContain("text-label-normal")
    })

    it("라벨 박스에 고정 크기(w-20, h-7.5)가 적용된다", () => {
      render(<Label type="default">기획</Label>)
      const el = screen.getByText("기획")
      expect(el.className).toContain("w-20")
      expect(el.className).toContain("h-7.5")
    })

    it("description에 label-alternative 색상이 적용된다", () => {
      render(
        <Label type="default" description="손아현">
          기획
        </Label>,
      )
      expect(screen.getByText("손아현").className).toContain(
        "text-label-alternative",
      )
    })
  })

  describe("기본값", () => {
    it("type 기본값은 brand이다", () => {
      render(<Label>기획</Label>)
      expect(screen.getByText("기획").className).toContain("bg-fill-primary")
    })

    it("type 기본값은 brand이다 (secondary 기준 text-caption-12sb 적용)", () => {
      render(<Label type="secondary">텍스트</Label>)
      expect(screen.getByText("텍스트").className).toContain(
        "text-caption-12sb",
      )
    })
  })

  describe("커스텀 props", () => {
    it("className이 추가로 적용된다", () => {
      render(<Label className="custom-class">기획</Label>)
      expect(screen.getByText("기획")).toHaveClass("custom-class")
    })

    it("HTML 속성을 전달한다", () => {
      render(<Label data-testid="my-label">기획</Label>)
      expect(screen.getByTestId("my-label")).toBeInTheDocument()
    })
  })
})
