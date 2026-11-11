import type { SVGProps } from "react"

const TooltipArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    overflow="visible"
    preserveAspectRatio="none"
    style={{
      display: "block",
    }}
    viewBox="0 0 36 14"
    aria-hidden="true"
    {...props}
  >
    <g id="Arrow">
      <path
        id="Polygon 1"
        fill="currentColor"
        d="M19.027 13.636c-.456.485-1.598.485-2.054 0L5.16 1.091C4.704.606 5.275 0 6.188 0h23.624c.913 0 1.484.606 1.027 1.09z"
      />
    </g>
  </svg>
)
export default TooltipArrowIcon
