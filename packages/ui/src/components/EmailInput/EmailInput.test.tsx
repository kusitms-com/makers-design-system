import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { useState } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { EmailInput } from "./EmailInput"

afterEach(() => {
  cleanup()
})

const PLACEHOLDER = "이메일을 입력하세요"

function getInput() {
  return screen.getByPlaceholderText(PLACEHOLDER)
}

function ControlledEmailInput(
  props: Partial<React.ComponentProps<typeof EmailInput>>,
) {
  const [value, setValue] = useState("")
  return <EmailInput value={value} onChange={setValue} {...props} />
}

describe("EmailInput", () => {
  it("placeholder 기본값이 '이메일을 입력하세요'이다", () => {
    render(<EmailInput value="" onChange={() => {}} />)
    expect(getInput()).toBeInTheDocument()
  })

  it("type=email인 input이 렌더링된다", () => {
    render(<EmailInput value="" onChange={() => {}} />)
    expect(getInput()).toHaveAttribute("type", "email")
  })

  it("buttonLabel 기본값이 '알림 받기'이다", () => {
    render(<EmailInput value="" onChange={() => {}} />)
    expect(
      screen.getByRole("button", { name: /알림 받기/ }),
    ).toBeInTheDocument()
  })

  it("값을 입력하면 onChange가 호출된다", () => {
    const onChange = vi.fn()
    render(<EmailInput value="" onChange={onChange} />)
    fireEvent.change(getInput(), { target: { value: "a@b.com" } })
    expect(onChange).toHaveBeenCalledWith("a@b.com")
  })

  describe("버튼 활성화 상태", () => {
    it("value가 비어있으면 버튼이 비활성화된다", () => {
      render(<EmailInput value="" onChange={() => {}} />)
      expect(screen.getByRole("button")).toBeDisabled()
    })

    it("value가 있으면 버튼이 활성화된다", () => {
      render(<EmailInput value="a@b.com" onChange={() => {}} />)
      expect(screen.getByRole("button")).not.toBeDisabled()
    })

    it("disabled=true이면 value와 무관하게 버튼이 비활성화된다", () => {
      render(<EmailInput value="a@b.com" onChange={() => {}} disabled />)
      expect(screen.getByRole("button")).toBeDisabled()
    })

    it("활성 상태에서 brand-primary 배경 클래스가 적용된다", () => {
      render(<EmailInput value="a@b.com" onChange={() => {}} />)
      expect(screen.getByRole("button").className).toContain("bg-brand-primary")
    })

    it("비활성 상태에서 fill-alternative 배경 클래스가 적용된다", () => {
      render(<EmailInput value="" onChange={() => {}} />)
      expect(screen.getByRole("button").className).toContain(
        "bg-fill-alternative",
      )
    })
  })

  describe("validate prop", () => {
    it("validate가 false를 반환하면 value가 있어도 버튼이 비활성화된다", () => {
      render(
        <EmailInput
          value="invalid"
          onChange={() => {}}
          validate={(v) => v.includes("@")}
        />,
      )
      expect(screen.getByRole("button")).toBeDisabled()
    })

    it("validate가 true를 반환하면 버튼이 활성화된다", () => {
      render(
        <EmailInput
          value="a@b.com"
          onChange={() => {}}
          validate={(v) => v.includes("@")}
        />,
      )
      expect(screen.getByRole("button")).not.toBeDisabled()
    })
  })

  describe("onSubmit 호출", () => {
    it("버튼 클릭 시 호출된다", () => {
      const onSubmit = vi.fn()
      render(
        <EmailInput value="a@b.com" onChange={() => {}} onSubmit={onSubmit} />,
      )
      fireEvent.click(screen.getByRole("button"))
      expect(onSubmit).toHaveBeenCalledWith("a@b.com")
    })

    it("Enter 입력 시 호출된다", () => {
      const onSubmit = vi.fn()
      render(
        <EmailInput value="a@b.com" onChange={() => {}} onSubmit={onSubmit} />,
      )
      fireEvent.keyDown(getInput(), { key: "Enter" })
      expect(onSubmit).toHaveBeenCalledWith("a@b.com")
    })

    it("value가 비어있을 때 Enter를 눌러도 호출되지 않는다", () => {
      const onSubmit = vi.fn()
      render(<EmailInput value="" onChange={() => {}} onSubmit={onSubmit} />)
      fireEvent.keyDown(getInput(), { key: "Enter" })
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it("disabled=true일 때 버튼 클릭이 동작하지 않는다", () => {
      const onSubmit = vi.fn()
      render(
        <EmailInput
          value="a@b.com"
          onChange={() => {}}
          onSubmit={onSubmit}
          disabled
        />,
      )
      fireEvent.click(screen.getByRole("button"))
      expect(onSubmit).not.toHaveBeenCalled()
    })
  })

  describe("반응형 클래스", () => {
    it("모바일/desktop 컨테이너 너비 클래스가 적용된다", () => {
      const { container } = render(<EmailInput value="" onChange={() => {}} />)
      expect(container.firstChild).toHaveClass("w-full")
      expect((container.firstChild as HTMLElement)?.className).toContain(
        "lg:w-163",
      )
    })

    it("input에 모바일/desktop 타이포그라피 클래스가 적용된다", () => {
      render(<EmailInput value="" onChange={() => {}} />)
      expect(getInput().className).toContain("text-body-16m")
      expect(getInput().className).toContain("lg:text-headline-20m")
    })

    it("활성 상태에서 버튼에 text-label-14m 클래스가 적용된다", () => {
      render(<EmailInput value="a@b.com" onChange={() => {}} />)
      expect(screen.getByRole("button").className).toContain("text-label-14m")
    })

    it("비활성 상태에서 버튼에 text-label-14r 클래스가 적용된다", () => {
      render(<EmailInput value="" onChange={() => {}} />)
      expect(screen.getByRole("button").className).toContain("text-label-14r")
    })

    it("버튼은 shrink-0으로 너비 유지된다", () => {
      render(<EmailInput value="" onChange={() => {}} />)
      expect(screen.getByRole("button").className).toContain("shrink-0")
    })
  })

  describe("controlled 동작", () => {
    it("외부 state로 값이 동기화된다", () => {
      render(<ControlledEmailInput />)
      fireEvent.change(getInput(), { target: { value: "hello@x.com" } })
      expect(getInput()).toHaveValue("hello@x.com")
    })
  })

  describe("커스텀 props", () => {
    it("buttonLabel을 변경할 수 있다", () => {
      render(<EmailInput value="" onChange={() => {}} buttonLabel="구독하기" />)
      expect(
        screen.getByRole("button", { name: /구독하기/ }),
      ).toBeInTheDocument()
    })

    it("placeholder를 변경할 수 있다", () => {
      render(
        <EmailInput value="" onChange={() => {}} placeholder="이메일 주소" />,
      )
      expect(screen.getByPlaceholderText("이메일 주소")).toBeInTheDocument()
    })

    it("className이 추가로 적용된다", () => {
      const { container } = render(
        <EmailInput value="" onChange={() => {}} className="custom-wrapper" />,
      )
      expect(container.firstChild).toHaveClass("custom-wrapper")
    })

    it("input HTML 속성을 전달한다", () => {
      render(
        <EmailInput
          value=""
          onChange={() => {}}
          name="email"
          autoComplete="email"
        />,
      )
      expect(getInput()).toHaveAttribute("name", "email")
      expect(getInput()).toHaveAttribute("autocomplete", "email")
    })
  })
})
