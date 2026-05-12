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
    <div className="flex w-310 flex-col gap-20 bg-fill-normal">
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
    <div className="w-310 bg-fill-normal">
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
    <div className="w-256 bg-fill-normal">
      <NavigationTab size="s">
        <NavigationTabItem active size="s">
          라벨명
        </NavigationTabItem>
        <NavigationTabItem size="s">라벨명</NavigationTabItem>
      </NavigationTab>
    </div>
  ),
}
