import type { SVGProps } from "react"
import * as React from "react"
export default function CheckIcon(props: SVGProps<SVGSVGElement>) {
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
        d="m3.333 10 4.584 4.583 8.75-8.75"
      />
    </svg>
  )
}
