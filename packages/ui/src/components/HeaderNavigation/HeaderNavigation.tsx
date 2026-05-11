import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from "react"

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
    "font-medium text-[var(--label-light)] hover:font-bold hover:text-[var(--label-normal)] active:font-bold active:text-[var(--brand-primary)]",
  hovered: "font-bold text-[var(--label-normal)]",
  pressed: "font-bold text-[var(--brand-primary)]",
}

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ")
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
    "flex items-center justify-center px-4 whitespace-nowrap",
    "font-['Pretendard',sans-serif] text-[16px] leading-[24px] tracking-[-0.04px] transition-colors",
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
