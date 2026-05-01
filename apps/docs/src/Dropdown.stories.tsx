import { Dropdown } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const OPTIONS = [
  { value: "option1", label: "옵션 1" },
  { value: "option2", label: "옵션 2" },
  { value: "option3", label: "옵션 3" },
]

const meta = {
  title: "Dropdown/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  args: {
    options: OPTIONS,
    placeholder: "선택",
    size: "desktop",
    disabled: false,
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["desktop", "mobile"],
      description: "디바이스 변형",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 여부",
    },
    placeholder: {
      control: { type: "text" },
      description: "아무것도 선택되지 않았을 때 표시되는 텍스트",
    },
  },
} satisfies Meta<typeof Dropdown>

export default meta

type Story = StoryObj<typeof meta>

// ─── Desktop ─────────────────────────────────────────────────────────────────

export const DesktopDefault: Story = {
  name: "Desktop / 기본",
  args: {
    size: "desktop",
  },
}

export const DesktopSelected: Story = {
  name: "Desktop / 선택됨",
  args: {
    size: "desktop",
    defaultValue: "option1",
  },
}

export const DesktopDisabled: Story = {
  name: "Desktop / 비활성화",
  args: {
    size: "desktop",
    disabled: true,
  },
}

// ─── Mobile ──────────────────────────────────────────────────────────────────

export const MobileDefault: Story = {
  name: "Mobile / 기본",
  args: {
    size: "mobile",
  },
}

export const MobileSelected: Story = {
  name: "Mobile / 선택됨",
  args: {
    size: "mobile",
    defaultValue: "option2",
  },
}

export const MobileDisabled: Story = {
  name: "Mobile / 비활성화",
  args: {
    size: "mobile",
    disabled: true,
  },
}

// ─── 전체 상태 비교 ────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "전체 상태 비교",
  render: () => (
    <div className="flex flex-col gap-10">
      <section>
        <p className="mb-3 text-xs text-gray-400">Desktop — 기본 (미선택)</p>
        <Dropdown options={OPTIONS} size="desktop" />
      </section>

      <section>
        <p className="mb-3 text-xs text-gray-400">Desktop — 선택됨</p>
        <Dropdown options={OPTIONS} size="desktop" defaultValue="option1" />
      </section>

      <section>
        <p className="mb-3 text-xs text-gray-400">Desktop — 비활성화</p>
        <Dropdown options={OPTIONS} size="desktop" disabled />
      </section>

      <section>
        <p className="mb-3 text-xs text-gray-400">Mobile — 기본 (미선택)</p>
        <Dropdown options={OPTIONS} size="mobile" />
      </section>

      <section>
        <p className="mb-3 text-xs text-gray-400">Mobile — 선택됨</p>
        <Dropdown options={OPTIONS} size="mobile" defaultValue="option2" />
      </section>

      <section>
        <p className="mb-3 text-xs text-gray-400">Mobile — 비활성화</p>
        <Dropdown options={OPTIONS} size="mobile" disabled />
      </section>
    </div>
  ),
}
