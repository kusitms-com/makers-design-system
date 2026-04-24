import type { SVGProps } from "react"

const CancelSIcon = (props: SVGProps<SVGSVGElement>) => (
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
      stroke="#777982"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M15 5 5 15M5 5l10 10"
    />
  </svg>
)
export default CancelSIcon
