import type { SVGProps } from "react"
import * as React from "react"

const CancelSIcon = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={1.667}
      d="M15 5 5 15M5 5l10 10"
    />
  </svg>
)
export default CancelSIcon
