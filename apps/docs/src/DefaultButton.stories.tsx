import { DefaultButton } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Components/Button/Default",
  component: DefaultButton,
  tags: ["autodocs"],
  args: {
    children: "저장하기",
    size: "m",
    variant: "strong",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["xl", "l", "m", "s"] },
    variant: {
      control: "inline-radio",
      options: ["strong", "primary", "outlined", "error", "disabled"],
    },
  },
} satisfies Meta<typeof DefaultButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

const sizes = ["xl", "l", "m", "s"] as const
const variants = ["strong", "primary", "disabled", "error", "outlined"] as const

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-4">
          {variants.map((variant) => (
            <DefaultButton key={variant} size={size} variant={variant}>
              {variant === "error" ? "삭제하기" : "저장하기"}
            </DefaultButton>
          ))}
        </div>
      ))}
    </div>
  ),
}
