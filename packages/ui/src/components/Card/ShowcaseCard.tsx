type ShowcaseCardType = "WEB" | "APP"

export type ShowcaseCardProps = {
  name: string
  description: string
  th: number
  isMeetup?: boolean
  type: ShowcaseCardType
  imageUrl: string
}

export function ShowcaseCard({
  name,
  description,
  th,
  isMeetup = false,
  type,
  imageUrl,
}: ShowcaseCardProps) {
  return (
    <div className="flex w-85.75 lg:w-96 shrink-0 self-start flex-col rounded-2xl bg-fill-normal shadow-[0_1px_10px_0_rgba(179,179,188,0.25)]">
      <div className="h-47.5 lg:h-64 w-full shrink-0 overflow-hidden rounded-t-2xl bg-fill-alternative">
        <img
          src={imageUrl}
          alt={name}
          className="block h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col px-4 pt-4 pb-4.5 lg:px-5 lg:pb-5">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-label-14b text-brand-primary lg:text-body-18b">
            {th}기
          </span>
          {isMeetup && (
            <div className="flex flex-row gap-1.25 text-label-assitive text-caption-12r">
              <span>·</span>
              <span className="lg:text-body-16m">{type}</span>
            </div>
          )}
        </div>
        <p className="text-label-netural text-body-16b mb-0.5 lg:text-headline-20b">
          {name}
        </p>
        <div className="h-10 lg:h-13 overflow-hidden shrink-0">
          <p className="text-label-14m text-label-alternative lg:text-body-18m line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
