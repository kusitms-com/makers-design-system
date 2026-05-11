import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  KeyboardEvent,
} from "react"

import { cn } from "../../utils/cn"
import { Button } from "../Button/Button"

export type EmailInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "size" | "type"
> & {
  value: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
  validate?: (value: string) => boolean
  buttonLabel?: string
  buttonProps?: Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "disabled" | "type"
  >
  className?: string
}

export function EmailInput({
  value,
  onChange,
  onSubmit,
  validate,
  buttonLabel = "알림 받기",
  buttonProps,
  disabled,
  className,
  placeholder = "이메일을 입력하세요",
  ...inputProps
}: EmailInputProps) {
  const canSubmit = !disabled && (validate ? validate(value) : value.length > 0)

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
        "w-full gap-1 py-2 pl-5 pr-2.5 min-w-72",
        "lg:w-163 lg:gap-2 lg:py-3 lg:pl-7 lg:pr-5",
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
          "text-body-16m lg:text-headline-20m",
        )}
        {...inputProps}
      />
      <Button
        showIcon={false}
        disabled={!canSubmit}
        onClick={handleSubmit}
        className="shrink-0"
        {...buttonProps}
      >
        {buttonLabel}
      </Button>
    </div>
  )
}
