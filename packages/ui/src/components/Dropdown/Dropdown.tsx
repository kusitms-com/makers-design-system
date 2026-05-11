"use client"

import { ToggleOpenSIcon } from "@kusitms.com/icons"
import * as RadixSelect from "@radix-ui/react-select"
import { cn } from "../../utils/cn"

export type DropdownOption = {
  value: string
  label: string
}

export type DropdownProps = {
  options: DropdownOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function Dropdown({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "선택",
  disabled = false,
  className,
}: DropdownProps) {
  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <RadixSelect.Trigger
        className={cn(
          "group flex cursor-pointer items-center gap-x-2 bg-fill-normal outline-none",
          "border border-line-neutral",
          "rounded-md py-1.5 pl-3 pr-2",
          "lg:rounded-lg lg:py-2.5 lg:pl-5 lg:pr-4",
          "text-label-14sb lg:text-body-18sb text-label-light",
          "disabled:cursor-not-allowed disabled:opacity-40",
          className,
        )}
        aria-label={placeholder}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon asChild>
          <ToggleOpenSIcon
            className={cn(
              "shrink-0 text-label-light transition-transform duration-200",
              "size-4 lg:size-5",
              "group-data-[state=open]:-rotate-180",
            )}
          />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={4}
          className={cn(
            "z-50 min-w-[var(--radix-select-trigger-width)]",
            "bg-fill-normal rounded-lg p-1",
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
                  "flex cursor-pointer items-center rounded-md outline-none select-none",
                  "text-label-alternative text-label-14m lg:text-body-18m",
                  "p-2 lg:px-3 lg:py-2",
                  "data-[state=checked]:text-brand-primary data-[state=checked]:text-label-14sb lg:data-[state=checked]:text-body-18sb",
                  "data-[highlighted]:bg-fill-netural data-[highlighted]:outline-none",
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
