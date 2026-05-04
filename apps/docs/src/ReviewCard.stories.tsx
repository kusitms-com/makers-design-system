import { ReviewCard } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  args: {
    name: "성이름",
    part: "파트명",
    body: "텍스트를 입력하세요",
  },
  component: ReviewCard,
  tags: ["autodocs"],
  title: "Card/ReviewCard",
} satisfies Meta<typeof ReviewCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
