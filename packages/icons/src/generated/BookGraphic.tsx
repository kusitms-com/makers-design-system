import type { SVGProps } from "react"

const BookGraphic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={58}
    height={58}
    fill="none"
    viewBox="0 0 58 58"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="#EFF4FF"
      d="M10.625 12.625H44.75a3 3 0 1 1 0 6H10.625zM13.625 26.125h34.5a3 3 0 1 1 0 6h-34.5zM9.125 39.625h34.5a3 3 0 1 1 0 6h-34.5z"
    />
    <path
      fill="#98B1FE"
      d="M44.75 8.875a6.75 6.75 0 0 1 0 13.5H9.5a1.875 1.875 0 0 1 0-3.75h35.25a3 3 0 1 0 0-6H9.5a1.875 1.875 0 0 1 0-3.75z"
    />
    <path
      fill="#3E5EFA"
      d="M48.125 22.375a6.75 6.75 0 0 1 0 13.5h-35.25a1.875 1.875 0 0 1 0-3.75h35.25a3 3 0 1 0 0-6h-35.25a1.875 1.875 0 0 1 0-3.75z"
    />
    <path
      fill="#98B1FE"
      d="M43.25 35.875a6.75 6.75 0 0 1 0 13.5H8a1.875 1.875 0 0 1 0-3.75h35.25a3 3 0 1 0 0-6H8a1.875 1.875 0 0 1 0-3.75z"
    />
    <path
      fill="#3E5EFA"
      d="M35.75 8.875a.75.75 0 0 1 .75-.75h6.375a.75.75 0 0 1 .75.75v10.354c0 .332-.401.5-.638.267l-3.036-2.994a.375.375 0 0 0-.527 0l-3.036 2.994a.375.375 0 0 1-.638-.267z"
    />
  </svg>
)
export default BookGraphic
