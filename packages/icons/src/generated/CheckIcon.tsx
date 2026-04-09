import type { SVGProps } from "react"

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m3.333 10 4.584 4.583 8.75-8.75"
    />
  </svg>
)
export default CheckIcon
