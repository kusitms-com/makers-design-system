import { NavigationButton } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

function BehanceBadge() {
  return (
    <div className="inline-flex size-5 items-center justify-center rounded-sm bg-[#2F6FED] text-[9px] font-semibold leading-none text-white">
      Be
    </div>
  )
}

const meta = {
  title: "Button/Navigation",
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
        <span className="text-xs text-gray-400">With Icon</span>
        <NavigationButton icon={<BehanceBadge />}>Behance</NavigationButton>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">Without Icon</span>
        <NavigationButton>Behance</NavigationButton>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">Without Arrow</span>
        <NavigationButton icon={<BehanceBadge />} showArrow={false}>
          Behance
        </NavigationButton>
      </div>
    </div>
  ),
}
