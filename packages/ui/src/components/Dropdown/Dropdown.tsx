"use client"

import * as RadixSelect from "@radix-ui/react-select"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

type DropdownSize = "desktop" | "mobile"

function cn(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ")
}

function ChevronIcon({ size, open }: { size: DropdownSize; open?: boolean }) {
  const isDesktop = size === "desktop"
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={cn(
        "shrink-0 text-label-light transition-transform duration-200",
        isDesktop ? "size-5" : "size-4",
        open && "-rotate-180",
      )}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth={isDesktop ? 1.8 : 1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── 타입 ────────────────────────────────────────────────────────────────────

export type DropdownOption = {
  /** Select.Item의 value 식별자 */
  value: string
  /** 화면에 표시되는 텍스트 */
  label: string
}

export type DropdownProps = {
  /** 옵션 목록 */
  options: DropdownOption[]
  /** 현재 선택된 값 (controlled) */
  value?: string
  /** 초기 선택 값 (uncontrolled) */
  defaultValue?: string
  /** 선택 변경 콜백 */
  onValueChange?: (value: string) => void
  /** 아무것도 선택되지 않았을 때 보여줄 placeholder */
  placeholder?: string
  /** 디바이스 변형. 기본값: "desktop" */
  size?: DropdownSize
  /** 비활성화 여부 */
  disabled?: boolean
  className?: string
}

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

export function Dropdown({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "선택",
  size = "desktop",
  disabled = false,
  className,
}: DropdownProps) {
  const isDesktop = size === "desktop"

  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      {/* Trigger */}
      <RadixSelect.Trigger
        className={cn(
          "group flex cursor-pointer items-center gap-x-2 bg-fill-normal outline-none",
          "border border-line-neutral rounded-[8px]",
          "disabled:cursor-not-allowed disabled:opacity-40",
          "focus-visible:ring-2 focus-visible:ring-brand-primary/40",
          isDesktop
            ? "py-[10px] pl-5 pr-4"
            : "py-[6px] pl-3 pr-2 rounded-[6px]",
          className,
        )}
        aria-label={placeholder}
      >
        <RadixSelect.Value
          placeholder={
            <span
              className={cn(
                "font-semibold text-label-light",
                isDesktop
                  ? "text-lg leading-[26px] tracking-[-0.09px]"
                  : "text-sm leading-5 tracking-[0.175px]",
              )}
            >
              {placeholder}
            </span>
          }
        >
          {/* 선택된 값은 Radix가 자동으로 렌더링 */}
        </RadixSelect.Value>
        <RadixSelect.Icon asChild>
          {/* group-data-[state=open] 으로 chevron 회전 처리 */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className={cn(
              "shrink-0 text-label-light transition-transform duration-200",
              "group-data-[state=open]:-rotate-180",
              isDesktop ? "size-5" : "size-4",
            )}
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth={isDesktop ? 1.8 : 1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      {/* Portal → 화면 밖 클리핑 방지 */}
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={4}
          className={cn(
            "z-50 min-w-[var(--radix-select-trigger-width)]",
            "bg-fill-normal rounded-[8px] p-1",
            "shadow-[0px_1px_10px_rgba(179,179,188,0.25)]",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2",
          )}
        >
          <RadixSelect.Viewport>
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                className={cn(
                  "flex cursor-pointer items-center rounded-[8px] outline-none select-none",
                  "text-label-alternative font-medium",
                  isDesktop
                    ? "px-3 py-2 text-lg leading-[26px] tracking-[-0.09px]"
                    : "p-2 text-sm leading-5 tracking-[0.175px]",
                  // 선택된 항목 강조
                  "data-[state=checked]:text-brand-primary data-[state=checked]:font-semibold",
                  // 호버
                  "data-[highlighted]:bg-fill-alternative data-[highlighted]:outline-none",
                )}
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
