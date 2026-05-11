import { List } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const placeholder = "최대 너비를 넘어가지 않게 간결하게 입력해주세요"

type ListStoryProps = {
  title: string
  item1: string
  item2: string
  item3: string
}

function ListStory({ title, item1, item2, item3 }: ListStoryProps) {
  return <List title={title} items={[item1, item2, item3]} />
}

const meta = {
  component: ListStory,
  tags: ["autodocs"],
  title: "List/List",
  args: {
    title: "제목을 입력하세요",
    item1: placeholder,
    item2: placeholder,
    item3: placeholder,
  },
  argTypes: {
    item1: { control: "text" },
    item2: { control: "text" },
    item3: { control: "text" },
  },
} satisfies Meta<typeof ListStory>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
