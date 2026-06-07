import { NavigationButton } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

function BehanceBadge() {
  return (
    <div className="inline-flex size-5 items-center justify-center rounded-sm bg-brand-primary text-caption-12sb leading-none text-static-white">
      Be
    </div>
  )
}

const meta = {
  title: "Components/Button/Navigation",
  component: NavigationButton,
  tags: ["autodocs"],
  args: {
    children: "Behance",
    icon: <BehanceBadge />,
    showArrow: true,
  },
  argTypes: {
    showArrow: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof NavigationButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3 items-start">
      <div className="flex flex-col gap-1">
        <span className="text-caption-12r text-label-disable">With Icon</span>
        <NavigationButton icon={<BehanceBadge />}>Behance</NavigationButton>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-caption-12r text-label-disable">
          Without Icon
        </span>
        <NavigationButton>Behance</NavigationButton>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-caption-12r text-label-disable">
          Without Arrow
        </span>
        <NavigationButton icon={<BehanceBadge />} showArrow={false}>
          Behance
        </NavigationButton>
      </div>
    </div>
  ),
}
