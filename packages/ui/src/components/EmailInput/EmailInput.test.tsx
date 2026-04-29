import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { useState } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { EmailInput } from "./EmailInput"

afterEach(() => {
  cleanup()
})

function ControlledEmailInput(
  props: Partial<React.ComponentProps<typeof EmailInput>>,
) {
  const [value, setValue] = useState("")
  return <EmailInput value={value} onChange={setValue} {...props} />
}

describe("EmailInput", () => {
  it("placeholder 기본값이 '텍스트를 입력하세요'이다", () => {
    render(<EmailInput value="" onChange={() => {}} />)
    expect(
      screen.getByPlaceholderText("텍스트를 입력하세요"),
    ).toBeInTheDocument()
  })

  it("type=email인 input이 렌더링된다", () => {
    render(<EmailInput value="" onChange={() => {}} />)
    const input = screen.getByPlaceholderText("텍스트를 입력하세요")
    expect(input).toHaveAttribute("type", "email")
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
    fireEvent.change(screen.getByPlaceholderText("텍스트를 입력하세요"), {
      target: { value: "a@b.com" },
    })
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

    it("isSubmitEnabled=true이면 value가 비어있어도 버튼이 활성화된다", () => {
      render(<EmailInput value="" onChange={() => {}} isSubmitEnabled />)
      expect(screen.getByRole("button")).not.toBeDisabled()
    })

    it("isSubmitEnabled=false이면 value가 있어도 버튼이 비활성화된다", () => {
      render(
        <EmailInput
          value="a@b.com"
          onChange={() => {}}
          isSubmitEnabled={false}
        />,
      )
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
      fireEvent.keyDown(screen.getByPlaceholderText("텍스트를 입력하세요"), {
        key: "Enter",
      })
      expect(onSubmit).toHaveBeenCalledWith("a@b.com")
    })

    it("value가 비어있을 때 Enter를 눌러도 호출되지 않는다", () => {
      const onSubmit = vi.fn()
      render(<EmailInput value="" onChange={() => {}} onSubmit={onSubmit} />)
      fireEvent.keyDown(screen.getByPlaceholderText("텍스트를 입력하세요"), {
        key: "Enter",
      })
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

    it("isSubmitEnabled=false일 때 버튼 클릭이 동작하지 않는다", () => {
      const onSubmit = vi.fn()
      render(
        <EmailInput
          value="a@b.com"
          onChange={() => {}}
          onSubmit={onSubmit}
          isSubmitEnabled={false}
        />,
      )
      fireEvent.click(screen.getByRole("button"))
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it("isSubmitEnabled=true일 때 비어있는 값도 Enter로 제출할 수 있다", () => {
      const onSubmit = vi.fn()
      render(
        <EmailInput
          value=""
          onChange={() => {}}
          onSubmit={onSubmit}
          isSubmitEnabled
        />,
      )
      fireEvent.keyDown(screen.getByPlaceholderText("텍스트를 입력하세요"), {
        key: "Enter",
      })
      expect(onSubmit).toHaveBeenCalledWith("")
    })
  })

  describe("size 분기", () => {
    it("desktop 사이즈일 때 컨테이너 너비가 652px 고정이다", () => {
      const { container } = render(
        <EmailInput value="" onChange={() => {}} size="desktop" />,
      )
      expect(container.firstChild).toHaveClass("w-[652px]")
    })

    it("mobile 사이즈일 때 컨테이너 너비가 288px 고정이다", () => {
      const { container } = render(
        <EmailInput value="" onChange={() => {}} size="mobile" />,
      )
      expect(container.firstChild).toHaveClass("w-[288px]")
    })

    it("desktop 사이즈일 때 input에 text-xl이 적용된다", () => {
      render(<EmailInput value="" onChange={() => {}} size="desktop" />)
      expect(
        screen.getByPlaceholderText("텍스트를 입력하세요").className,
      ).toContain("text-xl")
    })

    it("mobile 사이즈일 때 input에 text-base가 적용된다", () => {
      render(<EmailInput value="" onChange={() => {}} size="mobile" />)
      expect(
        screen.getByPlaceholderText("텍스트를 입력하세요").className,
      ).toContain("text-base")
    })

    // EmailInput 컨텍스트에서 Button에 className으로 폰트 override를 한다.
    // 기본 Button의 text-base/text-sm 위에 text-lg / leading 등이 추가됨.
    it("desktop 사이즈일 때 버튼에 text-lg override가 적용된다", () => {
      render(<EmailInput value="" onChange={() => {}} size="desktop" />)
      expect(screen.getByRole("button").className).toContain("text-lg")
    })

    it("mobile 사이즈일 때 버튼에 text-sm이 적용된다", () => {
      render(<EmailInput value="" onChange={() => {}} size="mobile" />)
      expect(screen.getByRole("button").className).toContain("text-sm")
    })

    it("activated 상태(desktop)에서 font-semibold가 적용된다", () => {
      render(<EmailInput value="a@b.com" onChange={() => {}} size="desktop" />)
      expect(screen.getByRole("button").className).toContain("font-semibold")
    })

    it("disabled 상태(desktop)에서 font-medium이 적용된다", () => {
      render(<EmailInput value="" onChange={() => {}} size="desktop" />)
      expect(screen.getByRole("button").className).toContain("font-medium")
    })

    it("버튼은 shrink-0으로 너비 유지된다", () => {
      render(<EmailInput value="" onChange={() => {}} />)
      expect(screen.getByRole("button").className).toContain("shrink-0")
    })
  })

  describe("controlled 동작", () => {
    it("외부 state로 값이 동기화된다", () => {
      render(<ControlledEmailInput />)
      const input = screen.getByPlaceholderText("텍스트를 입력하세요")
      fireEvent.change(input, { target: { value: "hello@x.com" } })
      expect(input).toHaveValue("hello@x.com")
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
      const input = screen.getByPlaceholderText("텍스트를 입력하세요")
      expect(input).toHaveAttribute("name", "email")
      expect(input).toHaveAttribute("autocomplete", "email")
    })
  })
})
