# Release Guide

이 문서는 release PR과 npm 배포 흐름을 설명합니다.

## 버전 정책

초기에는 `0.x`로 운영합니다.

- `0.1.0`: 첫 공개 릴리즈
- `0.x`: 아직 안정 API로 보지 않음
- `1.0.0`: 안정 API와 운영 체계가 갖춰진 공식 릴리즈

권장:

- 지금 단계에서는 `0.x` 유지
- API와 토큰 구조가 충분히 안정된 뒤 `1.0.0`

## 현재 배포 파이프라인

릴리즈 워크플로는 [release.yml](/Users/choiho/coding/makers-design-system/.github/workflows/release.yml)에 있습니다.

동작 기준:

- `main` 브랜치에 push 되면 실행됩니다.
- workflow는 아래 순서로 동작합니다.

1. 의존성 설치
2. `pnpm check`
3. `pnpm build`
4. `changesets/action` 실행

## release PR은 무엇인가

release PR은 아직 배포되지 않은 changeset들을 모아둔 PR입니다.

쉽게 말하면:

- 기능 PR 머지 = 배포 준비
- release PR 머지 = 실제 배포

## 실제 흐름

1. 기능 PR이 `main`에 머지됩니다.
2. GitHub Actions가 실행됩니다.
3. 아직 배포되지 않은 changeset이 있으면 release PR을 생성합니다.
4. release PR에는 배포될 패키지, 버전 변화, 변경 설명이 모입니다.
5. release PR을 머지하면 npm publish가 수행됩니다.

## release PR에 변경이 쌓이는 방식

release PR을 아직 머지하지 않았는데 또 다른 기능 PR이 `main`에 들어오면, 그 changeset도 release PR에 같이 반영됩니다.

즉 release PR은:

- "아직 배포되지 않은 변경 묶음"
- "이번 배포 후보 모음"

이라고 보면 됩니다.

## 버전은 어떻게 올라가나

changeset이 여러 개 쌓여 있어도 release 시점에 한 번 계산해서 올립니다.

예:

- 현재 버전: `0.1.0`
- 쌓인 changeset: `patch`, `patch`, `minor`

결과:

- 최종 버전은 `0.2.0`

즉 changeset 개수만큼 여러 번 올라가는 것이 아니라, 쌓인 변경 중 가장 큰 변경 기준으로 한 번 올라갑니다.

## npm 배포에 필요한 외부 설정

실제 npm publish를 하려면 아래가 필요합니다.

- npm organization: `kusitms.com`
- publish 권한이 있는 npm 계정
- GitHub repository secret `NPM_TOKEN`

설정이 없으면 workflow는 publish 단계에서 실패합니다.

## 릴리즈 체크리스트

- `pnpm check` 통과
- `pnpm build` 통과
- 주요 Storybook 화면 확인
- changeset 작성 여부 확인
- breaking change 설명 확인
- npm token 및 권한 확인

## 자주 쓰는 명령

changeset 버전 반영 확인:

```bash
pnpm version-packages
pnpm install
pnpm build
```

로컬에서 직접 publish가 필요한 경우:

```bash
pnpm release
```

이 명령은 실제 npm publish를 시도하므로, CI 기반 배포가 아니라면 인증 상태를 먼저 확인해야 합니다.
