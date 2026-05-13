import { Blog } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  args: {
    imageUrl: "https://placehold.co/184x120/e0e0e8/9393a4?text=KUSITMS",
    title: "큐밀리이야기 제목입니다",
    content:
      "게시글 본문입니다. 게시글 본문입니다. 게시글 본문입니다. 게시글 본문입니다.",
    labels: ["활동명", "기수", "파트명"],
  },
  component: Blog,
  tags: ["autodocs"],
  title: "Components/Blog",
} satisfies Meta<typeof Blog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoLabels: Story = {
  args: {
    labels: [],
  },
}
