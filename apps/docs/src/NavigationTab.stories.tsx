import { NavigationTab, NavigationTabItem } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  component: NavigationTab,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Components/NavigationTab",
} satisfies Meta<typeof NavigationTab>

export default meta

type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <div className="w-full bg-fill-normal">
      <NavigationTab>
        <NavigationTabItem active>밋업 프로젝트</NavigationTabItem>
        <NavigationTabItem>기업 연계 프로젝트</NavigationTabItem>
      </NavigationTab>
    </div>
  ),
}

export const DesktopSize: Story = {
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

export const CompactSize: Story = {
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

export const NarrowLongLabels: Story = {
  render: () => (
    <div className="w-80 bg-fill-normal">
      <NavigationTab size="s">
        <NavigationTabItem active>아주 긴 탭 이름입니다</NavigationTabItem>
        <NavigationTabItem>두 번째 긴 탭 이름입니다</NavigationTabItem>
        <NavigationTabItem>세 번째</NavigationTabItem>
      </NavigationTab>
    </div>
  ),
}
