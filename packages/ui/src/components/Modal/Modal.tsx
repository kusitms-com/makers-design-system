import {
  BehanceIcon,
  CancelMIcon,
  GithubIcon,
  LinkIcon,
} from "@kusitms.com/icons"
import { useEffect } from "react"
import { NavigationButton } from "../Button/NavigationButton"
import { Label } from "../Label/Label"

export type ModalTeamRole = {
  role: string
  members: string[]
}

export type ModalLinkType = "behance" | "github" | "service"

export type ModalLink = {
  type: ModalLinkType
  label: string
  url: string
}

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  name: string
  th: number
  type: "WEB" | "APP"
  imageUrl: string
  description: string
  teamRoles?: ModalTeamRole[]
  links?: ModalLink[]
}

function ModalLinkIcon({ type }: { type: ModalLinkType }) {
  if (type === "behance") {
    return <BehanceIcon className="size-5 shrink-0" />
  }
  if (type === "github") {
    return <GithubIcon className="size-5 shrink-0" />
  }
  return <LinkIcon className="size-5 shrink-0" />
}

export function Modal({
  isOpen,
  onClose,
  name,
  th,
  type,
  imageUrl,
  description,
  teamRoles = [],
  links = [],
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={name}
    >
      <div
        className="fixed inset-0 bg-effect-dimmer/52"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="flex min-h-full items-start lg:items-center justify-center">
        <div className="relative flex w-83.75 lg:w-156 max-h-144 lg:max-h-231.5 flex-col rounded-2xl bg-fill-normal overflow-hidden">
          <div className="shrink-0 border-b-2 border-line-alternative p-4 lg:pl-7 lg:pr-8 lg:py-6">
            <button
              type="button"
              aria-label="닫기"
              onClick={onClose}
              className="flex items-center justify-center text-label-alternative cursor-pointer"
            >
              <CancelMIcon aria-hidden className="size-5 lg:size-8" />
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 lg:px-8 lg:py-5">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-headline-20b lg:text-pc-30b text-label-normal">
                {name}
              </p>
              <div className="flex flex-row gap-1.5 lg:gap-2">
                <Label type="brand">{th}기</Label>
                <Label type="brand">{type}</Label>
              </div>
            </div>
            <div className="pt-4 lg:pt-5 pb-6 lg:pb-5">
              <div className="w-full overflow-hidden rounded-xl border border-line-neutral bg-fill-alternative aspect-video">
                <img
                  src={imageUrl}
                  alt={name}
                  className="block h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-5 lg:gap-8">
              {/* Description */}
              <div className="flex flex-col gap-1 lg:gap-2">
                <p className="text-body-16b lg:text-body-18b text-label-netural">
                  프로젝트 설명
                </p>
                <p className="text-label-light text-body-16r lg:text-body-16m lg:text-label-alternative">
                  {description}
                </p>
              </div>
              {(teamRoles.length > 0 || links.length > 0) && (
                <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
                  {/* Team roles */}
                  {teamRoles.length > 0 && (
                    <div className="flex flex-col gap-2 lg:gap-3 lg:flex-1">
                      <p className="text-body-16b lg:text-body-18b text-label-netural">
                        프로젝트 팀원
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {teamRoles.map(({ role, members }) => (
                          <div key={role} className="flex items-center gap-2.5">
                            <span className="inline-flex w-20 h-7.5 shrink-0 items-center justify-center rounded bg-fill-netural text-label-14sb text-label-normal whitespace-nowrap">
                              {role}
                            </span>
                            <span className="text-label-14m text-label-alternative">
                              {members.join(", ")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {links.length > 0 && (
                    <div className="flex flex-col gap-2 lg:flex-1">
                      <p className="text-body-16b lg:text-body-18b text-label-netural">
                        링크
                      </p>
                      <div className="flex flex-col gap-2 w-fit">
                        {links.map(({ type: linkType, label, url }) => (
                          <NavigationButton
                            key={linkType}
                            icon={<ModalLinkIcon type={linkType} />}
                            onClick={() =>
                              window.open(url, "_blank", "noreferrer")
                            }
                            className="w-full"
                          >
                            {label}
                          </NavigationButton>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
