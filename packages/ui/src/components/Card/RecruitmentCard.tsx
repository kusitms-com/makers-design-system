import type { SVGProps } from "react"

type RecruitmentCardType = "default" | "titled"

export type RecruitmentCardProps = {
  type: RecruitmentCardType
  graphic: React.ComponentType<SVGProps<SVGSVGElement>>
  title?: string
  description: string
}

type VariantStyle = {
  container: string
  content: (
    props: Pick<RecruitmentCardProps, "title" | "description">,
  ) => React.ReactNode
}

const variantStyles: Record<RecruitmentCardType, VariantStyle> = {
  default: {
    container: "w-75 gap-5 px-4 pt-7 pb-9.5 pt-8.5 lg:pb-8.5 lg:pt-7.5",
    content: ({ description }) => (
      <p className="text-label-14sb text-label-normal lg:text-body-16sb text-center whitespace-pre-line">
        {description}
      </p>
    ),
  },
  titled: {
    container: "w-75 lg:w-55 gap-5 px-4 py-5 lg:pb-6.5",
    content: ({ title, description }) => (
      <div className="flex flex-col items-center gap-5 text-center lg:gap-4.5">
        <div className="flex flex-col gap-3 lg:gap-2.5">
          <p className="text-brand-primary text-body-16b lg:text-body-18b">
            {title}
          </p>
          <div className="w-3.5 h-[1.5px] bg-line-normal rounded-full mx-auto" />
          <p className="text-label-normal text-label-14m whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
    ),
  },
}

export function RecruitmentCard({
  type,
  graphic: Graphic,
  title,
  description,
}: RecruitmentCardProps) {
  const { container, content } = variantStyles[type]

  return (
    <div
      className={`flex flex-col items-center rounded-2xl bg-fill-primary ${container}`}
    >
      <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-fill-normal">
        <Graphic />
      </div>
      {content({ title, description })}
    </div>
  )
}
