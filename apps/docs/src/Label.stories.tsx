import { Label } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  args: {
    children: "기획",
    type: "brand",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["brand", "secondary", "default"],
    },
    description: {
      control: { type: "text" },
      description: 'type="default"일 때만 사용되는 보조 텍스트',
    },
    children: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">Brand</span>
        <Label type="brand">기획</Label>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">Secondary</span>
        <Label type="secondary">텍스트</Label>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">
          Default · with description
        </span>
        <Label type="default" description="손아현, 손아현">
          기획
        </Label>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">Default · 단독</span>
        <Label type="default">기획</Label>
      </div>
    </div>
  ),
}
