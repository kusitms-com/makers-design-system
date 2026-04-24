import type { SVGProps } from "react"
import * as React from "react"

const ToggleOpenXsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    aria-hidden={true}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.688}
      d="M13.5 6.75 9 11.25l-4.5-4.5"
    />
  </svg>
)
export default ToggleOpenXsIcon
