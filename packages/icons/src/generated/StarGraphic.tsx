import type { SVGProps } from "react"

const StarGraphic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={31}
    height={31}
    fill="none"
    viewBox="0 0 31 31"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="#DCE5FE"
      d="M13.768 3c.77-1.333 2.694-1.333 3.464 0l9.96 17.25c.77 1.333-.193 3-1.733 3H5.541c-1.54 0-2.502-1.667-1.732-3z"
    />
    <path
      fill="#98B1FE"
      d="M17.232 28c-.77 1.333-2.694 1.333-3.464 0l-9.96-17.25c-.77-1.333.193-3 1.733-3h19.918c1.54 0 2.502 1.667 1.732 3z"
    />
    <path
      fill="#BACCFE"
      d="m24.448 15.499-4.473 7.751h-8.95l-4.473-7.751 4.473-7.749h8.95z"
    />
  </svg>
)
export default StarGraphic
