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
  title: "Accordion/AccordionFaq",
  component: Accordion,
  tags: ["autodocs"],
  args: {
    type: "single",
    collapsible: true,
    size: "desktop",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["desktop", "mobile"],
      description: "디바이스 변형",
    },
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
      description: "단일/복수 열기 모드",
    },
    collapsible: {
      control: { type: "boolean" },
      description: "열린 아이템을 다시 클릭해 닫을 수 있는지 여부",
    },
  },
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

// ─── Desktop ─────────────────────────────────────────────────────────────────

export const DesktopDefault: Story = {
  name: "Desktop / 기본 (닫힘)",
  args: {
    size: "desktop",
  },
  render: (args) => (
    <div className="w-[1200px]">
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
    </div>
  ),
}

export const DesktopOpen: Story = {
  name: "Desktop / 첫 번째 열림",
  args: {
    size: "desktop",
    defaultValue: "q1",
  },
  render: (args) => (
    <div className="w-[1200px]">
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
    </div>
  ),
}

export const DesktopMultiple: Story = {
  name: "Desktop / 여러 개 동시 열기",
  args: {
    size: "desktop",
    type: "multiple",
    defaultValue: ["q1", "q2"],
  },
  render: (args) => (
    <div className="w-[1200px]">
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
    </div>
  ),
}

// ─── Mobile ──────────────────────────────────────────────────────────────────

export const MobileDefault: Story = {
  name: "Mobile / 기본 (닫힘)",
  args: {
    size: "mobile",
  },
  render: (args) => (
    <div className="w-[288px]">
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
    </div>
  ),
}

export const MobileOpen: Story = {
  name: "Mobile / 첫 번째 열림",
  args: {
    size: "mobile",
    defaultValue: "q1",
  },
  render: (args) => (
    <div className="w-[288px]">
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
    </div>
  ),
}

// ─── 전체 상태 비교 ────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "전체 상태 비교",
  render: () => (
    <div className="flex flex-col gap-12">
      <section>
        <p className="mb-4 text-xs text-gray-400">Desktop — 닫힘</p>
        <div className="w-[1200px]">
          <Accordion type="single" collapsible size="desktop">
            <Accordion.Item
              value="q1"
              question="정기 커리큘럼에 불참하면 어떻게 되나요?"
              answer="정기 커리큘럼에 불참하면 정관에 따라 벌점이 부과돼요."
            />
          </Accordion>
        </div>
      </section>

      <section>
        <p className="mb-4 text-xs text-gray-400">Desktop — 열림</p>
        <div className="w-[1200px]">
          <Accordion type="single" collapsible size="desktop" defaultValue="q1">
            <Accordion.Item
              value="q1"
              question="정기 커리큘럼에 불참하면 어떻게 되나요?"
              answer={
                "정기 커리큘럼에 불참하면 정관에 따라 벌점이 부과돼요. 최대 벌점을 초과하면 수료를 못하게 될 수 있어요.\n정기 커리큘럼에는 최대한 참여해야 수료에 지장이 없어요."
              }
            />
          </Accordion>
        </div>
      </section>

      <section>
        <p className="mb-4 text-xs text-gray-400">Mobile — 닫힘</p>
        <div className="w-[288px]">
          <Accordion type="single" collapsible size="mobile">
            <Accordion.Item
              value="q1"
              question="정기 커리큘럼에 불참하면 어떻게 되나요?"
              answer="정기 커리큘럼에 불참하면 정관에 따라 벌점이 부과돼요."
            />
          </Accordion>
        </div>
      </section>

      <section>
        <p className="mb-4 text-xs text-gray-400">Mobile — 열림</p>
        <div className="w-[288px]">
          <Accordion type="single" collapsible size="mobile" defaultValue="q1">
            <Accordion.Item
              value="q1"
              question="정기 커리큘럼에 불참하면 어떻게 되나요?"
              answer={
                "정기 커리큘럼에 불참하면 정관에 따라 벌점이 부과돼요. 최대 벌점을 초과하면 수료를 못하게 될 수 있어요.\n정기 커리큘럼에는 최대한 참여해야 수료에 지장이 없어요."
              }
            />
          </Accordion>
        </div>
      </section>
    </div>
  ),
}
