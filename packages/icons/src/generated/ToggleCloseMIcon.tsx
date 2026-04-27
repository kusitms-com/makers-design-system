import type { SVGProps } from "react"

const ToggleCloseMIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.42}
      d="m20 16-8-8-8 8"
    />
  </svg>
)
export default ToggleCloseMIcon
