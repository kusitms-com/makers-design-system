import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"

import { Accordion } from "./Accordion"

afterEach(() => {
  cleanup()
})

function renderBasic(
  props?: Partial<React.ComponentProps<typeof Accordion>>,
  items: Array<{ value: string; question: string; answer: string }> = [
    { value: "q1", question: "첫 번째 질문", answer: "첫 번째 답변" },
    { value: "q2", question: "두 번째 질문", answer: "두 번째 답변" },
  ],
) {
  return render(
    <Accordion type="single" collapsible {...props}>
      {items.map((item) => (
        <Accordion.Item
          key={item.value}
          value={item.value}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </Accordion>,
  )
}

// noUncheckedIndexedAccess가 활성화되어 있어 배열 구조분해 시 T | undefined로 추론된다.
// 테스트에서 버튼이 반드시 존재함을 보장할 수 있으므로 튜플 캐스팅으로 해소한다.
function getButtons() {
  return screen.getAllByRole("button") as HTMLElement[]
}

describe("Accordion", () => {
  it("질문 텍스트를 렌더링한다", () => {
    renderBasic()
    expect(screen.getByText("첫 번째 질문")).toBeInTheDocument()
    expect(screen.getByText("두 번째 질문")).toBeInTheDocument()
  })

  it("기본 상태에서는 답변이 보이지 않는다 (collapsed)", () => {
    renderBasic()
    // Radix는 닫힌 상태에서 Content를 hidden으로 처리한다.
    getButtons().forEach((trigger) => {
      expect(trigger).toHaveAttribute("aria-expanded", "false")
    })
  })

  it("Q. 라벨이 각 아이템마다 렌더링된다", () => {
    renderBasic()
    expect(screen.getAllByText("Q.")).toHaveLength(2)
  })

  it("trigger 클릭 시 해당 아이템이 열린다", () => {
    renderBasic()
    const firstTrigger = getButtons()[0]!
    fireEvent.click(firstTrigger)
    expect(firstTrigger).toHaveAttribute("aria-expanded", "true")
  })

  it("type=single일 때 다른 아이템을 열면 기존 아이템이 닫힌다", () => {
    renderBasic()
    const [first, second] = getButtons() as [HTMLElement, HTMLElement]
    fireEvent.click(first)
    expect(first).toHaveAttribute("aria-expanded", "true")

    fireEvent.click(second)
    expect(first).toHaveAttribute("aria-expanded", "false")
    expect(second).toHaveAttribute("aria-expanded", "true")
  })

  it("collapsible일 때 열려있는 아이템을 다시 클릭하면 닫힌다", () => {
    renderBasic()
    const first = getButtons()[0]!
    fireEvent.click(first)
    expect(first).toHaveAttribute("aria-expanded", "true")
    fireEvent.click(first)
    expect(first).toHaveAttribute("aria-expanded", "false")
  })

  it("trigger는 group 클래스를 갖는다 (chevron 회전 hook)", () => {
    renderBasic()
    const trigger = getButtons()[0]!
    expect(trigger).toHaveClass("group")
  })

  it("chevron SVG가 렌더링된다", () => {
    renderBasic()
    const trigger = getButtons()[0]!
    expect(trigger.querySelector("svg")).toBeInTheDocument()
  })

  describe("size 분기", () => {
    it("기본 사이즈는 desktop이다", () => {
      const { container } = renderBasic()
      // Root 자체에 desktop용 gap-3가 적용된다
      expect(container.firstChild).toHaveClass("gap-3")
    })

    it("desktop 사이즈일 때 Item에 px-10 py-8 rounded-[20px]가 적용된다", () => {
      const { container } = renderBasic({ size: "desktop" })
      const items = container.querySelectorAll("div")
      expect(items[0]!.className).toContain("gap-3")
      // 첫 번째 Item div를 찾는다
      const firstItem = container.querySelector("[data-state]")
      expect(firstItem?.className).toContain("rounded-[20px]")
      expect(firstItem?.className).toContain("px-10")
      expect(firstItem?.className).toContain("py-8")
    })

    it("mobile 사이즈일 때 Item에 px-5 py-4 rounded-2xl이 적용된다", () => {
      const { container } = renderBasic({ size: "mobile" })
      expect(container.firstChild).toHaveClass("gap-2")
      const firstItem = container.querySelector("[data-state]")
      expect(firstItem?.className).toContain("rounded-2xl")
      expect(firstItem?.className).toContain("px-5")
      expect(firstItem?.className).toContain("py-4")
    })

    it("desktop 사이즈일 때 chevron이 size-6이다", () => {
      renderBasic({ size: "desktop" })
      const svg = getButtons()[0]!.querySelector("svg")
      expect(svg?.getAttribute("class")).toContain("size-6")
    })

    it("mobile 사이즈일 때 chevron이 size-5이다", () => {
      renderBasic({ size: "mobile" })
      const svg = getButtons()[0]!.querySelector("svg")
      expect(svg?.getAttribute("class")).toContain("size-5")
    })

    it("desktop 사이즈일 때 question에 text-2xl이 적용된다", () => {
      renderBasic({ size: "desktop" })
      expect(screen.getByText("첫 번째 질문").className).toContain("text-2xl")
    })

    it("mobile 사이즈일 때 question에 text-base가 적용된다", () => {
      renderBasic({ size: "mobile" })
      expect(screen.getByText("첫 번째 질문").className).toContain("text-base")
    })
  })

  describe("답변 콘텐츠 노출", () => {
    it("아이템을 열면 답변 텍스트가 DOM에 존재한다", () => {
      renderBasic()
      const first = getButtons()[0]!
      fireEvent.click(first)
      expect(screen.getByText("첫 번째 답변")).toBeInTheDocument()
    })

    it("닫힌 아이템의 답변은 hidden 처리된다", () => {
      renderBasic()
      // Radix Content는 닫힌 상태에서 hidden 속성을 갖는다
      const contents = document.querySelectorAll(
        "[data-radix-accordion-content]",
      )
      contents.forEach((content) => {
        expect(content).toHaveAttribute("hidden")
      })
    })

    it("answer에 whitespace-pre-line이 적용되어 줄바꿈을 처리한다", () => {
      const { container } = render(
        <Accordion type="single" collapsible defaultValue="q1">
          <Accordion.Item
            value="q1"
            question="질문"
            answer={"첫 줄\n두 번째 줄"}
          />
        </Accordion>,
      )
      const answerWrapper = container.querySelector(".whitespace-pre-line")
      expect(answerWrapper).toBeInTheDocument()
    })

    it("desktop일 때 answer에 text-xl leading-8이 적용된다", () => {
      const { container } = render(
        <Accordion type="single" collapsible size="desktop" defaultValue="q1">
          <Accordion.Item value="q1" question="질문" answer="답변" />
        </Accordion>,
      )
      const answerWrapper = container.querySelector(".whitespace-pre-line")
      expect(answerWrapper?.className).toContain("text-xl")
      expect(answerWrapper?.className).toContain("leading-8")
    })

    it("mobile일 때 answer에 text-base leading-6이 적용된다", () => {
      const { container } = render(
        <Accordion type="single" collapsible size="mobile" defaultValue="q1">
          <Accordion.Item value="q1" question="질문" answer="답변" />
        </Accordion>,
      )
      const answerWrapper = container.querySelector(".whitespace-pre-line")
      expect(answerWrapper?.className).toContain("text-base")
      expect(answerWrapper?.className).toContain("leading-6")
    })
  })

  describe("type=multiple 동작", () => {
    it("여러 아이템을 동시에 열 수 있다", () => {
      render(
        <Accordion type="multiple">
          <Accordion.Item
            value="q1"
            question="첫 번째 질문"
            answer="첫 번째 답변"
          />
          <Accordion.Item
            value="q2"
            question="두 번째 질문"
            answer="두 번째 답변"
          />
        </Accordion>,
      )
      const [first, second] = getButtons() as [HTMLElement, HTMLElement]
      fireEvent.click(first)
      fireEvent.click(second)
      expect(first).toHaveAttribute("aria-expanded", "true")
      expect(second).toHaveAttribute("aria-expanded", "true")
    })

    it("defaultValue 배열로 여러 아이템을 초기에 열 수 있다", () => {
      render(
        <Accordion type="multiple" defaultValue={["q1", "q2"]}>
          <Accordion.Item
            value="q1"
            question="첫 번째 질문"
            answer="첫 번째 답변"
          />
          <Accordion.Item
            value="q2"
            question="두 번째 질문"
            answer="두 번째 답변"
          />
        </Accordion>,
      )
      const [first, second] = getButtons() as [HTMLElement, HTMLElement]
      expect(first).toHaveAttribute("aria-expanded", "true")
      expect(second).toHaveAttribute("aria-expanded", "true")
    })
  })

  describe("접근성", () => {
    it("trigger 버튼은 role=button을 갖는다", () => {
      renderBasic()
      expect(screen.getAllByRole("button")).toHaveLength(2)
    })

    it("닫힌 trigger의 aria-expanded는 false이다", () => {
      renderBasic()
      getButtons().forEach((btn) => {
        expect(btn).toHaveAttribute("aria-expanded", "false")
      })
    })

    it("열린 trigger의 aria-expanded는 true이다", () => {
      renderBasic({ defaultValue: "q1" })
      const first = getButtons()[0]!
      expect(first).toHaveAttribute("aria-expanded", "true")
    })

    it("trigger에 focus-visible 링 클래스가 존재한다", () => {
      renderBasic()
      const trigger = getButtons()[0]!
      expect(trigger.className).toContain("focus-visible:ring-2")
    })

    it("chevron SVG에 aria-hidden이 설정된다", () => {
      renderBasic()
      const trigger = getButtons()[0]!
      const svg = trigger.querySelector("svg")
      expect(svg).toHaveAttribute("aria-hidden", "true")
    })
  })

  describe("controlled 동작", () => {
    it("defaultValue로 초기 열린 아이템을 지정할 수 있다", () => {
      renderBasic({ defaultValue: "q1" })
      const [first, second] = getButtons() as [HTMLElement, HTMLElement]
      expect(first).toHaveAttribute("aria-expanded", "true")
      expect(second).toHaveAttribute("aria-expanded", "false")
    })
  })

  describe("커스텀 props", () => {
    it("Root에 className이 추가로 적용된다", () => {
      const { container } = renderBasic({ className: "custom-root" })
      expect(container.firstChild).toHaveClass("custom-root")
    })

    it("Item에 className이 추가로 적용된다", () => {
      const { container } = render(
        <Accordion type="single" collapsible>
          <Accordion.Item
            value="q1"
            question="질문"
            answer="답변"
            className="custom-item"
          />
        </Accordion>,
      )
      const item = container.querySelector("[data-state]")
      expect(item?.className).toContain("custom-item")
    })

    it("ReactNode를 question으로 받을 수 있다", () => {
      render(
        <Accordion type="single" collapsible>
          <Accordion.Item
            value="q1"
            question={<strong data-testid="bold-q">강조 질문</strong>}
            answer="답변"
          />
        </Accordion>,
      )
      expect(screen.getByTestId("bold-q")).toBeInTheDocument()
    })

    it("ReactNode를 answer로 받을 수 있다", () => {
      render(
        <Accordion type="single" collapsible defaultValue="q1">
          <Accordion.Item
            value="q1"
            question="질문"
            answer={<div data-testid="custom-answer">커스텀 답변</div>}
          />
        </Accordion>,
      )
      expect(screen.getByTestId("custom-answer")).toBeInTheDocument()
    })
  })
})
