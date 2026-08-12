<template>
  <PointerParticles />

  <header
    class="site-header"
    :class="{ 'is-scrolled': scrolled }"
  >
    <a
      class="brand"
      href="#top"
      aria-label="PIXGROUND 홈"
    >
      PIXGROUND
    </a>

    <nav
      class="desktop-nav"
      aria-label="주요 메뉴"
    >
      <a href="#work">WORK</a>
      <a href="#capabilities">CAPABILITIES</a>
      <a href="#studio">STUDIO</a>
      <a href="#contact">CONTACT</a>
    </nav>

    <button
      class="mobile-menu-button"
      type="button"
      :aria-expanded="menuOpen"
      @click="menuOpen = !menuOpen"
    >
      MENU
    </button>

    <div
      v-if="menuOpen"
      class="mobile-menu"
    >
      <a
        href="#work"
        @click="menuOpen = false"
      >
        WORK
      </a>

      <a
        href="#capabilities"
        @click="menuOpen = false"
      >
        CAPABILITIES
      </a>

      <a
        href="#studio"
        @click="menuOpen = false"
      >
        STUDIO
      </a>

      <a
        href="#contact"
        @click="menuOpen = false"
      >
        CONTACT
      </a>
    </div>
  </header>

  <main id="top">
    <section
      class="hero section-dark"
    >
      <div
        class="
          hero__inner
          content-shell
        "
      >
        <div class="hero__copy">
          <p class="eyebrow">
            WEB · APP · PLATFORM · SAAS
          </p>

          <h1>
            DIGITAL PRODUCTS,<br />
            <em>BUILT WITH DEPTH.</em>
          </h1>

          <p class="hero__lead">
            픽스그라운드는 아이디어를 화면으로만 만드는 것이 아니라,
            사용자 흐름과 시스템 구조를 함께 설계해 실제로 운영 가능한
            제품으로 완성합니다.
          </p>

          <div class="hero__actions">
            <a
              href="#work"
              class="text-link"
            >
              VIEW SELECTED WORK
              <span>↗</span>
            </a>

            <a
              href="#contact"
              class="quiet-link"
            >
              프로젝트 상담
              <span>↗</span>
            </a>
          </div>
        </div>

        <!--
          Hero 오른쪽 전용 Cube Slot.
          기존 CoreVisual 대신 3x3x3 Cube가 이 영역 안에 위치합니다.
        -->
        <div class="hero__core-slot">
          <div class="hero__core-motion">
            <CubeCore3D
              :size="255"
              :gap="5"
              :auto-rotate="true"
              :scroll-rotate="true"
              :twist="true"
              :twist-interval="1450"
              :twist-duration="520"
            />
          </div>
        </div>

        <div
          class="hero__projects"
          aria-label="대표 프로젝트"
        >
          <span>SELECTED PROJECTS</span>

          <b
            v-for="project in projects"
            :key="project.id"
          >
            {{ project.name }}
          </b>

          <i>SCROLL ↓</i>
        </div>
      </div>
    </section>

    <ProjectOrbit
      :projects="projects"
    />

    <section
      id="capabilities"
      class="
        capabilities
        section-dark
      "
    >
      <div class="content-shell">
        <p class="eyebrow">
          CAPABILITIES
        </p>

        <div class="section-intro">
          <h2>
            WE DESIGN THE SYSTEM,<br />
            NOT JUST THE SCREEN.
          </h2>

          <p>
            웹 에이전시의 역할을 페이지 제작으로 좁히지 않습니다.
            서비스 구조와 사용자 흐름, 개발 구조와 운영까지
            하나의 제품으로 연결합니다.
          </p>
        </div>

        <div class="capability-list">
          <a
            v-for="(item, i) in capabilities"
            :key="item.title"
            href="#contact"
            class="capability-row"
          >
            <span class="capability-row__index">
              0{{ i + 1 }}
            </span>

            <strong>
              {{ item.title }}
            </strong>

            <p>
              {{ item.description }}
            </p>

            <small>
              {{ item.scope }}
            </small>

            <i>↗</i>
          </a>
        </div>
      </div>
    </section>

    <section
      class="
        process
        section-dark
      "
    >
      <div class="content-shell">
        <p class="eyebrow">
          HOW WE BUILD
        </p>

        <div
          class="
            section-intro
            section-intro--split
          "
        >
          <h2>
            CLEAR PROCESS.<br />
            FEWER SURPRISES.
          </h2>

          <p>
            효과보다 구조를 먼저 정하고,
            실제 개발 조건을 확인한 뒤 화면을 확정합니다.
          </p>
        </div>

        <div class="process-grid">
          <article
            v-for="(step, i) in process"
            :key="step.title"
          >
            <span>
              0{{ i + 1 }}
            </span>

            <h3>
              {{ step.title }}
            </h3>

            <p>
              {{ step.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section
      id="studio"
      class="
        studio
        section-dark
      "
    >
      <div
        class="
          content-shell
          studio__grid
        "
      >
        <div>
          <p class="eyebrow">
            STUDIO PRINCIPLE
          </p>

          <h2>
            SMALL TEAM.<br />
            DEEP OWNERSHIP.
          </h2>

          <p class="studio__lead">
            많은 프로젝트를 동시에 처리하기보다,
            요구사항과 범위를 명확히 정리하고 제품 완성도에 집중합니다.
            디자인·개발·운영이 분리되지 않도록 하나의 흐름으로 관리합니다.
          </p>
        </div>

        <dl class="studio__facts">
          <div>
            <dt>FOCUS</dt>
            <dd>
              WEB · APP · SAAS
            </dd>
          </div>

          <div>
            <dt>PROCESS</dt>
            <dd>
              UIUX → DEVELOP → DEPLOY
            </dd>
          </div>

          <div>
            <dt>QUALITY</dt>
            <dd>
              RESPONSIVE · ACCESSIBLE · MAINTAINABLE
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section
      id="contact"
      class="
        contact
        section-dark
      "
    >
      <div
        class="
          content-shell
          contact__grid
        "
      >
        <div class="contact__copy">
          <p class="eyebrow">
            START A PROJECT
          </p>

          <h2>
            HAVE SOMETHING<br />
            WORTH BUILDING?
          </h2>

          <p>
            웹사이트, 앱, 플랫폼 또는 SaaS가 필요하다면
            현재 아이디어와 준비 상태를 알려주세요.
            기능·예산·일정에 맞는 현실적인 제작 범위를 함께 정리합니다.
          </p>

          <a
            class="
              text-link
              text-link--large
            "
            href="mailto:hello@pixground.com"
          >
            START A PROJECT
            <span>↗</span>
          </a>
        </div>

        <div class="portal-wrap">
          <img
            :src="portal"
            alt="PIXGROUND의 프로젝트 시작을 상징하는 네온 포털"
            loading="lazy"
          />

          <span>
            INDEPENDENT PORTAL ASSET
          </span>
        </div>
      </div>
    </section>
  </main>

  <footer
    class="
      site-footer
      section-dark
    "
  >
    <div class="content-shell">
      <strong>PIXGROUND</strong>

      <span>
        Web · App · Platform · SaaS
      </span>

      <nav>
        <a href="#work">
          WORK
        </a>

        <a href="#capabilities">
          CAPABILITIES
        </a>

        <a href="#contact">
          CONTACT
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup>
import {
  onBeforeUnmount,
  onMounted,
  ref
} from 'vue'

import gsap from 'gsap'

import {
  ScrollTrigger
} from 'gsap/ScrollTrigger'

import PointerParticles
  from './components/PointerParticles.vue'

import ProjectOrbit
  from './components/ProjectOrbit.vue'

import CubeCore3D
  from './components/CubeCore3D.vue'

import {
  projects
} from './data/projects'

import portal
  from './assets/portal.webp'

const scrolled = ref(false)
const menuOpen = ref(false)

let mm

const capabilities = [
  {
    title: 'PRODUCT & UX',
    description:
      '서비스 구조 · 사용자 흐름 · 화면 설계',
    scope:
      'IA / UX / PROTOTYPE'
  },
  {
    title: 'WEB DEVELOPMENT',
    description:
      '브랜드 웹 · 플랫폼 · 관리자 · API',
    scope:
      'FRONTEND / BACKEND'
  },
  {
    title: 'APP & MINI APP',
    description:
      'Android · Cross-platform · Apps-in-Toss',
    scope:
      'MOBILE / INTEGRATION'
  },
  {
    title: 'SAAS & SYSTEM',
    description:
      '기업용 SaaS · 실시간 · AI 연동',
    scope:
      'ARCHITECTURE / OPS'
  }
]

const process = [
  {
    title: 'DISCOVER',
    description:
      '기능 요구를 사용자 목표·운영 조건·기술 제약으로 다시 정리합니다.'
  },
  {
    title: 'DESIGN',
    description:
      '정보구조와 인터랙션을 먼저 검증하고 화면을 확정합니다.'
  },
  {
    title: 'BUILD & SHIP',
    description:
      '프론트·백엔드·배포를 연결해 실제 환경에서 검증합니다.'
  }
]

function onScroll() {
  scrolled.value =
    window.scrollY > 24
}

onMounted(() => {
  gsap.registerPlugin(
    ScrollTrigger
  )

  window.addEventListener(
    'scroll',
    onScroll,
    {
      passive: true
    }
  )

  onScroll()

  mm =
    gsap.matchMedia()

  mm.add(
    '(prefers-reduced-motion: no-preference)',
    () => {
      /*
       * CubeCore3D 내부 transform은
       * 큐브 전체 회전 / layer twist를 담당합니다.
       *
       * GSAP은 바깥 wrapper만 움직여
       * transform 충돌을 방지합니다.
       */
      gsap.to(
        '.hero__core-motion',
        {
          yPercent: 6,
          scale: 1.035,
          ease: 'none',

          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        }
      )

      gsap.from(
        '.capability-row',
        {
          opacity: 0,
          y: 22,
          stagger: 0.08,
          duration: 0.65,
          ease: 'power3.out',

          scrollTrigger: {
            trigger:
              '.capability-list',

            start:
              'top 78%'
          }
        }
      )

      gsap.from(
        '.process-grid article',
        {
          opacity: 0,
          y: 28,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',

          scrollTrigger: {
            trigger:
              '.process-grid',

            start:
              'top 78%'
          }
        }
      )

      gsap.to(
        '.portal-wrap img',
        {
          scale: 1.035,
          yPercent: -3,
          ease: 'none',

          scrollTrigger: {
            trigger:
              '.contact',

            start:
              'top bottom',

            end:
              'bottom bottom',

            scrub: 1
          }
        }
      )
    }
  )
})

onBeforeUnmount(() => {
  window.removeEventListener(
    'scroll',
    onScroll
  )

  mm?.revert()
})
</script>

<style scoped>
/*
 * Hero의 기존 레이아웃과 관계없이
 * Cube를 오른쪽 visual zone에 고정합니다.
 */
.hero__inner {
  position: relative;
}

.hero__core-slot {
  position: absolute;

  right:
    clamp(
      28px,
      3.2vw,
      60px
    );

  top: 49%;

  width:
    clamp(
      390px,
      31vw,
      500px
    );

  height:
    clamp(
      390px,
      31vw,
      500px
    );

  transform:
    translateY(-50%);

  display: grid;
  place-items: center;

  z-index: 3;

  pointer-events: auto;
}

.hero__core-motion {
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;

  transform-origin:
    center center;
}

/*
 * 기존 CSS에 CoreVisual용 레이아웃이 남아 있어도
 * 새 Cube slot이 그 규칙을 받지 않도록 별도 class로 분리.
 */
@media (
  max-width: 1180px
) {
  .hero__core-slot {
    right: 10px;

    width: 390px;
    height: 390px;
  }
}

@media (
  max-width: 900px
) {
  .hero__core-slot {
    position: relative;

    right: auto;
    top: auto;

    width: 100%;
    height: 390px;

    transform: none;

    margin:
      36px auto
      12px;
  }
}

@media (
  max-width: 560px
) {
  .hero__core-slot {
    height: 330px;
  }
}
</style>
