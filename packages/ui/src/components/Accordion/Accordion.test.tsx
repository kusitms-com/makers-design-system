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

function getButtons() {
  return screen.getAllByRole("button") as HTMLElement[]
}

describe("Accordion", () => {
  it("질문 텍스트를 렌더링한다", () => {
    renderBasic()
    expect(screen.getByText("첫 번째 질문")).toBeInTheDocument()
    expect(screen.getByText("두 번째 질문")).toBeInTheDocument()
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

  it("trigger는 group 클래스를 갖는다", () => {
    renderBasic()
    expect(getButtons()[0]!).toHaveClass("group")
  })

  it("chevron SVG가 렌더링된다", () => {
    renderBasic()
    expect(getButtons()[0]!.querySelector("svg")).toBeInTheDocument()
  })

  describe("반응형 클래스", () => {
    it("Root에 모바일 gap 클래스가 적용된다", () => {
      const { container } = renderBasic()
      expect(container.firstChild).toHaveClass("gap-2")
    })

    it("Root에 desktop gap breakpoint 클래스가 적용된다", () => {
      const { container } = renderBasic()
      expect((container.firstChild as HTMLElement)?.className).toContain(
        "lg:gap-3",
      )
    })

    it("Item에 모바일 padding/radius 클래스가 적용된다", () => {
      const { container } = renderBasic()
      const firstItem = container.querySelector("[data-state]")
      expect(firstItem?.className).toContain("rounded-2xl")
      expect(firstItem?.className).toContain("px-5")
      expect(firstItem?.className).toContain("py-4")
    })

    it("Item에 desktop padding/radius breakpoint 클래스가 적용된다", () => {
      const { container } = renderBasic()
      const firstItem = container.querySelector("[data-state]")
      expect(firstItem?.className).toContain("lg:rounded-[20px]")
      expect(firstItem?.className).toContain("lg:px-10")
      expect(firstItem?.className).toContain("lg:py-8")
    })

    it("chevron에 모바일 크기 클래스가 적용된다", () => {
      renderBasic()
      expect(
        getButtons()[0]!.querySelector("svg")?.getAttribute("class"),
      ).toContain("size-5")
    })

    it("chevron에 desktop 크기 breakpoint 클래스가 적용된다", () => {
      renderBasic()
      expect(
        getButtons()[0]!.querySelector("svg")?.getAttribute("class"),
      ).toContain("lg:size-6")
    })

    it("question에 모바일 타이포그라피 클래스가 적용된다", () => {
      renderBasic()
      expect(screen.getByText("첫 번째 질문").className).toContain(
        "text-body-16m",
      )
    })

    it("question에 desktop 타이포그라피 breakpoint 클래스가 적용된다", () => {
      renderBasic()
      expect(screen.getByText("첫 번째 질문").className).toContain(
        "lg:text-headline-24sb",
      )
    })
  })

  describe("답변 콘텐츠 노출", () => {
    it("닫힌 아이템의 답변은 hidden 처리된다", () => {
      renderBasic()
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
      expect(
        container.querySelector(".whitespace-pre-line"),
      ).toBeInTheDocument()
    })

    it("answer에 모바일/desktop 타이포그라피 클래스가 적용된다", () => {
      const { container } = render(
        <Accordion type="single" collapsible defaultValue="q1">
          <Accordion.Item value="q1" question="질문" answer="답변" />
        </Accordion>,
      )
      const answerWrapper = container.querySelector(".whitespace-pre-line")
      expect(answerWrapper?.className).toContain("text-body-16r")
      expect(answerWrapper?.className).toContain("lg:text-headline-20r")
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
      expect(getButtons()[0]!).toHaveAttribute("aria-expanded", "true")
    })

    it("trigger에 focus-visible 링 클래스가 존재한다", () => {
      renderBasic()
      expect(getButtons()[0]!.className).toContain("focus-visible:ring-2")
    })

    it("chevron SVG에 aria-hidden이 설정된다", () => {
      renderBasic()
      expect(getButtons()[0]!.querySelector("svg")).toHaveAttribute(
        "aria-hidden",
        "true",
      )
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
      expect(container.querySelector("[data-state]")?.className).toContain(
        "custom-item",
      )
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
