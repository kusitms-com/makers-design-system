import {
  Favicon16,
  Favicon32,
  Favicon64,
  Favicon128,
  Favicon256,
} from "@kusitms.com/icons"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

const favicons = {
  Favicon16,
  Favicon32,
  Favicon64,
  Favicon128,
  Favicon256,
}

const meta = {
  title: "Assets/Favicon",
  tags: ["autodocs"],
} satisfies Meta<IconProps>

export default meta
type Story = StoryObj<Meta<IconProps>>

export const Gallery: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-end gap-6">
      {Object.entries(favicons).map(([name, Favicon]) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Favicon {...args} />
          <span className="text-xs">{name}</span>
        </div>
      ))}
    </div>
  ),
}
