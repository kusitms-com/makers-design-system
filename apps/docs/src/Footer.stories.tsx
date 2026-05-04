import { FooterDesktopLogo } from "@kusitms.com/icons"
import { Footer } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  component: Footer,
  tags: ["autodocs"],
  title: "Components/Footer",
} satisfies Meta<typeof Footer>

export default meta

type Story = StoryObj<typeof meta>

const SocialIcon = ({ children }: { children: string }) => (
  <div className="flex size-9 items-center justify-center rounded-full bg-[var(--fill-primary)] p-1.5">
    <span className="text-[12px]">{children}</span>
  </div>
)

export const Desktop: Story = {
  render: () => (
    <Footer
      logo={<FooterDesktopLogo />}
      links={
        <span className="font-['Pretendard',sans-serif] text-[16px] font-semibold leading-[24px] tracking-[-0.04px] text-[var(--label-normal)] underline">
          학회정관
        </span>
      }
      contactIcons={
        <>
          <SocialIcon>📧</SocialIcon>
          <SocialIcon>📷</SocialIcon>
          <SocialIcon>▶️</SocialIcon>
          <SocialIcon>🐙</SocialIcon>
          <SocialIcon>📝</SocialIcon>
          <SocialIcon>💬</SocialIcon>
        </>
      }
    />
  ),
}
