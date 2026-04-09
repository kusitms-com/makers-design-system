import type { SVGProps } from "react"

const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833"
    />
  </svg>
)
export default ArrowRightIcon
