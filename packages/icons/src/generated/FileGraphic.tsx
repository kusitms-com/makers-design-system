import type { SVGProps } from "react"
import * as React from "react"

const FileGraphic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="none"
    aria-hidden={true}
    {...props}
  >
    <path
      fill="#fff"
      stroke="#98B1FE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M9 44V7a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v32.172a2 2 0 0 1-.586 1.414l-4.828 4.828a2 2 0 0 1-1.414.586H11a2 2 0 0 1-2-2"
    />
    <path
      stroke="#98B1FE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M32 46v-7a2 2 0 0 1 2-2h7"
    />
    <path
      stroke="#7C99FD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M17 14h16M17 22h16M17 30h8"
    />
  </svg>
)
export default FileGraphic
