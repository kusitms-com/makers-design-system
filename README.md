# makers-design-system

`pnpm` + `turbo` + `biome` + Tailwind CSS v4 기반 디자인 시스템 모노레포입니다.

운영 문서는 [docs/README.md](/Users/choiho/coding/makers-design-system/docs/README.md)를 참고하세요.

## Workspace

- `apps/docs`: Storybook 문서 앱
- `packages/tokens`: 디자인 토큰 JSON/CSS
- `packages/ui`: 공통 React UI 컴포넌트
- `packages/icons`: SVG 기반 React 아이콘 컴포넌트
- `packages/tsconfig`: 공통 TypeScript 설정

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm check
pnpm changeset
pnpm version-packages
pnpm release
```

## 패키지 사용법

### @kusitms.com/ui

컴포넌트 라이브러리입니다. 완성된 Tailwind 결과물 대신 `source.css`를 제공하므로, 소비자 앱의 Tailwind가 UI 컴포넌트에 필요한 유틸리티 클래스를 직접 생성합니다.

```bash
npm install @kusitms.com/ui
```

```css
/* globals.css */
@import "tailwindcss";
@import "@kusitms.com/ui/source.css";
```

```tsx
import { Button } from "@kusitms.com/ui"
```

---

### @kusitms.com/tokens

디자인 토큰을 직접 사용할 때 설치합니다. `bg-brand-primary`, `text-label-normal` 같은 Tailwind 유틸리티 클래스를 소비자 코드에서 직접 쓸 수 있습니다.

```bash
npm install @kusitms.com/tokens
```

```css
/* globals.css */
@import "tailwindcss";
@import "@kusitms.com/tokens/index.css";
@import "@kusitms.com/tokens/responsive.css";
@import "@kusitms.com/tokens/themes.css";
@import "@kusitms.com/tokens/typography.css";
```

---

### @kusitms.com/icons

아이콘을 직접 사용할 때 설치합니다.

```bash
npm install @kusitms.com/icons
```

```tsx
import { ToggleOpenSIcon } from "@kusitms.com/icons"
```

---

### 전체 사용 시

```bash
npm install @kusitms.com/ui @kusitms.com/tokens @kusitms.com/icons
```

```css
/* globals.css */
@import "tailwindcss";
@import "@kusitms.com/ui/source.css";
```

## Docs

- [docs/development.md](/Users/choiho/coding/makers-design-system/docs/development.md)
- [docs/changesets.md](/Users/choiho/coding/makers-design-system/docs/changesets.md)
- [docs/release.md](/Users/choiho/coding/makers-design-system/docs/release.md)
