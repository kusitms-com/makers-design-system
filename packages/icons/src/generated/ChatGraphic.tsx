import type { SVGProps } from "react"

const ChatGraphic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 50 50"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="#fff"
      stroke="#98B1FE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M8 37V7a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v30a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2"
    />
    <path
      stroke="#BACCFE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M17 10h6"
    />
    <path
      fill="#fff"
      stroke="#7C99FD"
      strokeWidth={4}
      d="M26 25h11a8 8 0 0 1 8 8v10c0 1.288-1.459 2.033-2.503 1.28l-2.64-1.908A7.25 7.25 0 0 0 35.613 41H26a8 8 0 1 1 0-16Z"
    />
    <circle cx={26} cy={33} r={2} fill="#7C99FD" />
    <circle cx={32} cy={33} r={2} fill="#7C99FD" />
    <circle cx={38} cy={33} r={2} fill="#7C99FD" />
  </svg>
)
export default ChatGraphic
