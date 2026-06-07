import {
  CancelMIcon,
  HamburgMIcon,
  HeaderDesktopLogo,
  HeaderMobileLogo,
} from "@kusitms.com/icons"
import { Header, HeaderNavigation } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  component: Header,
  tags: ["autodocs"],
  title: "Components/Header",
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

const navigationItems = [
  { href: "#about", label: "학회소개" },
  { href: "#projects", label: "프로젝트" },
  { href: "#archive", label: "32기 아카이브" },
  { href: "#review", label: "후기" },
  { href: "#recruiting", label: "리크루팅" },
]

export const Desktop: Story = {
  render: () => (
    <div className="mx-auto w-320 max-w-360 bg-fill-normal">
      <Header logo={<HeaderDesktopLogo />}>
        {navigationItems.map((item) => (
          <HeaderNavigation key={item.href} href={item.href}>
            {item.label}
          </HeaderNavigation>
        ))}
      </Header>
    </div>
  ),
}

export const Responsive: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-60 w-full bg-fill-normal">
      <Header
        className="mx-auto max-w-360"
        logo={<HeaderDesktopLogo />}
        mobileLogo={<HeaderMobileLogo />}
        menuIcon={<HamburgMIcon />}
        closeIcon={<CancelMIcon />}
      >
        {navigationItems.map((item) => (
          <HeaderNavigation key={item.href} href={item.href}>
            {item.label}
          </HeaderNavigation>
        ))}
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
