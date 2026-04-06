import { ArrowRightIcon } from "@kusitms.com/icons"
import { Button } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  args: {
    children: "Get Started",
  },
  component: Button,
  tags: ["autodocs"],
  title: "Components/Button",
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
}

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <span className="mr-2">Continue</span>
      <ArrowRightIcon className="size-4" />
    </Button>
  ),
}
