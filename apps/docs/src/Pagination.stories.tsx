import { Pagination } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  component: Pagination,
  tags: ["autodocs"],
  title: "Components/Pagination",
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

const ArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    role="img"
    aria-label={`${direction} arrow`}
  >
    <path
      d={direction === "left" ? "M15 18L9 12L15 6" : "M9 6L15 12L9 18"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const DoubleArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    role="img"
    aria-label={`${direction} double arrow`}
  >
    <path
      d={
        direction === "left"
          ? "M18 17L13 12L18 7M11 17L6 12L11 7"
          : "M6 7L11 12L6 17M13 7L18 12L13 17"
      }
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    firstIcon: <DoubleArrowIcon direction="left" />,
    prevIcon: <ArrowIcon direction="left" />,
    nextIcon: <ArrowIcon direction="right" />,
    lastIcon: <DoubleArrowIcon direction="right" />,
  },
}

export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
    firstIcon: <DoubleArrowIcon direction="left" />,
    prevIcon: <ArrowIcon direction="left" />,
    nextIcon: <ArrowIcon direction="right" />,
    lastIcon: <DoubleArrowIcon direction="right" />,
  },
}
