import type { SVGProps } from "react"
import * as React from "react"
export default function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
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
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833"
      />
    </svg>
  )
}
