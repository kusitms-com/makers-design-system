import { CancelMIcon, HamburgMIcon, HeaderMobileLogo } from "@kusitms.com/icons"
import {
  HeaderMobile,
  HeaderMobileItem,
  HeaderMobileMenu,
} from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

const meta = {
  component: HeaderMobile,
  tags: ["autodocs"],
  title: "Components/HeaderMobile",
} satisfies Meta<typeof HeaderMobile>

export default meta

type Story = StoryObj<typeof meta>

const menuItems = ["학회소개", "프로젝트", "32기 아카이브", "후기", "리크루팅"]

export const Closed: Story = {
  render: () => (
    <div className="flex w-90 justify-center">
      <HeaderMobile
        logo={<HeaderMobileLogo />}
        menuIcon={<HamburgMIcon />}
        closeIcon={<CancelMIcon />}
        isOpen={false}
        className="w-80"
      />
    </div>
  ),
}

export const Open: Story = {
  render: () => (
    <div className="flex w-90 flex-col items-center">
      <HeaderMobile
        logo={<HeaderMobileLogo />}
        menuIcon={<HamburgMIcon />}
        closeIcon={<CancelMIcon />}
        isOpen
        className="w-80"
      />
      <HeaderMobileMenu className="w-80" isOpen>
        {menuItems.map((item) => (
          <HeaderMobileItem key={item}>{item}</HeaderMobileItem>
        ))}
      </HeaderMobileMenu>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="flex w-90 flex-col items-center">
        <HeaderMobile
          logo={<HeaderMobileLogo />}
          menuIcon={<HamburgMIcon />}
          closeIcon={<CancelMIcon />}
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          className="w-80"
        />
        <HeaderMobileMenu className="w-80" isOpen={isOpen}>
          {menuItems.map((item) => (
            <HeaderMobileItem key={item}>{item}</HeaderMobileItem>
          ))}
        </HeaderMobileMenu>
      </div>
    )
  },
}

export const LongMenuItem: Story = {
  render: () => (
    <div className="flex w-80 flex-col items-center">
      <HeaderMobile
        className="w-full"
        logo={<HeaderMobileLogo />}
        menuIcon={<HamburgMIcon />}
        closeIcon={<CancelMIcon />}
        isOpen
      />
      <HeaderMobileMenu className="w-full" isOpen>
        <HeaderMobileItem>아주 긴 모바일 내비게이션 메뉴 이름</HeaderMobileItem>
      </HeaderMobileMenu>
    </div>
  ),
}
