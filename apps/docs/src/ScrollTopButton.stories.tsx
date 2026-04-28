import { ScrollTopButton } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Button/ScrollTop",
  component: ScrollTopButton,
  tags: ["autodocs"],
  args: {
    size: "desktop",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["desktop", "mobile"],
    },
  },
} satisfies Meta<typeof ScrollTopButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllStates: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start gap-2">
        <span className="text-xs text-gray-400">Desktop</span>
        <ScrollTopButton {...args} size="desktop" />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-xs text-gray-400">Mobile</span>
        <ScrollTopButton {...args} size="mobile" />
      </div>
    </div>
  ),
}
