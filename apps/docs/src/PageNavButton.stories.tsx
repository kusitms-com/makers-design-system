import { PageNavButton } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Button/PageNav",
  component: PageNavButton,
  tags: ["autodocs"],
  args: {
    color: "light",
    direction: "next",
  },
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["light", "dark"],
    },
    direction: {
      control: { type: "select" },
      options: ["next", "prev"],
    },
  },
} satisfies Meta<typeof PageNavButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Dark: Story = {
  args: {
    color: "dark",
  },
}
