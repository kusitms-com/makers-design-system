import {
  BehanceIcon,
  CancelMIcon,
  GithubIcon,
  LinkIcon,
} from "@kusitms.com/icons"
import { type JSX, useEffect } from "react"
import { cn } from "../../utils/cn"
import { BottomGradient } from "../BottomGradient"
import { NavigationButton } from "../Button/NavigationButton"
import { PageNavButton } from "../Button/PageNavButton"
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
  onPrev?: () => void
  onNext?: () => void
  name: string
  th: number
  type: "WEB" | "APP"
  imageUrl: string
  description: string
  teamRoles?: ModalTeamRole[]
  links?: ModalLink[]
}

const LINK_ICONS: Record<
  ModalLinkType,
  (props: { className: string }) => JSX.Element
> = {
  behance: BehanceIcon,
  github: GithubIcon,
  service: LinkIcon,
}

function ModalLinkIcon({ type }: { type: ModalLinkType }) {
  const Icon = LINK_ICONS[type]
  return <Icon className="size-5 shrink-0" />
}

export function Modal({
  isOpen,
  onClose,
  onPrev,
  onNext,
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

  const hasNav = !!(onPrev || onNext)

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={name}
    >
      <div
        className="fixed inset-0 bg-effect-dimmer"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="flex min-h-full items-start lg:items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            {hasNav && (
              <div className="hidden lg:flex mr-5">
                <PageNavButton
                  direction="prev"
                  color="light"
                  onClick={onPrev}
                  className={!onPrev ? "invisible pointer-events-none" : ""}
                />
              </div>
            )}
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
              <div
                className={cn(
                  "flex-1 min-h-0 overflow-y-auto pt-3 pb-4 lg:pt-5 lg:pb-8",
                  "[&::-webkit-scrollbar]:w-0.75",
                  "[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:rounded-full",
                  "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-label-normal/75 [&::-webkit-scrollbar-thumb]:h-16",
                )}
              >
                <div className="px-5 lg:px-8">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-headline-20b lg:text-pc-30b text-label-normal">
                      {name}
                    </p>
                    <div className="flex gap-1.5 lg:gap-2">
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
                        {teamRoles.length > 0 && (
                          <div className="flex flex-col gap-2 lg:gap-3 lg:flex-1">
                            <p className="text-body-16b lg:text-body-18b text-label-netural">
                              프로젝트 팀원
                            </p>
                            <div className="flex flex-col gap-1.5">
                              {teamRoles.map(({ role, members }) => (
                                <div
                                  key={role}
                                  className="flex items-center gap-2.5"
                                >
                                  <Label type="default">{role}</Label>
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
                            <div className="flex flex-col gap-2 items-start">
                              {links.map(({ type: linkType, label, url }) => (
                                <NavigationButton
                                  key={url}
                                  icon={<ModalLinkIcon type={linkType} />}
                                  onClick={() =>
                                    window.open(url, "_blank", "noreferrer")
                                  }
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
              <BottomGradient
                height={48}
                className="lg:left-5! lg:right-5! lg:w-auto! lg:translate-x-0!"
              />
            </div>
            {hasNav && (
              <div className="hidden lg:flex ml-5">
                <PageNavButton
                  direction="next"
                  color="light"
                  onClick={onNext}
                  className={!onNext ? "invisible pointer-events-none" : ""}
                />
              </div>
            )}
          </div>
          {hasNav && (
            <div className="flex w-83.75 justify-between mt-4 lg:hidden">
              <PageNavButton
                direction="prev"
                color="light"
                onClick={onPrev}
                className={!onPrev ? "invisible pointer-events-none" : ""}
              />
              <PageNavButton
                direction="next"
                color="light"
                onClick={onNext}
                className={!onNext ? "invisible pointer-events-none" : ""}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
