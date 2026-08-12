import lottolab from '../assets/lottolab.webp'
import lottolab2 from '../assets/lottolab2.webp'
import lottolab3 from '../assets/lottolab3.webp'
import orbit from '../assets/orbit.webp'
import orbit2 from '../assets/orbit2.webp'
import orbit3 from '../assets/orbit3.webp'
import earnboxing from '../assets/earnboxing.webp'
import earnboxing2 from '../assets/earnboxing2.webp'
import earnboxing3 from '../assets/earnboxing3.webp'
import decision from '../assets/decision.webp'
import decision2 from '../assets/decision2.webp'
import decision3 from '../assets/decision3.webp'


export const projects = [
  {
    id: 'lottolab',
    index: '01',
    name: 'LOTTO LAB',
    type: 'Mobile Application · Android',
    shortType: 'MOBILE · ANDROID',
    status: 'ANDROID',
    headline: 'AI × SAJU × LOTTERY',
    description: 'AI와 사주 분석을 결합한 ALL-IN-ONE 로또 플랫폼. 번호 추천, 분석, 저장 등 로또 관련 경험을 하나의 Android 앱으로 통합했습니다.',
    tags: ['AI Recommendation', 'Android', 'Mobile UX'],
    image: lottolab,
    imageMode: 'icon',
    // 실제 앱 화면을 추가할 때 placeholder 객체의 src만 이미지 import로 교체하면 됩니다.
    media: [
      // { id: 'screen-01', kind: 'screen', label: 'SCREEN 01', src: lottolab2, alt: '로또랩 앱 화면 1' },
      // { id: 'screen-02', kind: 'screen', label: 'SCREEN 02', src: lottolab3, alt: '로또랩 앱 화면 2' },
      { id: 'screen-01', kind: 'screen', label: 'SCREEN 01', src: lottolab2, alt: '로또랩 앱 화면 1' },
      { id: 'logo', kind: 'logo', label: 'APP LOGO', src: lottolab, alt: '로또랩 앱 로고' },
      { id: 'screen-02', kind: 'screen', label: 'SCREEN 02', src: lottolab3, alt: '로또랩 앱 화면 2' },
    ],
    url: 'https://play.google.com/store/apps/details?id=com.pixground.lotterymobile',
    cta: 'GOOGLE PLAY',
  },
  {
    id: 'orbit',
    index: '02',
    name: 'ORBIT',
    type: 'Web Platform · FinTech Research',
    shortType: 'WEB PLATFORM · FINTECH',
    status: 'FINTECH',
    headline: 'CRYPTO × STOCK × ETF',
    description: '가상자산, 국내주식, 해외주식, ETF를 하나의 리서치 경험으로 연결하는 멀티에셋 플랫폼. 뉴스, 인사이트, 자산 정보와 다국어 구조를 포함합니다.',
    tags: ['Multi-Asset', 'Research', 'Global UX'],
    image: orbit,
    imageMode: 'screen',
    url: null,
    cta: 'PRIVATE PROJECT',
    media: [
      // { id: 'screen-01', kind: 'screen', label: 'SCREEN 01', src: lottolab2, alt: '로또랩 앱 화면 1' },
      // { id: 'screen-02', kind: 'screen', label: 'SCREEN 02', src: lottolab3, alt: '로또랩 앱 화면 2' },
      { id: 'screen-01', kind: 'screen', label: 'SCREEN 01', src: orbit2, alt: 'ORBIT 웹 화면 1' },
      { id: 'logo', kind: 'logo', label: 'APP LOGO', src: orbit, alt: 'ORBIT 웹 로고' },
      { id: 'screen-02', kind: 'screen', label: 'SCREEN 02', src: orbit3, alt: 'ORBIT 웹 화면 2' },
    ],
  },
  {
    id: 'earnboxing',
    index: '03',
    name: 'EARNBOXING',
    type: 'Mini App · Toss',
    shortType: 'MINI APP · TOSS',
    status: 'TOSS MINI APP',
    headline: 'PLAY × REWARD × TOSS',
    description: 'Toss Apps-in-Toss 환경과 MCP 규격을 고려해 설계한 인터랙티브 리워드 Mini App. 제한된 플랫폼 환경에서 반복 참여 UX를 설계했습니다.',
    tags: ['Apps-in-Toss', 'Reward UX', 'Mini App'],
    image: earnboxing,
    imageMode: 'icon',
    url: null,
    cta: 'TARGET: APPS-IN-TOSS',
    media: [
      // { id: 'screen-01', kind: 'screen', label: 'SCREEN 01', src: lottolab2, alt: '로또랩 앱 화면 1' },
      // { id: 'screen-02', kind: 'screen', label: 'SCREEN 02', src: lottolab3, alt: '로또랩 앱 화면 2' },
      { id: 'screen-01', kind: 'screen', label: 'SCREEN 01', src: earnboxing2, alt: '언박싱 앱 화면 1' },
      { id: 'logo', kind: 'logo', label: 'APP LOGO', src: earnboxing, alt: '언박싱 앱 로고' },
      { id: 'screen-02', kind: 'screen', label: 'SCREEN 02', src: earnboxing3, alt: '언박싱 앱 화면 2' },
    ],
  },
  {
    id: 'decision-room',
    index: '04',
    name: 'AI DECISION ROOM',
    type: 'Enterprise SaaS · AI Collaboration',
    shortType: 'ENTERPRISE SAAS · AI',
    status: 'PLANNING + DEV',
    headline: 'HUMAN × MULTI AI × DECISION',
    description: '채팅방 안에서 인간과 여러 AI Agent가 함께 의견을 제안·분석하고, 인간이 최종 판단을 수행하는 Enterprise Decision Platform.',
    tags: ['Multi AI Agent', 'Decision Flow', 'Enterprise'],
    image: decision,
    imageMode: 'ai',
    url: null,
    cta: 'IN DEVELOPMENT',
    media: [
      { id: 'screen-01', kind: 'screen', label: 'SCREEN 01', src: decision2, alt: '의사결정 웹 화면 1' },
      { id: 'logo', kind: 'logo', label: 'APP LOGO', src: decision, alt: '의사결정 웹 로고' },
      { id: 'screen-02', kind: 'screen', label: 'SCREEN 02', src: decision3, alt: '의사결정 웹 화면 2' },
    ],
  },
]
