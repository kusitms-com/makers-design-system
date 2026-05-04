import type { HTMLAttributes, ReactNode } from "react"

export type FooterProps = HTMLAttributes<HTMLElement> & {
  logo?: ReactNode
  links?: ReactNode
  contactIcons?: ReactNode
  copyright?: string
}

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ")
}

export function Footer({
  logo,
  links,
  contactIcons,
  copyright = "KUSITMS (큐시즘, 한국대학생IT경영학회)\n© 2023.KUSITMS. ALL rights reserved.",
  className,
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn(
        "flex flex-col items-center justify-center",
        "mx-auto max-w-[1440px] min-w-[1024px] w-full",
        "bg-[var(--fill-normal)] px-10 pb-[60px]",
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-end justify-between">
        <div className="flex w-[274px] flex-col items-start">
          <div className="flex flex-col items-start pb-10 pt-[60px]">
            {logo}
          </div>
          <div className="flex w-full items-center justify-center pb-3">
            {links}
          </div>
          <p className="font-['Pretendard',sans-serif] text-[16px] font-semibold leading-[24px] tracking-[-0.04px] whitespace-pre-wrap text-[var(--label-normal)]">
            {copyright}
          </p>
        </div>
        <div className="flex w-[316px] flex-col items-start gap-5">
          <p className="w-full font-['Pretendard',sans-serif] text-[16px] font-semibold leading-[24px] tracking-[-0.04px] text-[var(--label-normal)]">
            Contact
          </p>
          <div className="flex w-full items-center gap-5">{contactIcons}</div>
        </div>
      </div>
    </footer>
  )
}
