import type { SVGProps } from "react"

const ScrollTopIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    viewBox="0 0 40 40"
    aria-hidden="true"
    {...props}
  >
    <circle cx={20} cy={20} r={20} />
    <circle
      cx={20}
      cy={20}
      r={19.5}
      stroke="currentColor"
      strokeOpacity={0.16}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      d="m14 19 6-6 6 6M20 13v14"
    />
  </svg>
)
export default ScrollTopIcon
