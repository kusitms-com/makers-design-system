import type { SVGProps } from "react"

const ToggleCloseSIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    aria-hidden="true"
    {...props}
  >
    <path
      stroke="#BABBC1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m16 13-6-6-6 6"
    />
  </svg>
)
export default ToggleCloseSIcon
