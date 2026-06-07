import { Accordion } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const FAQ_ITEMS = [
  {
    value: "q1",
    question: "정기 커리큘럼에 불참하면 어떻게 되나요?",
    answer:
      "정기 커리큘럼에 불참하면 정관에 따라 벌점이 부과돼요. 최대 벌점을 초과하면 수료를 못하게 될 수 있어요.\n정기 커리큘럼에는 최대한 참여해야 수료에 지장이 없어요.",
  },
  {
    value: "q2",
    question: "활동비는 어떻게 납부하나요?",
    answer: "활동비는 합격 안내 메일에 기재된 계좌로 입금하시면 돼요.",
  },
  {
    value: "q3",
    question: "중간에 팀을 변경할 수 있나요?",
    answer:
      "팀 변경은 원칙적으로 불가하지만, 불가피한 사정이 있을 경우 운영진에게 문의해 주세요.",
  },
]

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: {
    type: "single",
    collapsible: true,
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
    },
    collapsible: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      {FAQ_ITEMS.map((item) => (
        <Accordion.Item
          key={item.value}
          value={item.value}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </Accordion>
  ),
}
