import { ShowcaseCard } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  args: {
    name: "모각작",
    description:
      "함께 집중하는 시간, 공유 타이머로 지속적인 몰입을 경험할 수 있게 하는 서비스",
    th: 32,
    isMeetup: false,
    type: "WEB",
    imageUrl: "https://placehold.co/320x192/ff9200/ffffff?text=Thumbnail",
  },
  component: ShowcaseCard,
  tags: ["autodocs"],
  title: "Card/ShowcaseCard",
} satisfies Meta<typeof ShowcaseCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const App: Story = {
  args: {
    type: "APP",
  },
}

export const Meetup: Story = {
  args: {
    isMeetup: true,
    type: "WEB",
  },
}

export const MeetupApp: Story = {
  args: {
    isMeetup: true,
    type: "APP",
  },
}
