import type { HTMLAttributes, ReactNode } from "react"

import { cn } from "../../utils/cn"

export type FooterProps = HTMLAttributes<HTMLElement> & {
  logo?: ReactNode
  links?: ReactNode
  contactIcons?: ReactNode
  copyright?: string
  scrollTopButton?: ReactNode
  device?: "desktop" | "mobile"
  bylawsHref?: string
  bylawsLabel?: string
}

const defaultBylawsLink = (
  device: "desktop" | "mobile",
  href?: string,
  label = "학회정관",
) => {
  const className = cn(
    "font-sans not-italic text-label-normal",
    device === "desktop" ? "text-body-16sb" : "text-caption-12r",
  )

  if (!href) {
    return <span className={className}>{label}</span>
  }

  return (
    <a className={`${className} underline decoration-solid`} href={href}>
      {label}
    </a>
  )
}

export function Footer({
  logo,
  links,
  contactIcons,
  copyright = "KUSITMS (큐시즘, 한국대학생IT경영학회)\n© 2023.KUSITMS. ALL rights reserved.",
  scrollTopButton,
  device = "desktop",
  bylawsHref,
  bylawsLabel = "학회정관",
  className,
  ...props
}: FooterProps) {
  if (device === "mobile") {
    return (
      <footer
        className={cn("w-full bg-fill-normal px-4 pb-15 pt-15", className)}
        {...props}
      >
        <div className="mx-auto flex w-full flex-col items-start">
          <div className="flex w-full items-start justify-between gap-4">
            <div className="flex min-w-0 flex-1 flex-col items-start">
              <div className="pb-4">{logo}</div>
              <div className="pb-2">
                {links ?? defaultBylawsLink("mobile", bylawsHref, bylawsLabel)}
              </div>
              <p className="w-full whitespace-pre-wrap font-sans text-caption-12r text-label-normal">
                {copyright}
              </p>
            </div>
            {scrollTopButton}
          </div>
          <div className="flex w-full flex-col items-start gap-2 pt-7">
            <p className="font-sans text-body-16sb text-label-normal">
              Contact
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              {contactIcons}
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer
      className={cn(
        "flex flex-col items-center justify-center",
        "w-full",
        "bg-fill-normal px-10 pb-15",
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-end justify-between">
        <div className="flex w-68.5 flex-col items-start">
          <div className="flex flex-col items-start pb-10 pt-15">{logo}</div>
          <div className="flex w-full pb-3">
            {links ?? defaultBylawsLink("desktop", bylawsHref, bylawsLabel)}
          </div>
          <p className="whitespace-pre font-sans text-body-16sb text-label-normal">
            {copyright}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-5">
          <p className="font-sans text-body-16sb text-label-normal">Contact</p>
          <div className="flex items-center gap-5">{contactIcons}</div>
        </div>
      </div>
    </footer>
  )
}
