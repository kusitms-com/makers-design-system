import { EmailInput } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "EmailInput/Default",
  component: EmailInput,
  tags: ["autodocs"],
  args: {
    value: "",
    onChange: () => {},
    size: "desktop",
    buttonLabel: "알림 받기",
    placeholder: "텍스트를 입력하세요",
    isSubmitEnabled: undefined,
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["desktop", "mobile"],
    },
    disabled: { control: { type: "boolean" } },
    isSubmitEnabled: { control: { type: "boolean" } },
    buttonLabel: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
  },
} satisfies Meta<typeof EmailInput>

export default meta

type Story = StoryObj<typeof meta>

export const DesktopDefault: Story = {
  args: {
    size: "desktop",
    value: "",
  },
}

export const DesktopTyping: Story = {
  args: {
    size: "desktop",
    value: "hello@example.com",
  },
}

export const MobileDefault: Story = {
  args: {
    size: "mobile",
    value: "",
  },
}

export const MobileTyping: Story = {
  args: {
    size: "mobile",
    value: "hello@example.com",
  },
}

export const Disabled: Story = {
  args: {
    size: "desktop",
    value: "hello@example.com",
    disabled: true,
  },
}
