import { Button } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Components/Button/Default",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "텍스트",
  },
  argTypes: {
    showIcon: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3 items-start">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">Default</span>
        <Button>텍스트</Button>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">No Icon</span>
        <Button showIcon={false}>텍스트</Button>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">Disabled</span>
        <Button disabled>텍스트</Button>
      </div>
    </div>
  ),
}
