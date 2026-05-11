import { SnowGraphic } from "@kusitms.com/icons"

export type ListProps = {
  title: string
  items: [string, string, string]
}

export function List({ title, items }: ListProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 px-1">
        <div className="w-5.5 h-6 lg:w-7.5 lg:h-8 shrink-0">
          <SnowGraphic className="w-full h-full" />
        </div>
        <span className="text-body-16b text-label-normal lg:text-headline-20b">
          {title}
        </span>
      </div>
      <ul className="list-disc list-inside space-y-3 rounded-2xl bg-fill-netural px-4 py-6 lg:px-6 lg:py-7 w-236">
        <li className="text-body-16m text-label-netural lg:text-body-18m truncate">
          {items[0]}
        </li>
        <li className="text-body-16m text-label-netural lg:text-body-18m truncate">
          {items[1]}
        </li>
        <li className="text-body-16m text-label-netural lg:text-body-18m truncate">
          {items[2]}
        </li>
      </ul>
    </div>
  )
}
