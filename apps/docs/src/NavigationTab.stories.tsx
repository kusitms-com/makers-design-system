import { NavigationTab, NavigationTabItem } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  component: NavigationTab,
  tags: ["autodocs"],
  title: "Components/NavigationTab",
} satisfies Meta<typeof NavigationTab>

export default meta

type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <div className="flex w-[1240px] flex-col gap-20 bg-white">
      <NavigationTab size="m">
        <NavigationTabItem active size="m">
          밋업 프로젝트
        </NavigationTabItem>
        <NavigationTabItem size="m">기업 연계 프로젝트</NavigationTabItem>
      </NavigationTab>
      <NavigationTab size="s">
        <NavigationTabItem active size="s">
          라벨명
        </NavigationTabItem>
        <NavigationTabItem size="s">라벨명</NavigationTabItem>
      </NavigationTab>
    </div>
  ),
}

export const SizeM: Story = {
  render: () => (
    <div className="w-[1240px] bg-white">
      <NavigationTab size="m">
        <NavigationTabItem active size="m">
          밋업 프로젝트
        </NavigationTabItem>
        <NavigationTabItem size="m">기업 연계 프로젝트</NavigationTabItem>
      </NavigationTab>
    </div>
  ),
}

export const SizeS: Story = {
  render: () => (
    <div className="w-[1024px] bg-white">
      <NavigationTab size="s">
        <NavigationTabItem active size="s">
          라벨명
        </NavigationTabItem>
        <NavigationTabItem size="s">라벨명</NavigationTabItem>
      </NavigationTab>
    </div>
  ),
}
