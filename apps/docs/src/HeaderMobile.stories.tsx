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
    <div className="w-[360px]">
      <HeaderMobile
        logo={<HeaderMobileLogo />}
        menuIcon={<HamburgMIcon />}
        closeIcon={<CancelMIcon />}
        isOpen={false}
      />
    </div>
  ),
}

export const Open: Story = {
  render: () => (
    <div className="w-[360px]">
      <HeaderMobile
        logo={<HeaderMobileLogo />}
        menuIcon={<HamburgMIcon />}
        closeIcon={<CancelMIcon />}
        isOpen
      />
      <HeaderMobileMenu isOpen>
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
      <div className="w-[360px]">
        <HeaderMobile
          logo={<HeaderMobileLogo />}
          menuIcon={<HamburgMIcon />}
          closeIcon={<CancelMIcon />}
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        />
        <HeaderMobileMenu isOpen={isOpen}>
          {menuItems.map((item) => (
            <HeaderMobileItem key={item}>{item}</HeaderMobileItem>
          ))}
        </HeaderMobileMenu>
      </div>
    )
  },
}
