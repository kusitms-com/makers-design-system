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
    <div className="flex gap-8">
      <div className="flex flex-col gap-4">
        <span className="text-xs text-gray-400 font-semibold">Desktop</span>
        <div className="flex flex-col gap-3 items-start">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Default</span>
            <Button size="desktop">텍스트</Button>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">No Icon</span>
            <Button size="desktop" showIcon={false}>
              텍스트
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Disabled</span>
            <Button size="desktop" disabled>
              텍스트
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs text-gray-400 font-semibold">Mobile</span>
        <div className="flex flex-col gap-3 items-start">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Default</span>
            <Button size="mobile">텍스트</Button>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">No Icon</span>
            <Button size="mobile" showIcon={false}>
              텍스트
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Disabled</span>
            <Button size="mobile" disabled>
              텍스트
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
}
