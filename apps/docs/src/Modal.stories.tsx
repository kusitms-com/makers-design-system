import { Modal, PageNavButton } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

const meta = {
  title: "Modal/Default",
  component: Modal,
  tags: ["autodocs"],
  args: {
    isOpen: true,
    onClose: () => {},
    name: "디어케이",
    th: 31,
    type: "WEB",
    imageUrl: "https://placehold.co/480x240/ffcdd2/c62828?text=Dear.K",
    description:
      "디어케이는 레터링 케이크로 추억을 만들고자 하는 고객(피커)과 추억을 함께 완성하는 가게(메이커)를 이어줍니다. 피커에겐 쉬운 가게·디자인 탐색부터 주문까지의 과정을 메이커에겐 주문 혼선을 줄이고 가게를 홍보할 수 있는 환경이 되어줘요. 결과적으로 서로에게 핏-하게 연결되어, 피커는 추억에, 메이커는 케이크 제작에 집중할 수 있어요.",
    teamRoles: [
      { role: "기획", members: ["손아현", "손아현"] },
      { role: "디자인", members: ["손아현", "손아현"] },
      { role: "프론트엔드", members: ["손아현", "손아현"] },
      { role: "백엔드", members: ["손아현", "손아현"] },
    ],
    links: [
      { type: "behance", label: "Behance", url: "https://behance.net" },
      { type: "github", label: "Github", url: "https://github.com" },
      { type: "service", label: "서비스 바로가기", url: "https://example.com" },
    ],
  },
  argTypes: {
    isOpen: { control: { type: "boolean" } },
    type: { control: { type: "select" }, options: ["WEB", "APP"] },
    name: { control: { type: "text" } },
    th: { control: { type: "number" } },
    imageUrl: { control: { type: "text" } },
    description: { control: { type: "text" } },
    onClose: { table: { disable: true } },
    teamRoles: { table: { disable: true } },
    links: { table: { disable: true } },
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true)
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#4a4a55]">
        <div className="absolute bottom-8 left-0 right-0 flex justify-between px-6 z-40">
          <PageNavButton direction="prev" color="light" />
          <PageNavButton direction="next" color="light" />
        </div>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-lg bg-fill-normal px-4 py-2 text-label-netural text-label-14sb cursor-pointer z-10"
          >
            모달 열기
          </button>
        )}
      </div>
    )
  },
}

export const App: Story = {
  args: {
    type: "APP",
    name: "모각작",
    th: 32,
    imageUrl: "https://placehold.co/480x240/e8f5e9/2e7d32?text=App",
    description:
      "함께 집중하는 시간, 공유 타이머로 지속적인 몰입을 경험할 수 있게 하는 서비스입니다.",
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true)
    return (
      <div className="flex min-h-screen items-center justify-center bg-fill-alternative">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-brand-primary px-4 py-2 text-static-white text-label-14sb cursor-pointer"
        >
          모달 열기
        </button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    )
  },
}

export const LinksOnly: Story = {
  args: {
    teamRoles: [],
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true)
    return (
      <div className="flex min-h-screen items-center justify-center bg-fill-alternative">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-brand-primary px-4 py-2 text-static-white text-label-14sb cursor-pointer"
        >
          모달 열기
        </button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    )
  },
}
