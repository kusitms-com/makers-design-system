export type ReviewCardProps = {
  name: string
  part: string
  body: string
}

export function ReviewCard({ name, part, body }: ReviewCardProps) {
  return (
    <div className="w-72 lg:w-76 flex flex-col rounded-2xl bg-fill-primary p-5">
      <p className="text-body-16b text-label-normal pb-1 lg:text-body-18b">
        {name}
      </p>
      <p className="text-label-14sb text-brand-primary pb-3">{part}</p>
      <p className="text-label-14m text-label-neutral">{body}</p>
    </div>
  )
}
