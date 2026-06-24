# @kusitms.com/ui

## 0.2.2

### Patch Changes

- 6977042: Replace workspace protocol dependencies with published package versions for npm consumers.

## 0.2.1

### Patch Changes

- Add responsive website header, footer, navigation, and scroll top component support.

## 0.2.0

### Minor Changes

- cf17eef: Replace pre-built `styles.css` with `source.css` for consumer-side Tailwind processing

  **Breaking changes:**

  `@kusitms.com/ui`:

  - `styles.css` export removed, replaced with `source.css`
  - Update your CSS import: `@import "@kusitms.com/ui/source.css"` (requires Tailwind v4 in consumer app)

  `@kusitms.com/tokens`:

  - `responsive.css` export removed (breakpoints are Tailwind v4 defaults, no longer needed)

### Patch Changes

- Updated dependencies [cf17eef]
  - @kusitms.com/tokens@0.2.0

## 0.1.0

### Minor Changes

- bde283e: Initial public release for the KUSITMS design system packages.
- 36e37df: Tailwind 유틸리티 CSS 사전 빌드 및 외부 소비자 사용 환경 개선
