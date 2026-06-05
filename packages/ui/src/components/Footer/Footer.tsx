import type { HTMLAttributes, ReactNode } from "react"

import { cn } from "../../utils/cn"

const WEBSITE_COPYRIGHT =
  "KUSITMS (큐시즘, 한국대학생IT경영학회)\nⓒ 2023. KUSITMS. All rights reserved."

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

const defaultBylawsLink = (href?: string, label = "학회정관") => {
  const className = cn(
    "font-sans not-italic text-label-normal",
    "desktop:text-body-6 text-body-8 text-gray-800",
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
  mobileLogo,
  links,
  contactIcons,
  copyright,
  scrollTopButton,
  scrollTopPlacement = "inline",
  bylawsHref,
  bylawsLabel = "학회정관",
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
    <footer className={cn("w-full py-[60px]", className)} {...props}>
      <div
        className={cn(
          "max-w-[1180px] w-full mx-auto flex desktop:flex-row flex-col justify-between px-10",
          innerClassName,
        )}
      >
        <div className={cn("flex flex-col mt-1", leftColumnClassName)}>
          <div className="flex items-center justify-between">
            {mobileLogo ?? logo}
          </div>
          <div className="desktop:mt-10 mt-4">
            {links ?? defaultBylawsLink(bylawsHref, bylawsLabel)}
          </div>
          <p
            className={cn(
              "desktop:text-body-6 text-body-8 text-gray-800 mt-3 whitespace-pre-line",
              copyrightClassName,
            )}
          >
            {resolvedCopyright}
          </p>
        </div>
        <div
          className={cn(
            "flex-col desktop:pt-0 pt-7 desktop:self-end",
            contactClassName,
          )}
        >
          <h4 className="text-body-5 text-gray-800 desktop:mb-5 mb-2">
            Contact
          </h4>
          <div
            className={cn(
              "flex desktop:gap-5 gap-[14px]",
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
