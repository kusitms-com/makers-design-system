# Feature Development Workflow

이 문서는 이 저장소에서 기능 하나를 처음부터 끝까지 개발할 때 따라가는 실전 가이드입니다.

목표:

- 새 컴포넌트 하나를 만든다
- Storybook에서 확인한다
- changeset을 작성한다
- PR을 열고 `main`에 머지한다
- release PR과 배포까지 흐름을 이해한다

예시는 `Badge` 컴포넌트를 새로 만드는 상황으로 설명합니다.

## 1. 먼저 이해해야 하는 것

이 저장소는 모노레포입니다.

주요 위치:

- `packages/ui`: 실제 React 컴포넌트 코드
- `packages/tokens`: 디자인 토큰
- `packages/icons`: 아이콘
- `apps/docs`: Storybook 문서 앱

즉 새 컴포넌트를 만들 때는 보통:

- `packages/ui`에 컴포넌트 추가
- `apps/docs`에 story 추가

를 같이 하게 됩니다.

## 2. 개발 시작 전 준비

처음 한 번:

```bash
pnpm install
```

자주 쓰는 명령:

```bash
pnpm dev
pnpm check
pnpm build
pnpm changeset
```

의미:

- `pnpm dev`: Storybook 실행
- `pnpm check`: lint + typecheck 검증
- `pnpm build`: 전체 빌드 확인
- `pnpm changeset`: 배포할 변경 기록

## 3. main에서 바로 작업하지 않는다

기능 개발은 `main`에서 직접 하지 않습니다.

브랜치를 먼저 만듭니다.

예:

```bash
git checkout -b feat/badge
```

이유:

- `main`은 항상 안정적으로 유지해야 합니다.
- 작업 중인 코드가 바로 공식 코드가 되면 안 됩니다.

## 4. 새 기능 하나를 만든다

이제 `Badge` 컴포넌트를 만든다고 가정합니다.

보통 아래 작업이 필요합니다.

1. `packages/ui/src/components/Badge.tsx` 생성
2. `packages/ui/src/index.ts`에 export 추가
3. `apps/docs/src/Badge.stories.tsx` 생성

즉 하나의 기능을 완성하려면:

- 실제 컴포넌트 코드
- 외부에서 import할 수 있는 export
- Storybook 문서

가 같이 필요합니다.

## 5. Storybook으로 직접 확인한다

컴포넌트를 만들었으면 화면에서 먼저 확인합니다.

```bash
pnpm dev
```

확인할 것:

- 컴포넌트가 정상 렌더링되는가
- 색상, 간격, radius가 어색하지 않은가
- variant가 있다면 각각 잘 보이는가
- hover, disabled, loading 같은 상태가 있으면 다 확인했는가

디자인 시스템은 "코드가 돌아가는가"보다 "UI가 올바르게 보이는가"도 중요합니다.

## 6. 검증 명령을 돌린다

화면만 보고 끝내지 않습니다.

```bash
pnpm check
```

이 단계에서 보는 것:

- lint 에러
- TypeScript 타입 에러
- 잘못된 import/export

필요하면 빌드까지 확인합니다.

```bash
pnpm build
```

보통 기능 PR 전에 `pnpm check`는 반드시 통과해야 합니다.

## 7. changeset이 필요한지 판단한다

이제 스스로 질문합니다.

> 이 변경은 나중에 npm 패키지 사용자에게 전달되어야 하는가?

`Badge`는 새 컴포넌트이므로 답은 `예`입니다.

따라서 changeset을 작성해야 합니다.

changeset이 필요한 대표 예:

- 새 컴포넌트 추가
- 기존 컴포넌트 API 변경
- 토큰 값 변경
- 새 아이콘 추가

changeset이 보통 필요 없는 예:

- 문서 오타 수정만 한 경우
- 내부 리팩터링만 한 경우
- 외부 사용자 영향이 없는 설정 정리

## 8. changeset을 작성한다

명령:

```bash
pnpm changeset
```

그러면 CLI가 보통 아래를 묻습니다.

1. 어떤 패키지가 바뀌었는가
2. `patch`, `minor`, `major` 중 무엇인가
3. 변경 설명은 무엇인가

`Badge`를 새로 추가하는 예:

- 패키지: `@kusitms.com/ui`
- 버전 타입: `minor`
- 설명: `Add Badge component with tone variants.`

왜 `minor`인가:

- 기존 사용법은 깨지지 않습니다.
- 대신 새 기능이 추가됩니다.

생성되는 파일 예:

```md
---
"@kusitms.com/ui": minor
---

Add Badge component with tone variants.
```

## 9. PR을 열기 전에 마지막 확인을 한다

아래를 확인합니다.

- Storybook에서 UI가 괜찮은가
- `pnpm check`가 통과하는가
- 필요한 export가 빠지지 않았는가
- changeset을 작성했는가
- PR 설명에 변경 이유를 적을 수 있는가

여기까지 끝나면 PR을 열 준비가 된 것입니다.

## 10. PR을 만든다

이제 GitHub에 PR을 만듭니다.

이 PR은 쉽게 말하면:

> `Badge` 기능을 `main`에 넣어도 되는지 검토해 주세요

라는 요청입니다.

좋은 PR에는 보통 아래가 함께 들어갑니다.

- 컴포넌트 코드
- Storybook story
- changeset
- 필요한 테스트

즉 같은 기능을 완성하는 데 필요한 변경은 한 PR에 같이 들어가도 됩니다.

## 11. 리뷰를 받는다

리뷰어는 보통 아래를 봅니다.

- 컴포넌트 구조가 적절한가
- prop 설계가 이상하지 않은가
- Storybook 예시가 충분한가
- changeset 패키지/버전 타입이 맞는가

이 단계에서 수정 요청이 오면 브랜치에서 고친 뒤 다시 push 합니다.

## 12. main에 머지된다

리뷰가 끝나면 PR이 `main`에 머지됩니다.

중요:

- 이 시점은 아직 "npm에 배포됨"이 아닙니다.
- 이 시점은 "배포 후보가 공식 코드에 들어감"입니다.

즉 기능 PR 머지는 배포 준비 단계입니다.

## 13. GitHub Actions가 자동으로 실행된다

`main`에 머지되면 release workflow가 자동으로 실행됩니다.

하는 일:

1. 의존성 설치
2. `pnpm check`
3. `pnpm build`
4. `changesets/action` 실행

즉 서버가 한 번 더

> 이 변경이 진짜 배포 가능한 상태인가

를 검사합니다.

## 14. release PR이 생성된다

머지된 기능 PR 안에 changeset이 있었기 때문에 release PR이 만들어집니다.

release PR은:

- 아직 배포되지 않은 변경들을 모아둔 PR
- 어떤 패키지가 몇 버전으로 올라가는지 보여주는 PR

`Badge` 예시:

- `@kusitms.com/ui`
- 예: `0.1.0 -> 0.2.0`
- 설명: `Add Badge component with tone variants.`

즉 release PR은

> 이번 배포에 `Badge`를 포함하겠습니다

라고 정리된 문서입니다.

## 15. release PR은 미배포 변경이 쌓이는 곳이다

release PR을 아직 머지하지 않았는데 다른 기능도 `main`에 들어오면, 그 변경도 release PR에 같이 반영됩니다.

예:

- `Badge` 추가
- `Avatar` 추가
- 버튼 버그 수정

이 세 가지가 모두 아직 배포 전이면 release PR에 함께 쌓일 수 있습니다.

그래서 release PR은:

- 미배포 변경 모음
- 이번 배포 후보 상자

라고 생각하면 이해하기 쉽습니다.

## 16. release PR에서 최종 확인한다

release PR에서는 아래를 확인합니다.

- 어떤 패키지가 배포되는가
- 버전이 얼마나 올라가는가
- 설명이 맞는가
- 이번 배포에 넣어도 되는가

즉 기능 PR 리뷰가 "코드 품질 리뷰"라면,
release PR 리뷰는 "배포 내용 리뷰"에 가깝습니다.

## 17. release PR을 머지하면 실제 배포가 시작된다

중요한 구분:

- 기능 PR 머지 = 배포 준비
- release PR 머지 = 실제 배포

release PR이 머지되면 GitHub Actions가 npm publish를 수행합니다.

예:

- `@kusitms.com/ui@0.2.0`

이제 다른 프로젝트에서 설치해서 `Badge`를 사용할 수 있습니다.

## 18. 사용처 프로젝트에서는 어떻게 쓰는가

배포가 끝나면 소비 프로젝트에서는 npm 패키지를 설치해서 사용합니다.

예:

```bash
pnpm add @kusitms.com/ui
```

필요한 패키지에 따라 같이 설치할 수 있습니다.

예:

```bash
pnpm add @kusitms.com/ui @kusitms.com/tokens @kusitms.com/icons
```

컴포넌트 사용 예:

```tsx
import { Badge } from "@kusitms.com/ui"

export function Example() {
  return <Badge>New</Badge>
}
```

아이콘 사용 예:

```tsx
import { ArrowRightIcon } from "@kusitms.com/icons"

export function ExampleIcon() {
  return <ArrowRightIcon />
}
```

토큰 CSS 사용 예:

```tsx
import "@kusitms.com/tokens/themes.css"
```

즉 사용처 프로젝트 입장에서는:

1. 패키지를 설치하고
2. 필요한 컴포넌트를 import하고
3. 앱 코드에서 바로 사용하면 됩니다

그래서 디자인 시스템 저장소에서 새 기능 하나를 개발할 때는 항상 이 질문을 같이 해야 합니다.

> 배포가 끝난 뒤, 다른 프로젝트에서 이 기능을 자연스럽게 import해서 쓸 수 있는가?

이 질문에 답하려면 아래도 함께 확인해야 합니다.

- `packages/ui/src/index.ts`에 export가 연결되어 있는가
- 사용 예시가 Storybook에 있는가
- 필요한 토큰/아이콘 의존성이 빠지지 않았는가

## 19. Badge 예시를 한 번에 이어서 보면

`Badge`를 새로 만들었다고 가정하면 최종 사용 흐름은 이렇습니다.

1. 디자인 시스템 저장소에서 `Badge.tsx`를 만든다
2. Storybook에서 UI를 확인한다
3. changeset을 쓴다
4. PR을 머지한다
5. release PR을 머지한다
6. `@kusitms.com/ui` 새 버전이 배포된다
7. 사용처 프로젝트에서 `pnpm add @kusitms.com/ui`
8. `import { Badge } from "@kusitms.com/ui"`로 사용한다

## 20. 한 줄 요약

새 기능 하나를 개발할 때의 전체 순서:

1. 브랜치 생성
2. 컴포넌트 코드 작성
3. Storybook story 작성
4. `pnpm check`
5. `pnpm changeset`
6. PR 생성
7. 리뷰 후 `main` 머지
8. release PR 생성
9. release PR 검토
10. release PR 머지
11. npm 배포

## 21. 아주 짧은 비유

- 기능 PR = 새 물건을 창고에 넣는 단계
- release PR = 창고에 있는 물건을 박스에 담아 출고하는 단계

## 22. 마지막 체크리스트

기능 개발이 끝났다고 생각되면 아래를 확인합니다.

- 브랜치에서 작업했는가
- Storybook에서 UI를 확인했는가
- `pnpm check`가 통과하는가
- changeset을 작성했는가
- PR 설명을 쓸 수 있을 정도로 변경을 이해하고 있는가

이 다섯 가지가 맞으면, 기능 하나를 올바른 흐름으로 개발한 것입니다.
