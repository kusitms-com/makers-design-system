import { FilterItem, NavigationFilter } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  component: NavigationFilter,
  tags: ["autodocs"],
  title: "Components/NavigationFilter",
} satisfies Meta<typeof NavigationFilter>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {
  render: () => (
    <NavigationFilter device="desktop">
      <FilterItem active>전체</FilterItem>
      <FilterItem>기획</FilterItem>
      <FilterItem>디자인</FilterItem>
      <FilterItem>개발</FilterItem>
    </NavigationFilter>
  ),
}

export const Mobile: Story = {
  render: () => (
    <NavigationFilter device="mobile">
      <FilterItem active>전체</FilterItem>
      <FilterItem>기획</FilterItem>
      <FilterItem>디자인</FilterItem>
      <FilterItem>개발</FilterItem>
    </NavigationFilter>
  ),
}

export const Responsive: Story = {
  render: () => (
    <NavigationFilter>
      <FilterItem active>전체</FilterItem>
      <FilterItem>기획</FilterItem>
      <FilterItem>디자인</FilterItem>
      <FilterItem>개발</FilterItem>
    </NavigationFilter>
  ),
}

export const Website: Story = {
  render: () => (
    <NavigationFilter device="website">
      <FilterItem active>기획</FilterItem>
      <FilterItem>디자인</FilterItem>
      <FilterItem>프론트</FilterItem>
      <FilterItem>백엔드</FilterItem>
    </NavigationFilter>
  ),
}
