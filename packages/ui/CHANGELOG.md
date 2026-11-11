# @kusitms.com/ui

## 0.4.0

### Minor Changes

- 635c93d: - Footer: 웹사이트 리뉴얼 시안에 맞춰 기본값을 바꿉니다. 최대 폭 1440px·좌우 여백 16/40px, 정관·저작권·Contact 글자와 색(`label-normal`), 세로 간격, 저작권 문구(`© 2026.KUSITMS. ALL rights reserved.`)가 바뀌고, 기본 정관 문구는 데스크톱에서만 "(PDF)"를 붙입니다.
  - Footer: `mobileLogo`를 넘겨도 데스크톱에서는 `logo`가 보이도록 화면 폭별로 나눠 렌더링합니다.
- dc1ea22: - Tooltip 컴포넌트를 추가합니다. 화살표 위치(`center`/`end`)를 고를 수 있고, hover 시 `interaction-dim` 토큰을 덮고 밑줄을 긋습니다.
  - Icons: 툴팁 화살표 아이콘(`TooltipArrowIcon`, 36×14)을 추가합니다.

### Patch Changes

- Updated dependencies [dc1ea22]
  - @kusitms.com/icons@0.2.0

## 0.3.0

### Minor Changes

- da3e0a6: 34기 웹사이트 리뉴얼 컴포넌트 추가

  - `DefaultButton` 신규 (Figma Button/Default, size `xl`/`l`/`m`/`s` × variant `strong`/`primary`/`outlined`/`error`/`disabled`)
  - `Button`에 `size="m"`, `variant="glass"` 추가 (Figma Button/Rounded)
  - `Header` 리뉴얼: 반투명 blur 배경, `cta`·`mobileCta` 슬롯, 모바일 메뉴 좌측 정렬·그라데이션 패널
  - `HeaderNavigation`·`HeaderMobileItem`에 `isActive` 추가, 메뉴 스타일 리뉴얼 (`state="pressed"`도 active로 처리)
  - `HeaderMobile` 바 높이·배경 리뉴얼
  - `Footer` 모바일 여백·타이포·아이콘 간격 조정

## 0.2.3

### Patch Changes

- Updated dependencies [e385b26]
  - @kusitms.com/tokens@0.3.0

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
