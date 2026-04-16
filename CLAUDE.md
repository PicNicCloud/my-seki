# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**my-seki** — 지하철 좌석 양도 모바일 웹앱. 같은 열차에 탑승한 승객들이 인상착의를 등록하고, 하차 예정 정보를 공유하여 빈 좌석을 찾을 수 있는 서비스.

- 로컬 환경에서만 배포 (시연용 데모 수준)
- 핵심 기능 위주로 간단하게 구현
- 한국어/일본어 2개 언어 지원

## Commands

- `npm run dev` — Vite dev server (HMR)
- `npm run build` — TypeScript 타입체크 + Vite 빌드
- `npm run lint` — ESLint
- `npm run preview` — 프로덕션 빌드 미리보기

## Tech Stack

- React 19 + TypeScript 6 + Vite 8
- Plain CSS with CSS custom properties (no Tailwind, no CSS modules)
- `useState` 기반 수동 페이지 전환 (외부 라우터 없음)
- 백엔드 없음 — 프론트엔드 단독, mock data 사용
- No test framework

## Core Features & Flow

### 다국어 (i18n)
- 오른쪽 상단에 **KR/JP 토글 버튼** 상시 노출
- 한국어(KR) / 일본어(JP) 두 가지 언어 전환
- 모든 페이지에서 동일하게 적용

### 로그인
- 간단한 하드코딩 인증: **ID: `myseki`** / **PW: `0000`**

### 입장 플로우
1. `Landing` → 시작
2. `LineSelect` → 호선 선택 (GPS 자동 감지 가정, 실제로는 수동 선택)
3. `Home` → 호차 번호 선택
4. `AvatarDecorator` → 인상착의 등록 (직접 꾸미기 / AI 문장 생성)
5. `RegisterSeat` → 하차역 선택, 좌석 등록 완료
6. `SeatFinder` → 해당 호차 페이지 진입 (메인 화면)

### 좌석 찾기 (메인)
- 같은 호차에 등록된 승객 목록 표시
- **하차역은 직접 노출하지 않음** (사생활 침해/스토킹 방지)
- 대신 하차 근접도를 **색상 그라데이션**으로 표현: 초록(멀다) → 빨강(가깝다)
- 하차가 가까운 순으로 상단에 정렬
- 각 승객의 아바타, 인상착의 확인 → 아바타를 보고 실제 사람을 매칭하는 것이 핵심
- `Waiting` 페이지로 대기 등록 가능

## Architecture

### Routing & State
`App.tsx`가 모든 페이지 상태를 관리. `currentPage` state로 8개 페이지를 조건부 렌더링.

**글로벌 state (App.tsx에서 관리):**
- `currentPage` — 현재 페이지 (`Page` union type)
- `selectedLineId` / `selectedLine` — 선택된 호선
- `selectedCar` — 선택된 호차 번호
- `destination` — 하차 예정역
- `avatar` — 아바타 설정 (`AvatarConfig`)

**하단 네비게이션:** `finder`, `avatar`, `profile` 페이지에서만 표시

### Data Layer
`src/data/subwayData.ts` — 지하철 데이터 및 아바타 설정 중앙 관리
- `SUBWAY_LINES` — 1~9호선 역 목록 (SubwayLine[])
- `AVATAR_CATEGORIES` — 표정/헤어/상의/하의/악세서리 카테고리
- `AvatarConfig` — 아바타 상태 타입, `DEFAULT_AVATAR` 초기값
- `getAvatarDescription()` / `getAvatarEmoji()` — 아바타 텍스트/이모지 변환 유틸

### Styling
- 디자인 토큰: `src/styles/global.css`의 CSS variables
- 공통 컴포넌트 스타일: `.page-header`, `.submit-btn`, `.bottom-nav`, `.line-badge` 등 global.css에 정의
- 각 페이지별 co-located CSS 파일
- 모바일 퍼스트 (max-width 430px, m1. /plugin install frontend-design@claude-plugins-official
- x-height 932px)
- 데스크톱에서는 둥근 모서리의 폰 프레임으로 표시

### Key Design Decisions
- 외부 라우터 없이 state 기반 네비게이션 — 페이지 수가 적고 URL 라우팅 불필요
- GPS 감지는 가정(mock)으로 처리 — 실제 Geolocation API 연동 없음
- 백엔드 없이 프론트 단독 — 사용자 데이터는 로컬 state/mock으로 관리
- 아바타는 이모지 기반 파츠 조합 시스템 — 귀엽고 구체적이어야 함 (인상착의로 실제 사람을 찾는 것이 서비스 핵심)

## TODO / 요구사항

1. 파비콘을 앱 컨셉에 맞게 예쁘게 교체
2. 입장 후에도 열차(호선)와 호차를 변경할 수 있는 기능 추가
3. 좌석 찾기 화면에서 각 승객별 대기 인원 수 표시
4. 아이콘 스타일을 전체적으로 덜 애플스럽게 (플랫/미니멀 방향)

## 작업 원칙

- **기존에 잘 되어있는 부분은 건들지 않는다**
- **애매하면 반드시 사용자에게 물어본다** — 임의로 판단하지 말 것
- 변경 전 컨펌을 받고 진행