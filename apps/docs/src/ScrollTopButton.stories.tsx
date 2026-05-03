import { ScrollTopButton } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Button/ScrollTop",
  component: ScrollTopButton,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollTopButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
