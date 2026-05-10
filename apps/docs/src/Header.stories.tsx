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
    <div className="mx-auto w-[1280px] min-w-[1024px] max-w-[1440px]">
      <Header logo={<HeaderDesktopLogo />}>
        <HeaderNavigation href="#about">학회소개</HeaderNavigation>
        <HeaderNavigation href="#projects">프로젝트</HeaderNavigation>
        <HeaderNavigation href="#archive">32기 아카이브</HeaderNavigation>
        <HeaderNavigation href="#review">후기</HeaderNavigation>
        <HeaderNavigation href="#recruiting">리크루팅</HeaderNavigation>
      </Header>
    </div>
  ),
}

export const NavigationStates: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <HeaderNavigation state="default">텍스트</HeaderNavigation>
      <HeaderNavigation state="hovered">텍스트</HeaderNavigation>
      <HeaderNavigation state="pressed">텍스트</HeaderNavigation>
    </div>
  ),
}
