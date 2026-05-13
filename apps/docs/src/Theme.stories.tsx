import { BottomGradient } from "@kusitms.com/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Theme/BottomGradient",
  component: BottomGradient,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f7f7f8" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
  argTypes: {
    height: {
      control: { type: "range", min: 20, max: 200, step: 1 },
      description: "그라데이션 높이 (px)",
    },
  },
  args: {
    height: 54,
  },
} satisfies Meta<typeof BottomGradient>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 모달 하단에 오버레이되어 스크롤 콘텐츠를 자연스럽게 페이드아웃시킵니다.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-83.75 h-144 rounded-2xl overflow-hidden bg-fill-normal relative shadow-md">
      <div className="h-full overflow-y-auto px-5 pt-5 pb-20 space-y-4">
        <div className="flex items-center gap-3">
          <p className="text-label-normal text-headline-20b">디어케이</p>
          <div className="flex gap-1.5">
            <span className="bg-fill-primary text-brand-primary text-label-14sb px-4 py-1.25 rounded-md">
              31기
            </span>
            <span className="bg-fill-primary text-brand-primary text-label-14sb px-4 py-1.25 rounded-md">
              WEB
            </span>
          </div>
        </div>
        <div className="h-41.5 rounded-xl border border-line-neutral bg-gradient-to-br from-blue-5 to-blue-10" />
        <div className="space-y-1">
          <p className="text-label-netural text-body-16b">프로젝트 설명</p>
          <p className="text-label-light text-body-16r">
            디어케이는 레터링 케이크로 추억을 만들고자 하는 고객(피커)과 추억을
            함께 완성하는 가게(메이커)를 이어줍니다. 피커에겐 쉬운 가게·디자인
            탐색부터 주문까지의 과정을 메이커에겐 주문 혼선을 줄이고 가게를
            홍보할 수 있는 환경이 되어줘요. 결과적으로 서로에게 핏-하게
            연결되어, 피커는 추억에, 메이커는 케이크 제작에 집중할 수 있어요.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-label-netural text-body-16b">프로젝트 팀원</p>
          <div className="space-y-1.5">
            {[
              { part: "기획", names: "손아현, 손아현" },
              { part: "디자인", names: "손아현, 손아현" },
              { part: "프론트엔드", names: "손아현, 손아현" },
              { part: "백엔드", names: "손아현, 손아현" },
            ].map(({ part, names }) => (
              <div key={part} className="flex items-center gap-2.5">
                <span className="bg-fill-netural text-label-normal text-label-14sb px-0 py-1.25 rounded w-20 text-center">
                  {part}
                </span>
                <span className="text-label-alternative text-label-14m">
                  {names}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-label-netural text-body-16b">링크</p>
          <div className="space-y-3">
            {["Behance", "Github", "서비스 바로가기"].map((link) => (
              <div
                key={link}
                className="flex items-center justify-between bg-fill-netural rounded-lg pl-3 pr-2 py-2"
              >
                <span className="text-label-netural text-body-16m">{link}</span>
                <span className="text-label-alternative text-caption-12r">
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomGradient {...args} />
    </div>
  ),
}
