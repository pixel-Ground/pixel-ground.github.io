# PIXGROUND Studio v5 — Figma-first Agency Website

PIXGROUND(픽스그라운드) 웹 에이전시 홈페이지 시안/구현본입니다.

- Company: **PIXGROUND / 픽스그라운드**
- Portfolio projects: **LOTTO LAB / ORBIT / EarnBoxing / AI Decision Room**
- Figma foundation & hi-fi design: https://www.figma.com/design/P4jjzwVv30N3clp54yxGp3

## 가장 빠르게 확인하기

### 1. 파일 하나로 확인
`standalone.html`을 브라우저에서 엽니다.

CSS, JavaScript, 프로젝트 이미지 에셋이 모두 한 HTML 안에 포함되어 있어 상대경로 문제 없이 확인할 수 있습니다.

### 2. 정적 사이트 형태로 확인
`static/` 폴더를 그대로 정적 웹 서버에 올리거나 `static/index.html`을 기준으로 사용합니다.

## Vue 개발 버전

Stack:
- Vue 3
- Vite
- GSAP + ScrollTrigger
- CSS Design Tokens

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## UX / Design rules

- 첫 화면에서 PIXGROUND가 **Web · App · Platform · SaaS 개발사**임을 즉시 이해할 수 있게 설계했습니다.
- 장식용 카드 반복을 최소화하고 선, 여백, 큰 타이포그래피로 정보 위계를 만듭니다.
- Blue/Cyan glow는 Core / Active Project / Portal에만 제한합니다.
- 마우스 포인터는 **1–10px White Square Pixel Particle**이며 클릭 시 픽셀 burst가 발생합니다.
- Desktop Selected Work는 **세로 휠 → 원형 Orbit 회전** 방식입니다.
- Orbit에서는 현재 선택 프로젝트만 완전히 읽히고 나머지는 위치와 이름만 인지하게 합니다.
- Mobile에서는 Orbit을 축소하지 않고 프로젝트를 순차적으로 읽는 구조로 전환합니다.
- `prefers-reduced-motion` 환경에서는 과도한 모션과 Pointer Particle을 비활성화합니다.
- 실제 텍스트는 이미지에 굽지 않고 HTML 텍스트로 유지합니다.

## Projects

### LOTTO LAB
Mobile Application · Android

AI와 사주 분석을 결합한 ALL-IN-ONE 로또 플랫폼.

### ORBIT
Web Platform · FinTech Research

가상자산 · 국내주식 · 해외주식 · ETF를 하나의 리서치 경험으로 연결하는 멀티에셋 리서치 플랫폼.

### EarnBoxing
Mini App · Toss

Apps-in-Toss 환경과 Toss MCP 규격을 고려한 리워드 Mini App.

### AI Decision Room
Enterprise SaaS · AI Collaboration

인간과 여러 AI Agent가 하나의 회의 공간에서 분석하고 인간이 최종 판단하는 Enterprise Decision Platform.

## Assets

- `lottolab.webp` — 실제 LOTTO LAB 아이콘
- `orbit.webp` — 실제 ORBIT 화면
- `earnboxing.webp` — EarnBoxing 이미지
- `portal.webp` — 마지막 CTA 전용 독립 포털 이미지
- AI Decision Room은 실제 프로젝트 이미지가 아직 없어 HTML/CSS 기반 제품 UI 프리뷰를 사용합니다.

## Main CTA

**HAVE SOMETHING WORTH BUILDING?**

웹사이트, 앱, 플랫폼 또는 SaaS가 필요하다면 현재 아이디어와 준비 상태를 알려주세요. 기능·예산·일정에 맞는 현실적인 제작 범위를 함께 정리합니다.

`START A PROJECT ↗`
