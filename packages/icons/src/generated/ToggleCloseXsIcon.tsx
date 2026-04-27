import type { SVGProps } from "react"

const ToggleCloseXsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    viewBox="0 0 18 18"
    aria-hidden="true"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.688}
      d="M13.5 11.25 9 6.75l-4.5 4.5"
    />
  </svg>
)
export default ToggleCloseXsIcon
