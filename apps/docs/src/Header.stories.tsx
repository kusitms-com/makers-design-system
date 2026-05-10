import { HeaderDesktopLogo } from "@kusitms.com/icons"
import { Header, HeaderNavigation } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  component: Header,
  tags: ["autodocs"],
  title: "Components/Header",
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {
  render: () => (
    <Header logo={<HeaderDesktopLogo />}>
      <HeaderNavigation href="#about">학회소개</HeaderNavigation>
      <HeaderNavigation href="#projects">프로젝트</HeaderNavigation>
      <HeaderNavigation href="#archive">32기 아카이브</HeaderNavigation>
      <HeaderNavigation href="#review">후기</HeaderNavigation>
      <HeaderNavigation href="#recruiting">리크루팅</HeaderNavigation>
    </Header>
  ),
}

export const NavigationStates: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <HeaderNavigation state="default">Default</HeaderNavigation>
      <HeaderNavigation state="hovered">Hovered</HeaderNavigation>
      <HeaderNavigation state="pressed">Pressed</HeaderNavigation>
    </div>
  ),
}
