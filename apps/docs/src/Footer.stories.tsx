import {
  BlogIcon,
  CafeIcon,
  FooterDesktopLogo,
  FooterMobileLogo,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  ScrollTopIcon,
  YoutubeIcon,
} from "@kusitms.com/icons"
import { Footer } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Components/Footer",
} satisfies Meta<typeof Footer>

export default meta

type Story = StoryObj<typeof meta>

const SocialIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="flex size-9 items-center justify-center rounded-full bg-[#eff4ff] p-1.5">
    {children}
  </span>
)

const contactIcons = (
  <>
    <a aria-label="Mail" href="mailto:hello@example.com">
      <SocialIcon>
        <MailIcon className="size-6" />
      </SocialIcon>
    </a>
    <a aria-label="Instagram" href="https://instagram.com">
      <SocialIcon>
        <InstagramIcon className="size-6" />
      </SocialIcon>
    </a>
    <a aria-label="YouTube" href="https://youtube.com">
      <SocialIcon>
        <YoutubeIcon className="size-6" />
      </SocialIcon>
    </a>
    <a aria-label="GitHub" href="https://github.com">
      <SocialIcon>
        <GithubIcon className="size-6" />
      </SocialIcon>
    </a>
    <a aria-label="Blog" href="https://example.com/blog">
      <SocialIcon>
        <BlogIcon className="size-6" />
      </SocialIcon>
    </a>
    <a aria-label="Cafe" href="https://example.com/cafe">
      <SocialIcon>
        <CafeIcon className="size-6" />
      </SocialIcon>
    </a>
    <a aria-label="LinkedIn" href="https://linkedin.com">
      <SocialIcon>
        <LinkedinIcon className="size-5" />
      </SocialIcon>
    </a>
  </>
)

export const Desktop: Story = {
  render: () => (
    <div className="w-full overflow-x-auto bg-white">
      <div className="mx-auto w-[1280px]">
        <Footer
          device="desktop"
          logo={<FooterDesktopLogo />}
          bylawsHref="https://example.com/bylaws"
          contactIcons={contactIcons}
        />
      </div>
    </div>
  ),
}

export const Mobile: Story = {
  render: () => (
    <div className="w-[320px]">
      <Footer
        device="mobile"
        logo={<FooterMobileLogo />}
        bylawsHref="https://example.com/bylaws"
        contactIcons={contactIcons}
        scrollTopButton={
          <button
            type="button"
            aria-label="Scroll to top"
            className="flex items-center py-2"
          >
            <ScrollTopIcon className="size-10" />
          </button>
        }
      />
    </div>
  ),
}
