import type { SVGProps } from "react"
import * as React from "react"

const ToggleOpenMIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    aria-hidden={true}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.42}
      d="m20 8-8 8-8-8"
    />
  </svg>
)
export default ToggleOpenMIcon
