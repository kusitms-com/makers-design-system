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

## Docs

- [docs/development.md](/Users/choiho/coding/makers-design-system/docs/development.md)
- [docs/changesets.md](/Users/choiho/coding/makers-design-system/docs/changesets.md)
- [docs/release.md](/Users/choiho/coding/makers-design-system/docs/release.md)
