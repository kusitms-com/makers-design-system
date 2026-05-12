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
  default:
    "text-body-16m text-label-light hover:text-body-16b hover:text-label-normal active:text-body-16b active:text-brand-primary",
  hovered: "text-body-16b text-label-normal",
  pressed: "text-body-16b text-brand-primary",
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
    "flex max-w-full items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-4",
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
