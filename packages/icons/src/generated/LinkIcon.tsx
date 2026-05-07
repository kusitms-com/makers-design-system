import type { SVGProps } from "react"

const LinkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 20"
    aria-hidden="true"
    {...props}
  >
    <rect width={20} height={20} fill="currentColor" rx={4} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      d="M8.792 10.605a3.02 3.02 0 0 0 4.555.326l1.812-1.812a3.02 3.02 0 0 0-4.27-4.271L9.848 5.88"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      d="M11.208 9.397a3.02 3.02 0 0 0-4.555-.326l-1.812 1.812a3.02 3.02 0 0 0 4.27 4.27l1.034-1.032"
    />
  </svg>
)
export default LinkIcon
