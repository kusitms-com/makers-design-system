import type { SVGProps } from "react"
import * as React from "react"

const ArrowRightMIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    aria-hidden={true}
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.293 4.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 .25.414l.015.061q.027.112.028.232-.001.125-.031.24l-.013.051a1 1 0 0 1-.165.317 1 1 0 0 1-.084.099l-7 7a1 1 0 1 1-1.414-1.414L16.586 13H5a1 1 0 0 1 0-2h11.586l-5.293-5.293a1 1 0 0 1 0-1.414"
      clipRule="evenodd"
    />
  </svg>
)
export default ArrowRightMIcon
