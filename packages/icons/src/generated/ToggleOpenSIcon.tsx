import type { SVGProps } from "react"
import * as React from "react"

const ToggleOpenSIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    aria-hidden={true}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m16 7-6 6-6-6"
    />
  </svg>
)
export default ToggleOpenSIcon
