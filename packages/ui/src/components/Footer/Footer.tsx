import type { HTMLAttributes, ReactNode } from "react"

import { cn } from "../../utils/cn"

const WEBSITE_COPYRIGHT =
  "KUSITMS (큐시즘, 한국대학생IT경영학회)\n© 2026.KUSITMS. ALL rights reserved."

export type FooterProps = HTMLAttributes<HTMLElement> & {
  logo?: ReactNode
  mobileLogo?: ReactNode
  links?: ReactNode
  contactIcons?: ReactNode
  copyright?: string
  scrollTopButton?: ReactNode
  scrollTopPlacement?: "inline" | "none"
  bylawsHref?: string
  bylawsLabel?: string
  innerClassName?: string
  leftColumnClassName?: string
  copyrightClassName?: string
  contactClassName?: string
  contactIconsClassName?: string
}

const defaultBylawsLink = (href?: string, label?: string) => {
  const className = "text-caption-12sb text-label-normal desktop:text-body-16sb"
  const content = label ?? (
    <>
      학회정관<span className="hidden desktop:inline"> (PDF)</span>
    </>
  )

  if (!href) {
    return <span className={className}>{content}</span>
  }

  return (
    <a className={cn(className, "underline decoration-solid")} href={href}>
      {content}
    </a>
  )
}

export function Footer({
  logo,
  mobileLogo,
  links,
  contactIcons,
  copyright,
  scrollTopButton,
  scrollTopPlacement = "inline",
  bylawsHref,
  bylawsLabel,
  innerClassName,
  leftColumnClassName,
  copyrightClassName,
  contactClassName,
  contactIconsClassName,
  className,
  ...props
}: FooterProps) {
  const resolvedCopyright = copyright ?? WEBSITE_COPYRIGHT

  return (
    <footer className={cn("w-full pb-[60px]", className)} {...props}>
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1440px] flex-col gap-7 px-4 justify-between desktop:flex-row desktop:items-end desktop:gap-0 desktop:px-10",
          innerClassName,
        )}
      >
        <div className={cn("flex flex-col", leftColumnClassName)}>
          {mobileLogo ? (
            <>
              <div className="hidden pt-[60px] pb-10 desktop:flex">{logo}</div>
              <div className="flex pt-[60px] pb-4 desktop:hidden">
                {mobileLogo}
              </div>
            </>
          ) : (
            <div className="flex pt-[60px] pb-4 desktop:pb-10">{logo}</div>
          )}
          <div className="flex pb-2 desktop:pb-3">
            {links ?? defaultBylawsLink(bylawsHref, bylawsLabel)}
          </div>
          <p
            className={cn(
              "whitespace-pre-line text-caption-12r text-label-normal desktop:text-body-16r",
              copyrightClassName,
            )}
          >
            {resolvedCopyright}
          </p>
        </div>
        <div
          className={cn("flex flex-col gap-2 desktop:gap-5", contactClassName)}
        >
          <h4 className="text-label-14sb text-label-normal desktop:text-body-16sb">
            Contact
          </h4>
          <div
            className={cn(
              "flex gap-[6px] desktop:gap-5",
              contactIconsClassName,
            )}
          >
            {contactIcons}
          </div>
        </div>
      </div>
      {scrollTopPlacement !== "none" ? scrollTopButton : null}
    </footer>
  )
}
