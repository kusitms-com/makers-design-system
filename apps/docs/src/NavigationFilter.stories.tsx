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
      <FilterItem active device="desktop">
        전체
      </FilterItem>
      <FilterItem device="desktop">기획</FilterItem>
      <FilterItem device="desktop">디자인</FilterItem>
      <FilterItem device="desktop">개발</FilterItem>
    </NavigationFilter>
  ),
}

export const Mobile: Story = {
  render: () => (
    <NavigationFilter device="mobile">
      <FilterItem active device="mobile">
        전체
      </FilterItem>
      <FilterItem device="mobile">기획</FilterItem>
      <FilterItem device="mobile">디자인</FilterItem>
      <FilterItem device="mobile">개발</FilterItem>
    </NavigationFilter>
  ),
}
