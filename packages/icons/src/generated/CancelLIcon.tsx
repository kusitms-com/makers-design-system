import type { SVGProps } from "react"
import * as React from "react"

const CancelLIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    aria-hidden={true}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M24 8 8 24M8 8l16 16"
    />
  </svg>
)
export default CancelLIcon
