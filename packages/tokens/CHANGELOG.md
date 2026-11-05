# @kusitms.com/tokens

## 0.3.0

### Minor Changes

- e385b26: 34기 웹사이트 리뉴얼 디자인 토큰 업데이트

  - brand 색상 램프(10~90) 추가, Semantic brand.\* 토큰이 이를 참조하도록 변경
  - status.negative, fill.destructive, Atomic red.10 값 업데이트
  - radius(xl/m/s), shadow(spread-m/s, normal-strong/light) 토큰 추가
  - Brand/Headline 타이포그래피 토큰(56b/36b/30b/22b) 추가

## 0.2.0

### Minor Changes

- cf17eef: Replace pre-built `styles.css` with `source.css` for consumer-side Tailwind processing

  **Breaking changes:**

  `@kusitms.com/ui`:

  - `styles.css` export removed, replaced with `source.css`
  - Update your CSS import: `@import "@kusitms.com/ui/source.css"` (requires Tailwind v4 in consumer app)

  `@kusitms.com/tokens`:

  - `responsive.css` export removed (breakpoints are Tailwind v4 defaults, no longer needed)

## 0.1.0

### Minor Changes

- bde283e: Initial public release for the KUSITMS design system packages.
- 36e37df: Tailwind 유틸리티 CSS 사전 빌드 및 외부 소비자 사용 환경 개선
