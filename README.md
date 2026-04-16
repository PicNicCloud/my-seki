# myseki

지하철 좌석 양도 모바일 웹앱. 같은 열차 승객들이 인상착의를 등록하고, 하차 근접도를 색상으로 공유하여 빈 좌석을 찾을 수 있는 서비스.

**https://my-seki.vercel.app**

## Tech Stack

React 19 + TypeScript + Vite / Gemini 2.5 Flash API / Plain CSS

## Setup

```bash
npm install
cp .env.example .env  # VITE_GEMINI_API_KEY 설정
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Type check + Build |
| `npm run lint` | ESLint |
| `npm run preview` | Preview build |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key (AI 아바타 생성용) |

## Features

- 한국/일본 지하철 지원 (KR/JP 언어 토글)
- 아바타 직접 꾸미기 + AI 자연어 생성 (Gemini)
- 하차 근접도 색상 표시 (초록~빨강)
- 로그인 / 노선 선택 / 호차 선택 / 좌석 대기

## Repository

https://github.com/PicNicCloud/my-seki
