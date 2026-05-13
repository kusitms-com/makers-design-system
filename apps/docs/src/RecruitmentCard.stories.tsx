import {
  BookGraphic,
  CalendarGraphic,
  ChatGraphic,
  FileGraphic,
  MedalGraphic,
  PeopleGraphic,
  SnowGraphic,
  StarGraphic,
} from "@kusitms.com/icons"
import { RecruitmentCard } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const graphicOptions = {
  BookGraphic,
  CalendarGraphic,
  ChatGraphic,
  FileGraphic,
  MedalGraphic,
  PeopleGraphic,
  SnowGraphic,
  StarGraphic,
}

const meta = {
  args: {
    graphic: BookGraphic,
    title: "텍스트",
    description: "줄바꿈을 고려하여\n최대 두 줄까지 입력해주세요",
    type: "default",
  },
  argTypes: {
    graphic: {
      control: { type: "select" },
      options: Object.keys(graphicOptions),
      mapping: graphicOptions,
    },
    type: {
      control: { type: "radio" },
      options: ["default", "titled"],
    },
  },
  component: RecruitmentCard,
  tags: ["autodocs"],
  title: "Components/Card/RecruitmentCard",
} satisfies Meta<typeof RecruitmentCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: "default",
  },
}

export const Titled: Story = {
  args: {
    type: "titled",
    title: "텍스트",
  },
}

export const AllVariants: Story = {
  args: { graphic: BookGraphic, description: "", type: "default" },
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <RecruitmentCard
        type="default"
        graphic={BookGraphic}
        description={"줄바꿈을 고려하여\n최대 두 줄까지 입력해주세요"}
      />
      <RecruitmentCard
        type="titled"
        graphic={CalendarGraphic}
        title="텍스트"
        description={"줄바꿈을 고려하여\n최대 두 줄까지 입력해주세요"}
      />
      <RecruitmentCard
        type="default"
        graphic={ChatGraphic}
        description={"줄바꿈을 고려하여\n최대 두 줄까지 입력해주세요"}
      />
      <RecruitmentCard
        type="titled"
        graphic={StarGraphic}
        title="텍스트"
        description={"줄바꿈을 고려하여\n최대 두 줄까지 입력해주세요"}
      />
    </div>
  ),
}

export const GraphicVariants: Story = {
  args: { graphic: BookGraphic, description: "", type: "default" },
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          ["BookGraphic", BookGraphic],
          ["CalendarGraphic", CalendarGraphic],
          ["ChatGraphic", ChatGraphic],
          ["FileGraphic", FileGraphic],
          ["MedalGraphic", MedalGraphic],
          ["PeopleGraphic", PeopleGraphic],
          ["SnowGraphic", SnowGraphic],
          ["StarGraphic", StarGraphic],
        ] as const
      ).map(([name, Graphic], i) => (
        <RecruitmentCard
          key={name}
          type={i % 2 === 0 ? "default" : "titled"}
          graphic={Graphic}
          title="텍스트"
          description={"줄바꿈을 고려하여\n최대 두 줄까지 입력해주세요"}
        />
      ))}
    </div>
  ),
}
