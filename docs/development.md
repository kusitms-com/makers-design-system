# Development Guide

이 문서는 일상 개발과 협업 흐름을 설명합니다.

## 목적

이 저장소는 아래 패키지를 관리하는 `pnpm` + `turbo` 기반 모노레포입니다.

- `@kusitms.com/ui`
- `@kusitms.com/icons`
- `@kusitms.com/tokens`
- `@kusitms.com/tsconfig`
- `@kusitms.com/design-system-docs`

운영 원칙:

- 개발은 기능 브랜치에서 진행합니다.
- `main`은 항상 머지 가능한 상태를 유지합니다.
- 사용자 영향이 있는 변경은 `changeset`으로 기록합니다.
- Storybook과 `pnpm check`를 기본 검증 기준으로 사용합니다.

## 자주 쓰는 명령

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm changeset
```

의미:

- `pnpm dev`: Storybook 실행
- `pnpm check`: lint + typecheck 검증
- `pnpm build`: 전체 패키지 빌드
- `pnpm changeset`: 배포용 변경 기록 생성

## 일상 개발 흐름

1. `main`에서 새 브랜치를 생성합니다.
2. 컴포넌트, 토큰, 아이콘, 문서를 수정합니다.
3. Storybook에서 동작과 UI를 확인합니다.
4. `pnpm check`로 검증합니다.
5. 배포 가치가 있는 변경이면 `pnpm changeset`을 작성합니다.
6. PR을 열고 리뷰를 받습니다.
7. `main`에 머지합니다.

브랜치 예시:

- `feat/badge`
- `feat/tokens-brand-color`
- `fix/input-focus-style`

## 새 컴포넌트 작업 기준

새 컴포넌트 하나를 만들 때는 보통 아래를 한 PR에 같이 넣습니다.

- 컴포넌트 코드
- export 연결
- Storybook story
- 필요하면 테스트
- changeset

예:

- `packages/ui/src/components/Badge.tsx`
- `packages/ui/src/index.ts`
- `apps/docs/src/Badge.stories.tsx`
- `.changeset/...md`

같이 들어가도 되는 이유:

- 하나의 기능 묶음이기 때문입니다.
- 리뷰어가 코드와 사용 예시를 함께 볼 수 있습니다.

## 협업 규칙

- 하나의 PR에 너무 많은 영역을 섞지 않습니다.
- `tokens`, `ui`, `icons`, `docs` 변경은 가능하면 논리적으로 묶습니다.
- 새 컴포넌트를 만들면 Storybook story를 같이 추가합니다.
- API가 바뀌면 PR 설명과 changeset에 영향 범위를 적습니다.
- export 변경은 소비 패키지 영향까지 확인합니다.

## PR 전에 확인할 것

- Storybook에서 UI를 확인했는가
- `pnpm check`가 통과하는가
- 배포 가치가 있으면 changeset을 썼는가
- PR 설명에 변경 이유를 적었는가
