import { Dropdown } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const OPTIONS = [
  { value: "all", label: "모든 기수" },
  { value: "31", label: "31기" },
  { value: "30", label: "30기" },
  { value: "29", label: "29기" },
  { value: "28", label: "28기" },
]

const meta = {
  title: "Dropdown/Default",
  component: Dropdown,
  tags: ["autodocs"],
  args: {
    options: OPTIONS,
    placeholder: "선택",
    disabled: false,
  },
  argTypes: {
    disabled: { control: { type: "boolean" } },
    placeholder: { control: { type: "text" } },
  },
} satisfies Meta<typeof Dropdown>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "선택",
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">기본 (미선택)</span>
        <Dropdown options={OPTIONS} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">선택됨</span>
        <Dropdown options={OPTIONS} defaultValue="all" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">비활성화</span>
        <Dropdown options={OPTIONS} disabled />
      </div>
    </div>
  ),
}
