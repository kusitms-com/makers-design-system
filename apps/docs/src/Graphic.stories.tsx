import {
  BookGraphic,
  CalendarGraphic,
  ChatGraphic,
  FileGraphic,
  MedalGraphic,
  PeopleGraphic,
  SnowGraphic,
  StarGraphic,
  TrophyGraphic,
} from "@kusitms.com/icons"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

const graphics = {
  BookGraphic,
  CalendarGraphic,
  ChatGraphic,
  FileGraphic,
  MedalGraphic,
  PeopleGraphic,
  SnowGraphic,
  StarGraphic,
  TrophyGraphic,
}

const meta = {
  title: "Assets/Graphic",
  tags: ["autodocs"],
} satisfies Meta<IconProps>

export default meta
type Story = StoryObj<Meta<IconProps>>

export const Gallery: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-8">
      {Object.entries(graphics).map(([name, Graphic]) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Graphic {...args} />
          <span className="text-xs">{name}</span>
        </div>
      ))}
    </div>
  ),
}
