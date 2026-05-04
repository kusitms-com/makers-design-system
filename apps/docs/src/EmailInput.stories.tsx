import { EmailInput } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

const meta = {
  title: "EmailInput/Default",
  component: EmailInput,
  tags: ["autodocs"],
  args: {
    value: "",
    onChange: () => {},
    buttonLabel: "알림 받기",
    placeholder: "텍스트를 입력하세요",
  },
  argTypes: {
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    disabled: { control: { type: "boolean" } },
    buttonLabel: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
  },
} satisfies Meta<typeof EmailInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    layout: "padded",
  },
  render: (args) => {
    const [value, setValue] = useState("")
    return (
      <div className="flex min-h-screen items-center justify-center">
        <EmailInput
          {...args}
          value={value}
          onChange={setValue}
          onSubmit={(v) => alert(`제출: ${v}`)}
        />
      </div>
    )
  },
}
