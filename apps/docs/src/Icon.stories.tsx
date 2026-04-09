import * as Icons from "@kusitms.com/icons"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement> & { color?: string }

const meta = {
  title: "Icons",
  component: Icons.ArrowRightIcon,
  tags: ["autodocs"],
  argTypes: {
    width: { control: "text", description: "너비" },
    height: { control: "text", description: "높이" },
    className: { control: "text", description: "CSS 클래스" },
    color: { control: "color", description: "색상" },
  },
  args: {
    width: 24,
    height: 24,
  },
} satisfies Meta<IconProps>

export default meta
type Story = StoryObj<typeof meta>

const makeStory = (
  Icon: React.ComponentType<SVGProps<SVGSVGElement>>,
): Story => ({
  render: ({ color, ...args }) => <Icon style={{ color }} {...args} />,
})

export const ArrowRight: Story = makeStory(Icons.ArrowRightIcon)
export const Check: Story = makeStory(Icons.CheckIcon)
export const Home: Story = makeStory(Icons.HomeIcon)
export const Kusitms: Story = makeStory(Icons.KusitmsIcon)
