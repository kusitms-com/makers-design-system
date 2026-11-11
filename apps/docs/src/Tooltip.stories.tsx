import { Tooltip } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    label: "kusitms@gmail.com",
    arrow: "center",
  },
  argTypes: {
    arrow: {
      control: { type: "select" },
      options: ["center", "end"],
    },
    label: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ArrowEnd: Story = {
  args: { arrow: "end", label: "KUSITMS 링크드인" },
}

export const LongLabel: Story = {
  args: { label: "아주 긴 라벨은 174px에서 말줄임으로 잘립니다" },
}
