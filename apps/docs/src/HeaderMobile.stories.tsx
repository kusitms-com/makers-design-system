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
    <div className="flex w-[360px] justify-center">
      <HeaderMobile
        logo={<HeaderMobileLogo />}
        menuIcon={<HamburgMIcon />}
        closeIcon={<CancelMIcon />}
        isOpen={false}
        className="w-[320px]"
      />
    </div>
  ),
}

export const Open: Story = {
  render: () => (
    <div className="flex w-[360px] flex-col items-center">
      <HeaderMobile
        logo={<HeaderMobileLogo />}
        menuIcon={<HamburgMIcon />}
        closeIcon={<CancelMIcon />}
        isOpen
        className="w-[320px]"
      />
      <HeaderMobileMenu className="w-[320px]" isOpen>
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
      <div className="flex w-[360px] flex-col items-center">
        <HeaderMobile
          logo={<HeaderMobileLogo />}
          menuIcon={<HamburgMIcon />}
          closeIcon={<CancelMIcon />}
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          className="w-[320px]"
        />
        <HeaderMobileMenu className="w-[320px]" isOpen={isOpen}>
          {menuItems.map((item) => (
            <HeaderMobileItem key={item}>{item}</HeaderMobileItem>
          ))}
        </HeaderMobileMenu>
      </div>
    )
  },
}
