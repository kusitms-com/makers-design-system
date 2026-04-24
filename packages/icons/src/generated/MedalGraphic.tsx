import type { SVGProps } from "react"
import * as React from "react"

const MedalGraphic = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={4}
      d="M13.543 25.66a1 1 0 0 1 1.366-.365l8.66 5a1 1 0 0 1 .366 1.366l-7.377 12.778c-.433.75-1.55.632-1.817-.19l-1.524-4.686a1 1 0 0 0-1.158-.67l-4.82 1.024c-.847.18-1.506-.728-1.073-1.478zM36.63 25.66a1 1 0 0 0-1.365-.365l-8.66 5a1 1 0 0 0-.366 1.366l7.377 12.778c.433.75 1.55.632 1.817-.19l1.523-4.686a1 1 0 0 1 1.16-.67l4.819 1.024c.846.18 1.506-.728 1.073-1.478z"
    />
    <circle
      cx={25.043}
      cy={18.795}
      r={14}
      fill="#fff"
      stroke="#7C99FD"
      strokeWidth={4}
    />
    <rect width={4} height={12} x={22.957} y={13} fill="#3E5EFA" rx={2} />
    <rect
      width={4}
      height={11.185}
      x={31.263}
      y={16.018}
      fill="#3E5EFA"
      rx={2}
      transform="rotate(53.943 31.263 16.018)"
    />
    <rect
      width={4}
      height={11.185}
      fill="#3E5EFA"
      rx={2}
      transform="scale(-1 1)rotate(53.943 -25.149 -10.484)"
    />
  </svg>
)
export default MedalGraphic
