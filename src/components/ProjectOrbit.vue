<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref
} from 'vue'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectMediaStage from './ProjectMediaStage.vue'

const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
})

const sectionRef = ref(null)
const scrollProgress = ref(0)
const mobileIndex = ref(0)

let trigger = null
let mm = null

const clamp = (value, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value))

const smooth = (value) => {
  const x = clamp(value)
  return x * x * (3 - 2 * x)
}

const projectCount = computed(() =>
  Math.max(props.projects.length, 1)
)

const segmentProgress = computed(() => {
  const scaled =
    scrollProgress.value *
    projectCount.value

  const index = Math.min(
    projectCount.value - 1,
    Math.floor(scaled)
  )

  return {
    index,
    local:
      index === projectCount.value - 1 &&
      scrollProgress.value >= 0.999
        ? 1
        : scaled - index
  }
})

const activeIndex = computed(() => {
  if (windowWidth.value <= 900) {
    return mobileIndex.value
  }

  return segmentProgress.value.index
})

const activeProject = computed(() =>
  props.projects[activeIndex.value] ||
  props.projects[0]
)

const localProgress = computed(() => {
  if (windowWidth.value <= 900) {
    return 0.62
  }

  return segmentProgress.value.local
})

const orbitTravel = computed(() => {
  if (windowWidth.value <= 900) {
    return mobileIndex.value
  }

  const {
    index,
    local
  } = segmentProgress.value

  // 프로젝트를 충분히 보여준 뒤 마지막 구간에서 다음 행성으로 이동.
  const transition =
    smooth(
      (local - 0.84) /
      0.16
    )

  if (
    index ===
    projectCount.value - 1
  ) {
    return index
  }

  return index + transition
})

const mediaProgress = computed(() => {
  if (windowWidth.value <= 900) {
    return 0.78
  }

  const local =
    segmentProgress.value.local

  const opening =
    smooth(
      (local - 0.18) /
      0.34
    )

  const closing =
    1 -
    smooth(
      (local - 0.76) /
      0.08
    )

  return clamp(
    opening * closing
  )
})

const phase = computed(() => {
  if (windowWidth.value <= 900) {
    return 'EXPLORE'
  }

  const p =
    segmentProgress.value.local

  if (p < 0.18) return 'ORBIT'
  if (p < 0.48) return 'UNFOLD'
  if (p < 0.76) return 'EXPLORE'
  if (p < 0.84) return 'CLOSE'
  return 'NEXT'
})

const windowWidth = ref(
  typeof window !== 'undefined'
    ? window.innerWidth
    : 1440
)

function updateWidth() {
  windowWidth.value =
    window.innerWidth
}

function getLogo(project) {
  if (!project) return null

  if (project.logo) return project.logo
  if (project.icon) return project.icon

  const media =
    project.media || []

  const logoItem =
    media.find(item =>
      item?.role === 'logo' ||
      item?.kind === 'logo'
    )

  if (logoItem?.src) {
    return logoItem.src
  }

  if (
    project.imageMode === 'logo' &&
    project.image
  ) {
    return project.image
  }

  // EarnBoxing처럼 대표 이미지가 실제 앱 아이콘일 때 활용.
  if (
    /earnboxing/i.test(
      project.name || ''
    ) &&
    project.image
  ) {
    return project.image
  }

  return null
}

function getInitials(name = '') {
  const clean =
    name
      .replace(/[^a-zA-Z0-9가-힣 ]/g, ' ')
      .trim()

  const parts =
    clean.split(/\s+/)

  if (parts.length >= 2) {
    return (
      parts[0][0] +
      parts[1][0]
    ).toUpperCase()
  }

  return clean
    .slice(0, 2)
    .toUpperCase()
}

function planetStyle(index) {
  const count =
    projectCount.value

  /*
   * active planet = 오른쪽 정면(0deg)
   * 타원형 궤도를 따라 나머지 프로젝트가 배치됩니다.
   */
  const angle =
    (
      (
        index -
        orbitTravel.value
      ) /
      count
    ) *
    Math.PI *
    2

  const x =
    Math.cos(angle) *
    42

  const y =
    Math.sin(angle) *
    27

  /*
   * 오른쪽(0deg)이 가장 앞,
   * 왼쪽(180deg)이 가장 뒤.
   */
  const depth =
    (
      Math.cos(angle) +
      1
    ) /
    2

  const scale =
    0.64 +
    depth * 0.44

  const opacity =
    0.24 +
    depth * 0.76

  return {
    left:
      `calc(50% + ${x}%)`,

    top:
      `calc(50% + ${y}%)`,

    transform:
      `translate(-50%, -50%) scale(${scale})`,

    opacity,

    zIndex:
      String(
        10 +
        Math.round(
          depth * 90
        )
      ),

    '--planet-depth':
      depth
  }
}

function selectMobile(index) {
  mobileIndex.value = index
}

onMounted(async () => {
  gsap.registerPlugin(
    ScrollTrigger
  )

  window.addEventListener(
    'resize',
    updateWidth,
    { passive: true }
  )

  updateWidth()

  await nextTick()

  mm =
    gsap.matchMedia()

  mm.add(
    '(min-width: 901px)',
    () => {
      if (!sectionRef.value) {
        return
      }

      trigger =
        ScrollTrigger.create({
          trigger:
            sectionRef.value,

          start:
            'top top',

          end: () =>
            `+=${Math.max(
              window.innerHeight *
              props.projects.length *
              1.05,
              2800
            )}`,

          pin: true,

          scrub: 0.7,

          anticipatePin: 1,

          onUpdate(self) {
            scrollProgress.value =
              self.progress
          },

          onRefresh() {
            scrollProgress.value =
              trigger?.progress || 0
          }
        })

      return () => {
        trigger?.kill()
        trigger = null
      }
    }
  )

  mm.add(
    '(max-width: 900px)',
    () => {
      scrollProgress.value = 0
    }
  )
})

onBeforeUnmount(() => {
  window.removeEventListener(
    'resize',
    updateWidth
  )

  trigger?.kill()
  mm?.revert()
})
</script>

<template>
  <section
    ref="sectionRef"
    id="work"
    class="orbital-work"
  >
    <div class="orbital-work__noise" aria-hidden="true"></div>

    <header class="orbital-work__header">
      <div>
        <p class="orbital-work__eyebrow">
          SELECTED WORK
        </p>

        <p class="orbital-work__sub">
          PROJECTS IN ORBIT
        </p>
      </div>

      <div
        class="orbital-work__phase"
        aria-hidden="true"
      >
        <span>{{ phase }}</span>

        <div>
          <i
            :style="{
              transform:
                `scaleX(${scrollProgress})`
            }"
          ></i>
        </div>

        <b>
          {{
            String(
              activeIndex + 1
            ).padStart(2, '0')
          }}
          /
          {{
            String(
              projectCount
            ).padStart(2, '0')
          }}
        </b>
      </div>
    </header>

    <div class="orbital-work__desktop">
      <div class="orbit-system">
        <div
          class="orbit-system__glow"
          aria-hidden="true"
        ></div>

        <div
          class="orbit-system__ellipse orbit-system__ellipse--outer"
          aria-hidden="true"
        ></div>

        <div
          class="orbit-system__ellipse orbit-system__ellipse--inner"
          aria-hidden="true"
        ></div>

        <div class="orbit-center">
          <span>
            {{
              String(
                activeIndex + 1
              ).padStart(2, '0')
            }}
            /
            {{
              String(
                projectCount
              ).padStart(2, '0')
            }}
          </span>

          <strong>
            {{ activeProject?.name }}
          </strong>

          <small>
            {{
              activeProject?.shortType ||
              activeProject?.type
            }}
          </small>
        </div>

        <button
          v-for="(project, index) in projects"
          :key="project.id || project.name"
          class="orbit-planet"
          :class="{
            'is-current':
              index === activeIndex
          }"
          :style="planetStyle(index)"
          type="button"
          :aria-label="`${project.name} 프로젝트`"
        >
          <span class="orbit-planet__halo"></span>

          <span class="orbit-planet__body">
            <img
              v-if="getLogo(project)"
              :src="getLogo(project)"
              :alt="`${project.name} 로고`"
            />

            <strong v-else>
              {{ getInitials(project.name) }}
            </strong>
          </span>

          <span class="orbit-planet__label">
            <b>{{ project.name }}</b>

            <small>
              {{
                project.shortType ||
                project.platform ||
                project.type
              }}
            </small>
          </span>
        </button>
      </div>

      <ProjectMediaStage
        :project="activeProject"
        :progress="mediaProgress"
        :phase="phase"
      />
    </div>

    <div class="orbital-work__mobile">
      <nav
        class="mobile-projects"
        aria-label="프로젝트 선택"
      >
        <button
          v-for="(project, index) in projects"
          :key="project.id || project.name"
          type="button"
          :class="{
            'is-active':
              index === activeIndex
          }"
          @click="selectMobile(index)"
        >
          <span>
            <img
              v-if="getLogo(project)"
              :src="getLogo(project)"
              :alt="`${project.name} 로고`"
            />

            <b v-else>
              {{ getInitials(project.name) }}
            </b>
          </span>

          <strong>
            {{ project.name }}
          </strong>
        </button>
      </nav>

      <div class="mobile-project-title">
        <span>
          {{
            String(
              activeIndex + 1
            ).padStart(2, '0')
          }}
          /
          {{
            String(
              projectCount
            ).padStart(2, '0')
          }}
        </span>

        <h2>
          {{ activeProject?.name }}
        </h2>

        <p>
          {{
            activeProject?.description
          }}
        </p>
      </div>

      <ProjectMediaStage
        :project="activeProject"
        :progress="0.82"
        phase="EXPLORE"
      />
    </div>

    <footer
      class="orbital-work__footer"
      aria-hidden="true"
    >
      <span>
        WHEEL TO ORBIT
      </span>

      <i></i>

      <strong>
        {{
          phase === 'EXPLORE'
            ? 'MEDIA OPEN'
            : 'SCROLL'
        }}
        ↓
      </strong>
    </footer>
  </section>
</template>

<style scoped>
.orbital-work {
  --ow-bg: #03070d;
  --ow-panel: #07111f;
  --ow-panel-2: #091629;
  --ow-white: #f5f8ff;
  --ow-muted: #7689a8;
  --ow-dim: #344662;
  --ow-blue: #247cff;
  --ow-cyan: #55dcff;
  --ow-line: rgba(53, 103, 184, .22);

  position: relative;

  min-height: 100svh;

  overflow: hidden;

  padding:
    28px
    clamp(24px, 4vw, 68px)
    24px;

  background:
    radial-gradient(
      ellipse at 35% 50%,
      rgba(19, 76, 166, .11),
      transparent 34%
    ),
    radial-gradient(
      circle at 77% 52%,
      rgba(20, 72, 151, .07),
      transparent 27%
    ),
    var(--ow-bg);

  color: var(--ow-white);
}

.orbital-work__noise {
  position: absolute;
  inset: 0;

  pointer-events: none;

  opacity: .12;

  background-image:
    radial-gradient(
      rgba(255, 255, 255, .45) .6px,
      transparent .6px
    );

  background-size: 37px 37px;

  mask-image:
    linear-gradient(
      to bottom,
      transparent,
      #000 20%,
      #000 78%,
      transparent
    );
}

.orbital-work__header {
  position: relative;

  z-index: 20;

  display: flex;

  align-items: flex-start;
  justify-content: space-between;

  min-height: 74px;

  border-top:
    1px solid
    rgba(67, 111, 177, .18);

  padding-top: 10px;
}

.orbital-work__eyebrow,
.orbital-work__sub {
  margin: 0;

  font-family:
    "Space Grotesk",
    sans-serif;
}

.orbital-work__eyebrow {
  color: var(--ow-cyan);

  font-size: 10px;

  font-weight: 700;

  letter-spacing: .14em;
}

.orbital-work__sub {
  margin-top: 10px;

  color: #5e718e;

  font-size: 8px;

  font-weight: 600;

  letter-spacing: .11em;
}

.orbital-work__phase {
  display: grid;

  grid-template-columns:
    auto
    180px
    auto;

  gap: 12px;

  align-items: center;

  margin-top: 3px;

  color: #6f8bb7;

  font:
    700 8px/1
    "Space Grotesk",
    sans-serif;

  letter-spacing: .09em;
}

.orbital-work__phase > div {
  position: relative;

  height: 1px;

  overflow: hidden;

  background:
    rgba(71, 117, 188, .27);
}

.orbital-work__phase > div i {
  position: absolute;
  inset: 0;

  transform-origin: left center;

  background: var(--ow-blue);
}

.orbital-work__phase b {
  color: var(--ow-cyan);
}

.orbital-work__desktop {
  position: relative;

  z-index: 2;

  display: grid;

  grid-template-columns:
    minmax(500px, 48%)
    minmax(520px, 52%);

  align-items: center;

  gap:
    clamp(18px, 3vw, 54px);

  min-height:
    calc(100svh - 142px);
}

/* =========================================================
   ELLIPTICAL ORBIT
   ========================================================= */

.orbit-system {
  position: relative;

  width: 100%;
  height:
    min(
      690px,
      calc(100svh - 190px)
    );

  min-height: 560px;

  perspective: 1000px;
}

.orbit-system__glow {
  position: absolute;

  left: 50%;
  top: 50%;

  width: 58%;
  height: 44%;

  transform:
    translate(-50%, -50%);

  border-radius: 50%;

  background:
    rgba(28, 99, 231, .07);

  filter: blur(70px);
}

.orbit-system__ellipse {
  position: absolute;

  left: 50%;
  top: 50%;

  transform:
    translate(-50%, -50%);

  border:
    1px solid
    rgba(50, 105, 196, .22);

  border-radius: 50%;
}

.orbit-system__ellipse--outer {
  width: 90%;
  height: 58%;
}

.orbit-system__ellipse--inner {
  width: 68%;
  height: 40%;

  border-color:
    rgba(50, 105, 196, .10);
}

.orbit-center {
  position: absolute;

  left: 50%;
  top: 50%;

  z-index: 12;

  width: 210px;

  transform:
    translate(-50%, -50%);

  text-align: center;
}

.orbit-center span {
  display: block;

  color: var(--ow-cyan);

  font:
    700 10px/1
    "Space Grotesk",
    sans-serif;

  letter-spacing: .12em;
}

.orbit-center strong {
  display: block;

  margin-top: 14px;

  color: var(--ow-white);

  font:
    700 24px/.95
    "Space Grotesk",
    sans-serif;

  letter-spacing: -.035em;
}

.orbit-center small {
  display: block;

  margin-top: 9px;

  color: #637897;

  font:
    600 8px/1.3
    "Space Grotesk",
    sans-serif;

  text-transform: uppercase;
}

.orbit-planet {
  position: absolute;

  width:
    clamp(72px, 6vw, 96px);

  aspect-ratio: 1;

  padding: 0;

  border: 0;

  background: transparent;

  transition:
    left .18s linear,
    top .18s linear,
    opacity .18s linear,
    transform .18s linear;

  cursor: default;

  pointer-events: none;
}

.orbit-planet__halo {
  position: absolute;

  inset: -16px;

  border:
    1px solid
    rgba(57, 126, 240, .14);

  border-radius: 50%;

  opacity:
    calc(
      .12 +
      var(--planet-depth) * .6
    );

  box-shadow:
    0 0 42px
    rgba(30, 113, 255, .08);
}

.orbit-planet__body {
  position: absolute;

  inset: 0;

  display: grid;
  place-items: center;

  overflow: hidden;

  border:
    1px solid
    rgba(70, 137, 242, .30);

  border-radius: 26%;

  background:
    linear-gradient(
      145deg,
      rgba(16, 38, 76, .96),
      rgba(5, 14, 29, .98)
    );

  box-shadow:
    0 24px 54px
    rgba(0, 0, 0, .34),
    inset
    0 0 25px
    rgba(38, 121, 255, .06);
}

.orbit-planet.is-current
.orbit-planet__body {
  border-color:
    rgba(85, 220, 255, .72);

  box-shadow:
    0 30px 64px
    rgba(0, 0, 0, .42),
    0 0 36px
    rgba(36, 124, 255, .13);
}

.orbit-planet__body img {
  width: 68%;
  height: 68%;

  object-fit: contain;
}

.orbit-planet__body strong {
  color: #ddecff;

  font:
    700 18px/1
    "Space Grotesk",
    sans-serif;

  letter-spacing: -.03em;
}

.orbit-planet__label {
  position: absolute;

  left: 50%;
  top: calc(100% + 15px);

  display: grid;

  gap: 4px;

  min-width: 150px;

  transform:
    translateX(-50%);

  text-align: center;

  white-space: nowrap;
}

.orbit-planet__label b {
  color: #dce8f8;

  font:
    700 9px/1
    "Space Grotesk",
    sans-serif;
}

.orbit-planet__label small {
  color: #4e6584;

  font:
    600 7px/1
    "Space Grotesk",
    sans-serif;

  text-transform: uppercase;
}

.orbit-planet.is-current
.orbit-planet__label b {
  color: #fff;
}

.orbit-planet.is-current
.orbit-planet__label small {
  color: var(--ow-cyan);
}

/* =========================================================
   MOBILE
   ========================================================= */

.orbital-work__mobile {
  display: none;
}

.orbital-work__footer {
  position: absolute;

  left:
    clamp(24px, 4vw, 68px);

  right:
    clamp(24px, 4vw, 68px);

  bottom: 22px;

  z-index: 30;

  display: grid;

  grid-template-columns:
    auto
    1fr
    auto;

  gap: 15px;

  align-items: center;

  color: #617da8;

  font:
    700 7px/1
    "Space Grotesk",
    sans-serif;

  letter-spacing: .1em;
}

.orbital-work__footer i {
  height: 1px;

  background:
    rgba(67, 111, 177, .24);
}

.orbital-work__footer strong {
  color: #8caddd;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (
  max-width: 1180px
) {
  .orbital-work__desktop {
    grid-template-columns:
      minmax(440px, 44%)
      minmax(480px, 56%);

    gap: 10px;
  }

  .orbit-system {
    min-height: 520px;
  }
}

@media (
  max-width: 900px
) {
  .orbital-work {
    min-height: auto;

    overflow: visible;

    padding:
      26px 18px
      54px;
  }

  .orbital-work__phase {
    display: none;
  }

  .orbital-work__desktop {
    display: none;
  }

  .orbital-work__mobile {
    position: relative;

    z-index: 2;

    display: block;
  }

  .mobile-projects {
    display: flex;

    gap: 10px;

    overflow-x: auto;

    margin:
      6px -18px
      30px;

    padding:
      12px 18px;

    scrollbar-width: none;
  }

  .mobile-projects::-webkit-scrollbar {
    display: none;
  }

  .mobile-projects button {
    flex: 0 0 auto;

    display: flex;

    align-items: center;

    gap: 10px;

    min-width: 160px;

    padding: 10px 12px;

    border:
      1px solid
      rgba(58, 104, 173, .19);

    border-radius: 14px;

    background:
      rgba(7, 17, 31, .65);

    color: #697c99;

    text-align: left;
  }

  .mobile-projects button.is-active {
    border-color:
      rgba(85, 220, 255, .48);

    color: #fff;
  }

  .mobile-projects button > span {
    display: grid;

    place-items: center;

    width: 38px;
    height: 38px;

    overflow: hidden;

    border-radius: 10px;

    background: #071329;
  }

  .mobile-projects img {
    width: 70%;
    height: 70%;

    object-fit: contain;
  }

  .mobile-projects b {
    font:
      700 10px/1
      "Space Grotesk",
      sans-serif;
  }

  .mobile-projects strong {
    font:
      700 10px/1
      "Space Grotesk",
      sans-serif;
  }

  .mobile-project-title {
    max-width: 620px;

    margin-bottom: 22px;
  }

  .mobile-project-title span {
    color: var(--ow-cyan);

    font:
      700 9px/1
      "Space Grotesk",
      sans-serif;
  }

  .mobile-project-title h2 {
    margin:
      12px 0 0;

    font:
      700
      clamp(40px, 11vw, 62px)
      /.95
      "Space Grotesk",
      sans-serif;

    letter-spacing: -.055em;
  }

  .mobile-project-title p {
    max-width: 560px;

    margin:
      17px 0 0;

    color: #7d8ea7;

    font:
      400 13px/1.7
      "Noto Sans KR",
      sans-serif;
  }

  .orbital-work__footer {
    position: static;

    margin-top: 28px;
  }
}
</style>
