import type { SVGProps } from "react"

const CancelLIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    aria-hidden="true"
    {...props}
  >
    <path
      stroke="#777982"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M24 8 8 24M8 8l16 16"
    />
  </svg>
)
export default CancelLIcon
