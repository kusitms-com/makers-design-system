import type { SVGProps } from "react"
import * as React from "react"
export default function HomeIcon(props: SVGProps<SVGSVGElement>) {
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
        d="m2.5 7.5 7.5-5 7.5 5v10h-5v-5h-5v5h-5z"
      />
    </svg>
  )
}
