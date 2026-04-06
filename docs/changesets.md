# Changeset Guide

이 문서는 팀이 `changeset`을 일관되게 작성하기 위한 기준입니다.

## changeset이란

`changeset`은 "이번 변경이 어떤 패키지에 영향을 주고, 버전을 얼마나 올려야 하는지"를 기록하는 메모 파일입니다.

명령:

```bash
pnpm changeset
```

실행하면 보통 아래를 선택합니다.

1. 어떤 패키지가 바뀌었는지
2. `patch`, `minor`, `major` 중 무엇인지
3. 사용자에게 보여줄 변경 설명

## 언제 써야 하나

작성해야 하는 경우:

- 새 컴포넌트 추가
- 기존 컴포넌트 API 변경
- 토큰 값 또는 구조 변경
- 아이콘 추가/삭제/이름 변경
- 외부 사용자가 체감하는 버그 수정

보통 작성하지 않아도 되는 경우:

- 문서 오타 수정
- 내부 리팩터링만 있는 변경
- 테스트/빌드 설정만의 변경
- 외부 공개 패키지 동작에 영향이 없는 정리 작업

## 어떤 패키지를 선택해야 하나

`@kusitms.com/ui`:

- 새 컴포넌트 추가
- prop 추가/변경/삭제
- 스타일 결과 변경
- export 경로 변경

`@kusitms.com/tokens`:

- 색상, 타이포, spacing, radius, shadow 값 변경
- 토큰 이름 변경
- CSS variable/export 변경

`@kusitms.com/icons`:

- 아이콘 추가
- 아이콘 이름 변경
- 아이콘 삭제
- SVG 모양이나 규칙 변경

`@kusitms.com/design-system-docs`:

- 현재 publish 대상이 아니므로 문서 앱 변경만 있을 때는 대체로 changeset이 필요 없습니다.

## 버전 타입 선택 기준

`patch`:

- 버그 수정
- 작은 스타일 수정
- 기존 사용법을 깨지 않는 품질 개선

`minor`:

- 새 컴포넌트 추가
- 새 prop, variant, token, icon 추가
- 하위 호환은 유지되지만 기능이 늘어난 경우

`major`:

- 기존 API를 깨는 변경
- prop 이름 삭제/변경
- export 제거
- token 이름 변경으로 소비 코드 수정이 필요한 경우
- icon 이름 변경/삭제

## 0.x 단계 운영 규칙

현재는 초기 단계이므로 아래처럼 운영합니다.

- 기본은 `patch`와 `minor` 중심으로 사용합니다.
- 정말 큰 breaking change가 아니면 팀 합의로 `minor` 처리할 수 있습니다.
- 다만 breaking 요소가 있으면 changeset 본문에 꼭 적습니다.
- 소비 프로젝트가 늘어나면 breaking change는 `major`로 더 엄격하게 관리합니다.

## 설명 작성 규칙

- 짧고 분명하게 적습니다.
- 구현 내용보다 사용자 관점의 변화를 적습니다.
- 필요하면 breaking change 여부를 적습니다.
- 팀에서 한 언어로 통일합니다.

좋은 예시:

- `Add Badge component with tone variants.`
- `Update brand color tokens for improved contrast.`
- `Remove deprecated Button kind prop and replace it with variant.`

피해야 하는 예시:

- `Fix stuff`
- `Update files`
- `Refactor code`

## 예시

새 컴포넌트 추가:

```md
---
"@kusitms.com/ui": minor
---

Add Badge component with tone variants.
```

토큰 값 조정:

```md
---
"@kusitms.com/tokens": patch
---

Adjust neutral and brand token values for better contrast.
```

컴포넌트와 토큰이 함께 바뀐 경우:

```md
---
"@kusitms.com/ui": minor
"@kusitms.com/tokens": patch
---

Add button emphasis variants and update supporting color tokens.
```

breaking change:

```md
---
"@kusitms.com/ui": major
---

Remove deprecated Button kind prop and replace it with variant.
```

## 작성 전 체크리스트

- 배포 가치가 있는 변경인가
- 영향을 받는 패키지를 정확히 골랐는가
- `patch` / `minor` / `major` 판단이 맞는가
- 설명이 사용자 관점으로 적혀 있는가
- Storybook과 `pnpm check` 기준으로 검증했는가
