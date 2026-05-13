import type { SVGProps } from "react"

const MailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    overflow="visible"
    preserveAspectRatio="none"
    style={{
      display: "block",
    }}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <g id="mail">
      <mask
        id="mask0_0_27"
        width={24}
        height={24}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
      >
        <path id="Bounding box" fill="currentColor" d="M0 0h24v24H0z" />
      </mask>
      <g mask="url(#mask0_0_27)">
        <path
          id="mail_2"
          fill="currentColor"
          d="M4 20q-.824 0-1.412-.587A1.93 1.93 0 0 1 2 18V6q0-.824.587-1.412A1.93 1.93 0 0 1 4 4h16q.824 0 1.413.588Q22 5.175 22 6v12q0 .824-.587 1.413A1.93 1.93 0 0 1 20 20zm8-7L4 8v10h16V8zm0-2 8-5H4zM4 8V6v12z"
        />
      </g>
    </g>
  </svg>
)
export default MailIcon
