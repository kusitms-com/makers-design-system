import { Button } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Button/Default",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "텍스트",
    size: "desktop",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["desktop", "mobile"],
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const AllStates: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">Default</span>
        <Button {...args}>텍스트</Button>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">Disabled</span>
        <Button {...args} disabled>
          텍스트
        </Button>
      </div>
    </div>
  ),
}
