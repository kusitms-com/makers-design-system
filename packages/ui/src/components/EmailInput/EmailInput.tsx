import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  KeyboardEvent,
} from "react"

import { Button } from "../Button/Button"

type EmailInputSize = "desktop" | "mobile"

export type EmailInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "size" | "type"
> & {
  value: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
  isSubmitEnabled?: boolean
  size?: EmailInputSize
  buttonLabel?: string
  buttonProps?: Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "disabled" | "type"
  >
  className?: string
}

function cn(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ")
}

export function EmailInput({
  value,
  onChange,
  onSubmit,
  isSubmitEnabled,
  size = "desktop",
  buttonLabel = "알림 받기",
  buttonProps,
  disabled,
  className,
  placeholder = "텍스트를 입력하세요",
  ...inputProps
}: EmailInputProps) {
  const canSubmit = !disabled && (isSubmitEnabled ?? value.length > 0)

  const handleSubmit = () => {
    if (!canSubmit) return
    onSubmit?.(value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div
      className={cn(
        "flex items-center rounded-full bg-fill-netural",
        size === "desktop"
          ? "w-[652px] gap-2 py-3 pl-7 pr-5"
          : "w-[288px] gap-1 py-2 pl-5 pr-2.5",
        className,
      )}
    >
      <input
        type="email"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "min-w-0 flex-1 bg-transparent outline-none",
          "text-label-strong placeholder:text-label-alternative",
          "disabled:cursor-not-allowed",
          size === "desktop"
            ? "text-xl font-medium leading-8 tracking-[-0.16px]"
            : "text-base font-medium leading-6 tracking-[-0.04px]",
        )}
        {...inputProps}
      />
      <Button
        showIcon={false}
        disabled={!canSubmit}
        onClick={handleSubmit}
        className={cn(
          "shrink-0",
          size === "desktop" ? "px-6 gap-2" : "px-3 gap-1",
          // EmailInput 컨텍스트의 폰트 스펙 override
          size === "desktop"
            ? "text-lg leading-[26px] tracking-[-0.09px]"
            : "text-sm leading-5 tracking-[0.175px]",
          canSubmit
            ? size === "desktop"
              ? "font-semibold"
              : "font-medium"
            : size === "desktop"
              ? "font-medium"
              : "font-normal",
        )}
        {...buttonProps}
      >
        {buttonLabel}
      </Button>
    </div>
  )
}
