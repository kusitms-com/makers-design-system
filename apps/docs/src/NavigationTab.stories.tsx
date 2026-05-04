import { NavigationTab, NavigationTabItem } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  component: NavigationTab,
  tags: ["autodocs"],
  title: "Components/NavigationTab",
} satisfies Meta<typeof NavigationTab>

export default meta

type Story = StoryObj<typeof meta>

export const SizeM: Story = {
  render: () => (
    <NavigationTab size="m">
      <NavigationTabItem active size="m">
        밋업 프로젝트
      </NavigationTabItem>
      <NavigationTabItem size="m">기업 연계 프로젝트</NavigationTabItem>
    </NavigationTab>
  ),
}

export const SizeS: Story = {
  render: () => (
    <NavigationTab size="s">
      <NavigationTabItem active size="s">
        라벨명
      </NavigationTabItem>
      <NavigationTabItem size="s">라벨명</NavigationTabItem>
    </NavigationTab>
  ),
}
