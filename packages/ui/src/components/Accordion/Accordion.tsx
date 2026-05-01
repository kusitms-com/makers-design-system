"use client"

import * as RadixAccordion from "@radix-ui/react-accordion"
import {
  type ComponentPropsWithoutRef,
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

type AccordionSize = "desktop" | "mobile"

const AccordionSizeContext = createContext<AccordionSize>("desktop")

function cn(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ")
}

function ChevronIcon({ size }: { size: AccordionSize }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={cn(
        "shrink-0 text-label-normal transition-transform duration-200",
        size === "desktop" ? "size-6" : "size-5",
        // Trigger(group)에 data-state=open이 붙으면 위로 회전
        "group-data-[state=open]:-rotate-180",
      )}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth={size === "desktop" ? 1.8 : 1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ComponentPropsWithoutRef<Root>는 AccordionSingleProps | AccordionMultipleProps 유니온이다.
// Omit을 유니온에 적용하면 discriminated union이 무너져 collapsible 등 single-only 프로퍼티가
// 사라지므로, 필요한 것들을 명시적으로 추가한다.
type RadixRootProps = ComponentPropsWithoutRef<typeof RadixAccordion.Root>

export type AccordionProps = Omit<RadixRootProps, "asChild"> & {
  /**
   * 디바이스 변형. 하위 모든 Accordion.Item이 이 사이즈를 따른다.
   * 기본값: "desktop"
   */
  size?: AccordionSize
  /**
   * type="single"일 때 열려 있는 아이템을 다시 클릭해 닫을 수 있는지 여부.
   */
  collapsible?: boolean
}

function AccordionRoot({
  size = "desktop",
  className,
  children,
  ...props
}: AccordionProps) {
  return (
    <AccordionSizeContext.Provider value={size}>
      <RadixAccordion.Root
        className={cn(
          "flex flex-col",
          size === "desktop" ? "w-300 gap-3" : "w-72 gap-2",
          className,
        )}
        {...(props as RadixRootProps)}
      >
        {children}
      </RadixAccordion.Root>
    </AccordionSizeContext.Provider>
  )
}

export type AccordionItemProps = {
  /** Radix가 어떤 아이템이 열려있는지 식별하는 고유 값 */
  value: string
  /** 질문 텍스트. ReactNode이므로 강조 등 인라인 마크업 가능 */
  question: ReactNode
  /** 답변 콘텐츠. 문자열이면 \n 줄바꿈이 그대로 렌더링됨 */
  answer: ReactNode
  className?: string
}

function AccordionItem({
  value,
  question,
  answer,
  className,
}: AccordionItemProps) {
  const size = useContext(AccordionSizeContext)
  const isDesktop = size === "desktop"

  // Radix Item의 data-state 변화를 MutationObserver로 감지해 JS 애니메이션 구동
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

    // 마운트 직후 초기 상태 반영 (defaultValue 등)
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
        isDesktop ? "rounded-[20px] px-10 py-8" : "rounded-2xl px-5 py-4",
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
          <span
            className={cn(
              "flex min-w-0 flex-1",
              isDesktop ? "items-center gap-2" : "items-start gap-1",
            )}
          >
            <span
              className={cn(
                "shrink-0 font-semibold text-brand-primary",
                isDesktop
                  ? "w-[23px] pb-1 text-center text-2xl leading-[1.35] tracking-[-0.48px]"
                  : "text-lg leading-[26px] tracking-[-0.09px]",
              )}
            >
              Q.
            </span>
            <span
              className={cn(
                "min-w-0 flex-1 text-label-normal",
                isDesktop
                  ? "text-2xl font-semibold leading-9 tracking-[-0.192px]"
                  : "pt-0.5 text-base font-medium leading-6 tracking-[-0.32px]",
              )}
            >
              {question}
            </span>
          </span>
          <ChevronIcon size={size} />
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>

      {/*
       * forceMount: 항상 DOM에 유지 → scrollHeight 측정 가능
       * 실제 표시/숨김은 아래 animation div의 height + opacity로 제어
       */}
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
            className={cn(
              "whitespace-pre-line pt-3 font-normal text-label-netural",
              isDesktop
                ? "text-xl leading-8 tracking-[-0.16px]"
                : "text-base leading-6 tracking-[-0.04px]",
            )}
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
