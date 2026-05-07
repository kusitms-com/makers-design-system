import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"

import { Dropdown } from "./Dropdown"

afterEach(() => {
  cleanup()
})

const OPTIONS = [
  { value: "option1", label: "옵션 1" },
  { value: "option2", label: "옵션 2" },
  { value: "option3", label: "옵션 3" },
]

function getTrigger() {
  return screen.getByRole("combobox") as HTMLButtonElement
}

describe("Dropdown", () => {
  describe("기본 렌더링", () => {
    it("placeholder가 렌더링된다", () => {
      render(<Dropdown options={OPTIONS} placeholder="선택해주세요" />)
      expect(screen.getByText("선택해주세요")).toBeInTheDocument()
    })

    it("placeholder 기본값은 '선택'이다", () => {
      render(<Dropdown options={OPTIONS} />)
      expect(screen.getByText("선택")).toBeInTheDocument()
    })

    it("trigger 버튼이 렌더링된다", () => {
      render(<Dropdown options={OPTIONS} />)
      expect(getTrigger()).toBeInTheDocument()
    })

    it("chevron SVG가 렌더링된다", () => {
      render(<Dropdown options={OPTIONS} />)
      expect(getTrigger().querySelector("svg")).toBeInTheDocument()
    })

    it("aria-label이 placeholder로 설정된다", () => {
      render(<Dropdown options={OPTIONS} placeholder="선택해주세요" />)
      expect(getTrigger()).toHaveAttribute("aria-label", "선택해주세요")
    })
  })

  describe("disabled 상태", () => {
    it("disabled=true이면 버튼이 비활성화된다", () => {
      render(<Dropdown options={OPTIONS} disabled />)
      expect(getTrigger()).toBeDisabled()
    })

    it("disabled 기본값은 false이다", () => {
      render(<Dropdown options={OPTIONS} />)
      expect(getTrigger()).not.toBeDisabled()
    })
  })

  describe("반응형 클래스", () => {
    it("모바일/desktop 패딩 클래스가 적용된다", () => {
      render(<Dropdown options={OPTIONS} />)
      const trigger = getTrigger()
      expect(trigger.className).toContain("py-1.5")
      expect(trigger.className).toContain("pl-3")
      expect(trigger.className).toContain("pr-2")
      expect(trigger.className).toContain("lg:py-2.5")
      expect(trigger.className).toContain("lg:pl-5")
      expect(trigger.className).toContain("lg:pr-4")
    })

    it("모바일/desktop 타이포그라피 클래스가 적용된다", () => {
      render(<Dropdown options={OPTIONS} />)
      expect(getTrigger().className).toContain("text-label-14sb")
      expect(getTrigger().className).toContain("lg:text-body-18sb")
    })

    it("모바일/desktop chevron 크기 클래스가 적용된다", () => {
      render(<Dropdown options={OPTIONS} />)
      const svgClass = getTrigger().querySelector("svg")?.getAttribute("class")
      expect(svgClass).toContain("size-4")
      expect(svgClass).toContain("lg:size-5")
    })
  })

  describe("기본 스타일", () => {
    it("trigger에 border와 rounded 클래스가 적용된다", () => {
      render(<Dropdown options={OPTIONS} />)
      const trigger = getTrigger()
      expect(trigger.className).toContain("border")
      expect(trigger.className).toContain("rounded-md")
    })

    it("trigger에 bg-fill-normal 클래스가 적용된다", () => {
      render(<Dropdown options={OPTIONS} />)
      expect(getTrigger().className).toContain("bg-fill-normal")
    })

    it("trigger에 group 클래스가 적용된다", () => {
      render(<Dropdown options={OPTIONS} />)
      expect(getTrigger()).toHaveClass("group")
    })

    it("chevron SVG에 aria-hidden이 설정된다", () => {
      render(<Dropdown options={OPTIONS} />)
      expect(getTrigger().querySelector("svg")).toHaveAttribute(
        "aria-hidden",
        "true",
      )
    })

    it("trigger에 커스텀 className이 적용된다", () => {
      render(<Dropdown options={OPTIONS} className="custom-trigger" />)
      expect(getTrigger()).toHaveClass("custom-trigger")
    })
  })

  describe("uncontrolled: defaultValue", () => {
    it("defaultValue로 초기 선택값을 지정할 수 있다", () => {
      render(<Dropdown options={OPTIONS} defaultValue="option1" />)
      expect(screen.getByText("옵션 1")).toBeInTheDocument()
    })
  })
})
