import {
  ArrowRightIcon,
  ArrowRightMIcon,
  BlogIcon,
  CafeIcon,
  CancelLIcon,
  CancelMIcon,
  CancelSIcon,
  CheckIcon,
  GithubIcon,
  HamburgMIcon,
  HomeIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  RightSIcon,
  ScrollTopIcon,
  ToggleCloseMIcon,
  ToggleCloseSIcon,
  ToggleCloseXsIcon,
  ToggleOpenMIcon,
  ToggleOpenSIcon,
  ToggleOpenXsIcon,
  YoutubeIcon,
} from "@kusitms.com/icons"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement> & { color?: string }

const icons = {
  ArrowRightIcon,
  ArrowRightMIcon,
  BlogIcon,
  CafeIcon,
  CancelLIcon,
  CancelMIcon,
  CancelSIcon,
  CheckIcon,
  GithubIcon,
  HamburgMIcon,
  HomeIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  RightSIcon,
  ScrollTopIcon,
  ToggleCloseMIcon,
  ToggleCloseSIcon,
  ToggleCloseXsIcon,
  ToggleOpenMIcon,
  ToggleOpenSIcon,
  ToggleOpenXsIcon,
  YoutubeIcon,
}

const meta = {
  title: "Assets/Icon",
  tags: ["autodocs"],
  argTypes: {
    width: { control: "text", description: "너비" },
    height: { control: "text", description: "높이" },
    color: { control: "color", description: "색상" },
  },
  args: {
    width: 24,
    height: 24,
  },
} satisfies Meta<IconProps>

export default meta
type Story = StoryObj<Meta<IconProps>>

export const Gallery: Story = {
  render: ({ color, ...args }) => (
    <div className="flex flex-wrap gap-6">
      {Object.entries(icons).map(([name, Icon]) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon style={{ color }} {...args} />
          <span className="text-xs">{name}</span>
        </div>
      ))}
    </div>
  ),
}
