export type BlogProps = {
  imageUrl: string
  title: string
  content: string
  labels: string[]
}

export function Blog({ imageUrl, title, content, labels }: BlogProps) {
  return (
    <div className="flex w-full flex-row gap-3 lg:gap-7 pb-5 lg:pb-8 px-4 lg:pr-8 lg:pl-0">
      <div className="size-26 lg:w-60 lg:h-41 rounded-lg bg-fill-netural shrink-0 self-stretch overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="block h-full w-full object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-2 lg:gap-4 py-1">
        <div className="flex flex-col gap-0.5 lg:gap-1">
          <p className="text-body-16b text-label-netural lg:text-headline-20b line-clamp-1">
            {title}
          </p>
          <p className="h-10 lg:h-13 text-label-14m text-label-alternative lg:text-body-16m line-clamp-2">
            {content}
          </p>
        </div>
        {labels.length > 0 && (
          <div className="flex flex-row flex-wrap gap-1 lg:gap-2">
            {labels.map((label) => (
              <span
                key={label}
                className="inline-block rounded-md bg-fill-netural px-3 py-1 text-caption-12sb text-label-alternative lg:text-label-14sb"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
