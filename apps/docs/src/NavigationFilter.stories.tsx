import { FilterItem, NavigationFilter } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  component: NavigationFilter,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Components/NavigationFilter",
} satisfies Meta<typeof NavigationFilter>

export default meta

type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <div className="w-full bg-fill-normal">
      <NavigationFilter>
        <FilterItem active>전체</FilterItem>
        <FilterItem>기획</FilterItem>
        <FilterItem>디자인</FilterItem>
        <FilterItem>개발</FilterItem>
      </NavigationFilter>
    </div>
  ),
}

export const DesktopMode: Story = {
  render: () => (
    <NavigationFilter device="desktop">
      <FilterItem active>전체</FilterItem>
      <FilterItem>기획</FilterItem>
      <FilterItem>디자인</FilterItem>
      <FilterItem>개발</FilterItem>
    </NavigationFilter>
  ),
}

export const MobileMode: Story = {
  render: () => (
    <NavigationFilter device="mobile">
      <FilterItem active>전체</FilterItem>
      <FilterItem>기획</FilterItem>
      <FilterItem>디자인</FilterItem>
      <FilterItem>개발</FilterItem>
    </NavigationFilter>
  ),
}
