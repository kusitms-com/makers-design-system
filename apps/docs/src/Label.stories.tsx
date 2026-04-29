import { Label } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Label/Default",
  component: Label,
  tags: ["autodocs"],
  args: {
    children: "기획",
    type: "brand",
    size: "desktop",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["brand", "secondary", "default"],
    },
    size: {
      control: { type: "select" },
      options: ["desktop", "mobile"],
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

export const Brand: Story = {
  args: {
    type: "brand",
    children: "기획",
  },
}

export const SecondaryDesktop: Story = {
  args: {
    type: "secondary",
    size: "desktop",
    children: "텍스트",
  },
}

export const SecondaryMobile: Story = {
  args: {
    type: "secondary",
    size: "mobile",
    children: "활동명",
  },
}

export const Default: Story = {
  args: {
    type: "default",
    children: "기획",
    description: "손아현, 손아현",
  },
}

export const DefaultWithoutDescription: Story = {
  args: {
    type: "default",
    children: "기획",
  },
}

export const DefaultWithCustomDescription: Story = {
  name: "Default · description으로 다양한 정보 표시",
  render: () => (
    <div className="flex flex-col gap-3">
      <Label type="default" description="손아현, 손아현">
        기획
      </Label>
      <Label type="default" description="마감 11/30">
        디자인
      </Label>
      <Label type="default" description="진행중 · 70%">
        개발
      </Label>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-400">Brand</span>
        <div className="flex items-center gap-3">
          <Label type="brand">기획</Label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-400">Secondary · Desktop</span>
        <div className="flex items-center gap-3">
          <Label type="secondary" size="desktop">
            텍스트
          </Label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-400">Secondary · Mobile</span>
        <div className="flex items-center gap-3">
          <Label type="secondary" size="mobile">
            활동명
          </Label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-400">
          Default · with description
        </span>
        <Label type="default" description="손아현, 손아현">
          기획
        </Label>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-400">Default · 단독</span>
        <Label type="default">기획</Label>
      </div>
    </div>
  ),
}
