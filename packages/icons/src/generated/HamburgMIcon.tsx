import type { SVGProps } from "react"
import * as React from "react"

const HamburgMIcon = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={2}
      d="M3 5h18M3 12h18M3 19h18"
    />
  </svg>
)
export default HamburgMIcon
