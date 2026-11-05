import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from "react"

import { cn } from "../../utils/cn"

type HeaderNavState = "default" | "hovered" | "pressed"

type HeaderNavigationBaseProps = {
  /** 현재 페이지 메뉴. `state="pressed"`와 같다. */
  isActive?: boolean
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
  default: "text-body-16m text-label-light hover:text-label-normal",
  hovered: "text-body-16m text-label-normal",
  pressed: "text-body-16sb text-label-normal",
}

function isLinkProps(
  props: HeaderNavigationProps,
): props is HeaderNavigationLinkProps {
  return "href" in props && typeof props.href === "string"
}

export function HeaderNavigation({
  children,
  className,
  isActive = false,
  state = "default",
  ...props
}: HeaderNavigationProps) {
  const sharedClassName = cn(
    "block max-w-full overflow-hidden text-ellipsis whitespace-nowrap p-3 text-center",
    "font-sans transition-colors",
    stateStyles[isActive ? "pressed" : state],
    className,
  )

  if (isLinkProps(props)) {
    const linkProps = props

    return (
      <a
        className={sharedClassName}
        aria-current={isActive || state === "pressed" ? "page" : undefined}
        {...linkProps}
      >
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
