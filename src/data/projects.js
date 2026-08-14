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
import { SITE_MODE } from './siteMode'

const modeText = (portfolio, business) =>
  SITE_MODE === 'business'
    ? business
    : portfolio

export const projects = [
  {
    id: 'lottolab',
    index: '01',
    name: 'LOTTO LAB',
    type: 'Mobile Application · Android',
    shortType: 'MOBILE · ANDROID',
    status: 'ANDROID',
    headline: 'AI × SAJU × LOTTERY',
    kicker: 'ANDROID · AI RECOMMENDATION · END-TO-END',
    description: modeText(
      'Android 스마트폰에서 AI 추천과 사주 분석을 결합해 번호 생성·분석·저장을 한 흐름으로 제공하는 올인원 로또 앱입니다. 개인화된 분석과 반복 사용에 최적화된 모바일 UX가 강점이며, 서비스 기획·사용자 시나리오·정보 구조·UI/UX 디자인·앱 개발 전 과정을 직접 수행했습니다.',
      'Android 스마트폰에서 AI 추천과 사주 분석을 결합해 번호 생성·분석·저장을 한 흐름으로 제공하는 올인원 로또 앱입니다. 개인화된 분석과 반복 사용에 최적화된 모바일 UX가 강점이며, PIXGROUND가 서비스 기획·사용자 시나리오·정보 구조·UI/UX 디자인·앱 개발을 End-to-End로 수행했습니다.'
    ),
    tags: ['Android Mobile', 'AI Recommendation', 'End-to-End Product'],
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
    kicker: 'RESPONSIVE WEB · MULTI-ASSET DATA · END-TO-END',
    description: modeText(
      'PC·태블릿·모바일 반응형 Web에서 가상자산, 국내·해외주식, ETF를 하나의 탐색 흐름으로 연결한 멀티에셋 리서치 플랫폼입니다. 데이터·뉴스·인사이트·차트의 일관된 비교와 다국어 확장이 강점이며, 제품 기획·데이터 구조·사용자 시나리오·UI/UX·프론트엔드 개발을 직접 수행했습니다.',
      'PC·태블릿·모바일 반응형 Web에서 가상자산, 국내·해외주식, ETF를 하나의 탐색 흐름으로 연결한 멀티에셋 리서치 플랫폼입니다. 데이터·뉴스·인사이트·차트의 일관된 비교와 다국어 확장이 강점이며, PIXGROUND가 제품 기획·데이터 구조·사용자 시나리오·UI/UX·프론트엔드 개발을 통합 수행했습니다.'
    ),
    tags: ['Responsive Web', 'Multi-Asset Data', 'Global UX'],
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
    kicker: 'APPS-IN-TOSS · MCP · REWARD UX · END-TO-END',
    description: modeText(
      'Toss Apps-in-Toss Mini App 환경과 MCP 규격에 맞춰 박스 오픈·포인트·미션·이벤트·보관함을 반복 가능한 리워드 루프로 연결한 애플리케이션입니다. 제한된 플랫폼에서도 높은 재방문성과 명확한 보상 경험을 만드는 것이 강점이며, 기획·보상 시나리오·화면 설계·UI/UX·개발 전 과정을 직접 담당했습니다.',
      'Toss Apps-in-Toss Mini App 환경과 MCP 규격에 맞춰 박스 오픈·포인트·미션·이벤트·보관함을 반복 가능한 리워드 루프로 연결한 애플리케이션입니다. 제한된 플랫폼에서도 높은 재방문성과 명확한 보상 경험을 만드는 것이 강점이며, PIXGROUND가 기획·보상 시나리오·화면 설계·UI/UX·개발 전 과정을 담당했습니다.'
    ),
    tags: ['Apps-in-Toss · MCP', 'Reward Loop', 'Mini App Development'],
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
    kicker: 'ENTERPRISE SAAS · MULTI AI AGENT · END-TO-END',
    description: modeText(
      'PC·태블릿 중심의 Enterprise SaaS에서 인간과 여러 AI Agent가 의견을 제안·비교·분석하고 최종 판단의 근거를 기록하는 협업형 의사결정 플랫폼입니다. 채팅·회의 분석·다중 AI 관점·요약·실행 결과를 하나의 워크플로로 연결했으며, 서비스 구조·Agent 시나리오·정보 설계·UI/UX·프로토타입 및 프론트엔드 개발을 직접 수행했습니다.',
      'PC·태블릿 중심의 Enterprise SaaS에서 인간과 여러 AI Agent가 의견을 제안·비교·분석하고 최종 판단의 근거를 기록하는 협업형 의사결정 플랫폼입니다. 채팅·회의 분석·다중 AI 관점·요약·실행 결과를 하나의 워크플로로 연결했으며, PIXGROUND가 서비스 구조·Agent 시나리오·정보 설계·UI/UX·프로토타입 및 프론트엔드 개발을 End-to-End로 수행했습니다.'
    ),
    tags: ['Enterprise SaaS', 'Multi AI Agent', 'Decision Workflow'],
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
