import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from "react"

import { cn } from "../../utils/cn"

type HeaderNavState = "default" | "hovered" | "pressed"

type HeaderNavigationBaseProps = {
  state?: HeaderNavState
}

type HeaderNavigationButtonProps = PropsWithChildren<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> &
    HeaderNavigationBaseProps & {
      href?: undefined
    }
>

type HeaderNavigationLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> &
    HeaderNavigationBaseProps & {
      href: string
    }
>

export type HeaderNavigationProps =
  | HeaderNavigationButtonProps
  | HeaderNavigationLinkProps

const stateStyles: Record<HeaderNavState, string> = {
  default: "text-body-6 text-gray-700 hover:text-body-5",
  hovered: "text-body-5 text-gray-700",
  pressed: "text-body-5 text-dark-blue-600",
}

function isLinkProps(
  props: HeaderNavigationProps,
): props is HeaderNavigationLinkProps {
  return "href" in props && typeof props.href === "string"
}

export function HeaderNavigation({
  children,
  className,
  state = "default",
  ...props
}: HeaderNavigationProps) {
  const sharedClassName = cn(
    "block max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-7 text-center",
    "font-sans transition-colors",
    stateStyles[state],
    className,
  )

  if (isLinkProps(props)) {
    const linkProps = props

    return (
      <a className={sharedClassName} {...linkProps}>
        {children}
      </a>
    )
  }

  const buttonProps = props as HeaderNavigationButtonProps

  return (
    <button className={sharedClassName} {...buttonProps} type="button">
      {children}
    </button>
  )
}
