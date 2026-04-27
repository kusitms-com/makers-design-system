import {
  FooterDesktopLogo,
  FooterMobileLogo,
  HeaderDesktopLogo,
  HeaderMobileLogo,
} from "@kusitms.com/icons"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

const logos = {
  HeaderDesktopLogo,
  HeaderMobileLogo,
  FooterDesktopLogo,
  FooterMobileLogo,
}

const meta = {
  title: "Assets/Logo",
  tags: ["autodocs"],
} satisfies Meta<IconProps>

export default meta
type Story = StoryObj<Meta<IconProps>>

export const Gallery: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      {Object.entries(logos).map(([name, Logo]) => (
        <div key={name} className="flex flex-col gap-2">
          <Logo {...args} />
          <span className="text-xs">{name}</span>
        </div>
      ))}
    </div>
  ),
}
