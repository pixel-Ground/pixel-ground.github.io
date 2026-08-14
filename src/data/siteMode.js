// 'portfolio' = 취업 포트폴리오 / 'business' = 기업·스튜디오 소개
export const SITE_MODE = 'portfolio'

export const siteCopy = {
  portfolio: {
    brand: 'PIXGROUND / PORTFOLIO',
    brandAria: 'PIXGROUND 포트폴리오 홈',
    studioNav: 'ABOUT',
    heroLines: [
      '아이디어를 화면에 표현하는 데 그치지 않고,',
      '사용자 흐름과 시스템 구조를 함께 설계해',
      '실제로 동작하는 제품으로 구현하는 Product Designer & Developer입니다.'
    ],
    secondaryCta: '채용 및 협업 문의',
    capabilityHeading: ['I DESIGN THE SYSTEM,', 'NOT JUST THE SCREEN.'],
    capabilityIntro:
      '제품 기획과 사용자 흐름, UI/UX 디자인, 개발 구조와 구현까지 전 과정을 직접 연결합니다.',
    processEyebrow: 'HOW I BUILD',
    studioEyebrow: 'ABOUT ME',
    studioHeading: ['ONE PERSON.', 'DEEP OWNERSHIP.'],
    studioLead:
      '기획·시나리오·화면 디자인·UI/UX·개발을 분리하지 않고 하나의 제품 흐름으로 설계합니다. 각 프로젝트의 문제 정의부터 실제 구현과 운영 가능성까지 직접 개발했습니다.',
    contactEyebrow: 'LET\'S WORK TOGETHER',
    contactHeading: ['BUILDING THE NEXT', 'PRODUCT TOGETHER.'],
    contactDescription:
      '기획부터 UI/UX 디자인과 개발까지 제품의 전 과정을 연결해, 아이디어를 실제 동작하는 결과물로 완성해왔습니다. 사용자와 비즈니스의 문제를 함께 해결할 팀의 채용 및 협업 제안을 기다립니다.',
    contactCta: 'CONTACT ME',
    portalAlt: '새로운 팀과의 연결을 상징하는 네온 포털',
    footerBrand: 'PIXGROUND PORTFOLIO'
  },

  business: {
    brand: 'PIXGROUND',
    brandAria: 'PIXGROUND 홈',
    studioNav: 'STUDIO',
    heroLines: [
      '픽스그라운드는 아이디어를 화면으로만 만드는 것이 아니라,',
      '사용자 흐름과 시스템 구조를 함께 설계해',
      '실제로 운영 가능한 제품으로 완성합니다.'
    ],
    secondaryCta: '프로젝트 상담',
    capabilityHeading: ['WE DESIGN THE SYSTEM,', 'NOT JUST THE SCREEN.'],
    capabilityIntro:
      '웹 에이전시의 역할을 페이지 제작으로 좁히지 않습니다. 서비스 구조와 사용자 흐름, 개발 구조와 운영까지 하나의 제품으로 연결합니다.',
    processEyebrow: 'HOW WE BUILD',
    studioEyebrow: 'STUDIO PRINCIPLE',
    studioHeading: ['SMALL TEAM.', 'DEEP OWNERSHIP.'],
    studioLead:
      '많은 프로젝트를 동시에 처리하기보다, 요구사항과 범위를 명확히 정리하고 제품 완성도에 집중합니다. 디자인·개발·운영이 분리되지 않도록 하나의 흐름으로 관리합니다.',
    contactEyebrow: 'START A PROJECT',
    contactHeading: ['HAVE SOMETHING', 'WORTH BUILDING?'],
    contactDescription:
      '웹사이트, 앱, 플랫폼 또는 SaaS가 필요하다면 현재 아이디어와 준비 상태를 알려주세요. 기능·예산·일정에 맞는 현실적인 제작 범위를 함께 정리합니다.',
    contactCta: 'START A PROJECT',
    portalAlt: 'PIXGROUND의 프로젝트 시작을 상징하는 네온 포털',
    footerBrand: 'PIXGROUND'
  }
}

export const currentSiteCopy = siteCopy[SITE_MODE]
