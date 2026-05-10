import { Pagination } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  component: Pagination,
  tags: ["autodocs"],
  title: "Components/Pagination",
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
  },
}

export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
  },
}
