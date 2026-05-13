"use client"

import { ToggleOpenSIcon } from "@kusitms.com/icons"
import * as RadixAccordion from "@radix-ui/react-accordion"
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { cn } from "../../utils/cn"

type RadixRootProps = ComponentPropsWithoutRef<typeof RadixAccordion.Root>

export type AccordionProps = Omit<RadixRootProps, "asChild"> & {
  collapsible?: boolean
}

function AccordionRoot({ className, children, ...props }: AccordionProps) {
  return (
    <RadixAccordion.Root
      className={cn("flex w-full flex-col gap-2 lg:gap-3", className)}
      {...(props as RadixRootProps)}
    >
      {children}
    </RadixAccordion.Root>
  )
}

export type AccordionItemProps = {
  value: string
  question: ReactNode
  answer: ReactNode
  className?: string
}

function AccordionItem({
  value,
  question,
  answer,
  className,
}: AccordionItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const item = itemRef.current
    if (!item) return

    const update = () => {
      const open = item.getAttribute("data-state") === "open"
      setIsOpen(open)
      setHeight(open ? (innerRef.current?.scrollHeight ?? 0) : 0)
    }

    update()

    const observer = new MutationObserver(update)
    observer.observe(item, {
      attributes: true,
      attributeFilter: ["data-state"],
    })
    return () => observer.disconnect()
  }, [])

  return (
    <RadixAccordion.Item
      ref={itemRef}
      value={value}
      className={cn(
        "w-full bg-fill-netural",
        "rounded-2xl px-5 py-4",
        "lg:rounded-5 lg:px-10 lg:py-8",
        className,
      )}
    >
      <RadixAccordion.Header className="flex">
        <RadixAccordion.Trigger
          className={cn(
            "group flex w-full cursor-pointer items-center justify-between gap-2 text-left outline-none",
            "focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-brand-primary/40",
          )}
        >
          <span className="flex min-w-0 flex-1 items-start gap-1 lg:items-center lg:gap-2">
            <span className="shrink-0 text-center text-body-18sb text-brand-primary lg:w-5.75 lg:pb-1 lg:text-headline-24sb">
              Q.
            </span>
            <span className="min-w-0 flex-1 pt-0.5 text-body-16m text-label-normal lg:pt-0 lg:text-headline-24sb">
              {question}
            </span>
          </span>
          <ToggleOpenSIcon
            aria-hidden
            className={cn(
              "shrink-0 text-label-normal transition-transform duration-200",
              "size-5 lg:size-6",
              "group-data-[state=open]:-rotate-180",
            )}
          />
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>

      <RadixAccordion.Content forceMount>
        <div
          style={{
            height,
            overflow: "hidden",
            opacity: isOpen ? 1 : 0,
            transition: [
              `height ${isOpen ? 300 : 500}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              `opacity ${isOpen ? 200 : 400}ms`,
            ].join(", "),
          }}
        >
          <div
            ref={innerRef}
            className="whitespace-pre-line pt-3 text-body-16r text-label-netural lg:text-headline-20r"
          >
            {answer}
          </div>
        </div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  )
}

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
})
