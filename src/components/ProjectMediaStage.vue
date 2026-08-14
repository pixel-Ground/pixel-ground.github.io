<script setup>
import {
  computed,
  onBeforeUnmount,
  ref,
  watch
} from 'vue'

const props = defineProps({
  project: {
    type: Object,
    default: null
  },

  progress: {
    type: Number,
    default: 0
  },

  phase: {
    type: String,
    default: 'ORBIT'
  }
})

const lightbox = ref(null)

const clamp = (value, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value))

const smooth = (value) => {
  const x = clamp(value)
  return x * x * (3 - 2 * x)
}

const p = computed(() =>
  smooth(
    clamp(props.progress)
  )
)

/*
 * MEDIA / LOGO cross-fade
 *
 * p = 0.00  Logo 100%, Media 0%
 * p ≈ 0.45  Media opening, Logo fading
 * p >= 0.82 Media 100%, Logo 0%
 *
 * progress가 역방향으로 감소하면
 * 동일 계산식이 자동으로 반대로 재생되므로
 * Media가 접힐 때 Logo가 자연스럽게 복귀합니다.
 */
const mediaVisibility = computed(() =>
  smooth(
    (p.value - 0.04) / 0.66
  )
)

const logoVisibility = computed(() =>
  1 -
  smooth(
    (p.value - 0.28) / 0.46
  )
)

function inferKind(project) {
  const haystack = [
    project?.type,
    project?.platform,
    project?.shortType,
    project?.kicker
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  if (
    haystack.includes('mobile') ||
    haystack.includes('android') ||
    haystack.includes('ios') ||
    haystack.includes('mini app') ||
    haystack.includes('toss')
  ) {
    return 'app'
  }

  if (
    haystack.includes('saas') ||
    haystack.includes('enterprise')
  ) {
    return 'saas'
  }

  return 'web'
}

const kind = computed(() =>
  inferKind(props.project)
)

const projectLink = computed(() =>
  props.project?.url ||
  props.project?.href ||
  ''
)

const isGooglePlayLink = computed(() =>
  /play\.google\.com/i.test(
    projectLink.value
  )
)

const projectLinkLabel = computed(() =>
  props.project?.cta ||
  'VIEW PROJECT'
)

const media = computed(() => {
  const project = props.project

  if (!project) {
    return {
      logo: null,
      screens: []
    }
  }

  const list =
    project.media || []

  const logo =
    project.logo ||
    project.icon ||
    list.find(item =>
      item?.role === 'logo' ||
      item?.kind === 'logo'
    )?.src ||
    (
      project.imageMode === 'logo'
        ? project.image
        : null
    ) ||
    null

  const explicitScreens =
    list.filter(item =>
      item?.src &&
      item?.role !== 'logo' &&
      item?.kind !== 'logo'
    )

  const fallback = []

  if (
    project.image &&
    project.image !== logo
  ) {
    fallback.push({
      id: 'project-image',
      src: project.image,
      label: 'PROJECT SCREEN',
      alt:
        `${project.name} 프로젝트 화면`
    })
  }

  return {
    logo,
    screens:
      explicitScreens.length
        ? explicitScreens
        : fallback
  }
})

const screenOne = computed(() =>
  media.value.screens[0] ||
  null
)

const screenTwo = computed(() =>
  media.value.screens[1] ||
  media.value.screens[0] ||
  null
)

/*
 * 초기 Logo Focus 상태.
 * Media가 충분히 펼쳐지는 구간부터
 * logoVisibility가 1 → 0으로 감소합니다.
 */
const logoStyle = computed(() => {
  const progress = p.value
  const visible = logoVisibility.value

  return {
    transform:
      `translate(-50%, -50%) ` +
      `translateY(${46 * progress}px) ` +
      `scale(${0.90 + visible * 0.10})`,

    opacity: visible,

    pointerEvents:
      visible > 0.15
        ? 'auto'
        : 'none'
  }
})

const phoneLeftStyle = computed(() => ({
  transform:
    `translate(-50%, -50%) ` +
    `translateX(${-168 * p.value}px) ` +
    `translateY(${-8 * p.value}px) ` +
    `rotate(${-10 * p.value}deg) ` +
    `scale(${0.90 + 0.10 * p.value})`,

  opacity:
    mediaVisibility.value,

  pointerEvents:
    mediaVisibility.value > 0.35
      ? 'auto'
      : 'none'
}))

const phoneRightStyle = computed(() => ({
  transform:
    `translate(-50%, -50%) ` +
    `translateX(${168 * p.value}px) ` +
    `translateY(${-8 * p.value}px) ` +
    `rotate(${10 * p.value}deg) ` +
    `scale(${0.90 + 0.10 * p.value})`,

  opacity:
    mediaVisibility.value,

  pointerEvents:
    mediaVisibility.value > 0.35
      ? 'auto'
      : 'none'
}))

const browserStyle = computed(() => ({
  transform:
    `translate(-50%, -50%) ` +
    `translateY(${-8 * p.value}px) ` +
    `scale(${0.72 + 0.28 * p.value})`,

  opacity:
    mediaVisibility.value,

  pointerEvents:
    mediaVisibility.value > 0.35
      ? 'auto'
      : 'none'
}))

const browserSideStyle = computed(() => ({
  transform:
    `translate(-50%, -50%) ` +
    `translateX(${225 * p.value}px) ` +
    `translateY(${58 * p.value}px) ` +
    `rotate(${7 * p.value}deg) ` +
    `scale(${0.56 + 0.18 * p.value})`,

  opacity:
    smooth(
      (p.value - 0.22) / 0.50
    ),

  pointerEvents:
    p.value > 0.38
      ? 'auto'
      : 'none'
}))

function initials(name = '') {
  return name
    .replace(
      /[^a-zA-Z0-9가-힣]/g,
      ''
    )
    .slice(0, 2)
    .toUpperCase()
}

function open(item) {
  if (!item?.src) {
    return
  }

  lightbox.value = item
}

function close() {
  lightbox.value = null
}

function onKeydown(event) {
  if (event.key === 'Escape') {
    close()
  }
}

watch(
  lightbox,
  value => {
    document
      .documentElement
      .classList
      .toggle(
        'orbit-media-lightbox-open',
        !!value
      )

    if (value) {
      window.addEventListener(
        'keydown',
        onKeydown
      )
    } else {
      window.removeEventListener(
        'keydown',
        onKeydown
      )
    }
  }
)

onBeforeUnmount(() => {
  document
    .documentElement
    .classList
    .remove(
      'orbit-media-lightbox-open'
    )

  window.removeEventListener(
    'keydown',
    onKeydown
  )
})
</script>

<template>
  <article
    v-if="project"
    class="media-stage"
    :class="[
      `media-stage--${kind}`,
      {
        'is-open':
          progress > .5,
        'is-media-focused':
          logoVisibility < .15
      }
    ]"
  >
    <div
      class="media-stage__rings"
      aria-hidden="true"
    >
      <i></i>
      <i></i>
    </div>

    <header class="media-stage__header">
      <div>
        <span>
          {{
            project.platform ||
            project.type
          }}
        </span>

        <h2>
          {{ project.name }}
        </h2>
      </div>

      <strong>
        {{ phase }}
      </strong>
    </header>

    <!-- APP -->
    <div
      v-if="kind === 'app'"
      class="app-fan"
    >
      <button
        class="
          phone-device
          phone-device--left
        "
        :style="phoneLeftStyle"
        type="button"
        :disabled="!screenOne?.src"
        @click="open(screenOne)"
      >
        <div class="phone-device__speaker"></div>

        <div class="phone-device__screen">
          <img
            v-if="screenOne?.src"
            :src="screenOne.src"
            :alt="
              screenOne.alt ||
              `${project.name} 앱 화면 1`
            "
          />

          <span v-else>
            <small>SCREEN 01</small>
            <b>IMAGE SLOT</b>
          </span>
        </div>
      </button>

      <button
        class="
          phone-device
          phone-device--right
        "
        :style="phoneRightStyle"
        type="button"
        :disabled="!screenTwo?.src"
        @click="open(screenTwo)"
      >
        <div class="phone-device__speaker"></div>

        <div class="phone-device__screen">
          <img
            v-if="screenTwo?.src"
            :src="screenTwo.src"
            :alt="
              screenTwo.alt ||
              `${project.name} 앱 화면 2`
            "
          />

          <span v-else>
            <small>SCREEN 02</small>
            <b>IMAGE SLOT</b>
          </span>
        </div>
      </button>

      <!--
        초기엔 Logo.
        Phone 2개가 완전히 펼쳐질수록 Hide.
        Phone이 다시 접힐 때 자동 복귀.
      -->
      <button
        class="media-logo"
        :style="logoStyle"
        type="button"
        :disabled="!media.logo"
        @click="
          open(
            media.logo
              ? {
                  src:
                    media.logo,
                  label:
                    'PROJECT LOGO',
                  alt:
                    `${project.name} 로고`
                }
              : null
          )
        "
      >
        <img
          v-if="media.logo"
          :src="media.logo"
          :alt="`${project.name} 로고`"
        />

        <strong v-else>
          {{ initials(project.name) }}
        </strong>
      </button>
    </div>

    <!-- WEB / SAAS -->
    <div
      v-else
      class="browser-fan"
    >
      <button
        class="
          browser-device
          browser-device--main
        "
        :style="browserStyle"
        type="button"
        :disabled="!screenOne?.src"
        @click="open(screenOne)"
      >
        <div class="browser-device__chrome">
          <span>
            <i></i>
            <i></i>
            <i></i>
          </span>

          <b>
            {{ project.name }}
          </b>
        </div>

        <div class="browser-device__viewport">
          <img
            v-if="screenOne?.src"
            :src="screenOne.src"
            :alt="
              screenOne.alt ||
              `${project.name} 웹 화면`
            "
          />

          <span v-else>
            <small>WEB SCREEN</small>
            <b>BROWSER PREVIEW</b>
          </span>
        </div>
      </button>

      <button
        class="
          browser-device
          browser-device--side
        "
        :style="browserSideStyle"
        type="button"
        :disabled="!screenTwo?.src"
        @click="open(screenTwo)"
      >
        <div class="browser-device__chrome">
          <span>
            <i></i>
            <i></i>
            <i></i>
          </span>
        </div>

        <div class="browser-device__viewport">
          <img
            v-if="screenTwo?.src"
            :src="screenTwo.src"
            :alt="
              screenTwo.alt ||
              `${project.name} 보조 화면`
            "
          />

          <span v-else>
            <b>SCREEN 02</b>
          </span>
        </div>
      </button>

      <button
        class="
          media-logo
          media-logo--browser
        "
        :style="logoStyle"
        type="button"
        :disabled="!media.logo"
        @click="
          open(
            media.logo
              ? {
                  src:
                    media.logo,
                  label:
                    'PROJECT LOGO',
                  alt:
                    `${project.name} 로고`
                }
              : null
          )
        "
      >
        <img
          v-if="media.logo"
          :src="media.logo"
          :alt="`${project.name} 로고`"
        />

        <strong v-else>
          {{ initials(project.name) }}
        </strong>
      </button>
    </div>

    <div class="media-stage__copy">
      <p v-if="project.kicker">
        {{ project.kicker }}
      </p>

      <span>
        {{ project.description }}
      </span>

      <a
        v-if="projectLink"
        :class="[
          'media-stage__cta',
          {
            'media-stage__cta--play-store':
              isGooglePlayLink
          }
        ]"
        :href="projectLink"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="
          isGooglePlayLink
            ? `${project.name} Google Play 다운로드`
            : `${project.name} 프로젝트로 이동`
        "
      >
        <template v-if="isGooglePlayLink">
          <svg
            class="media-stage__play-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="#00d9ff"
              d="M3.2 2.1 14.5 12 3.2 21.9c-.3-.4-.5-.9-.5-1.5V3.6c0-.6.2-1.1.5-1.5Z"
            />
            <path
              fill="#00ef78"
              d="m3.2 2.1 13.4 7.6-2.1 2.3L3.2 2.1Z"
            />
            <path
              fill="#ffd629"
              d="m14.5 12 2.1 2.3-13.4 7.6L14.5 12Z"
            />
            <path
              fill="#ff4057"
              d="m16.6 9.7 3.1 1.8c.8.4.8.7 0 1.1l-3.1 1.8-2.1-2.4 2.1-2.3Z"
            />
          </svg>

          <span>
            <small>다운로드</small>
            <strong>Google Play</strong>
          </span>
        </template>

        <template v-else>
          <span>
            {{ projectLinkLabel }}
          </span>
          <b aria-hidden="true">↗</b>
        </template>
      </a>
    </div>

    <Teleport to="body">
      <div
        v-if="lightbox"
        class="orbit-media-lightbox"
        role="dialog"
        aria-modal="true"
        @click.self="close"
      >
        <button
          class="orbit-media-lightbox__close"
          type="button"
          @click="close"
        >
          CLOSE ×
        </button>

        <div class="orbit-media-lightbox__content">
          <img
            :src="lightbox.src"
            :alt="
              lightbox.alt ||
              project.name
            "
          />

          <span>
            {{ project.name }}
            ·
            {{
              lightbox.label ||
              'PROJECT MEDIA'
            }}
          </span>
        </div>
      </div>
    </Teleport>
  </article>
</template>

<style scoped>
.media-stage {
  position: relative;

  width: 100%;
  height:
    min(
      700px,
      calc(100svh - 180px)
    );

  min-height: 570px;

  overflow: hidden;

  border:
    1px solid
    rgba(53, 103, 184, .15);

  border-radius: 28px;

  background:
    linear-gradient(
      145deg,
      rgba(8, 20, 39, .68),
      rgba(3, 8, 16, .32)
    );

  isolation: isolate;
}

.media-stage__rings {
  position: absolute;

  left: 51%;
  top: 51%;

  width: 88%;
  height: 75%;

  transform:
    translate(-50%, -50%);

  pointer-events: none;
}

.media-stage__rings i {
  position: absolute;

  left: 50%;
  top: 50%;

  width: 460px;
  height: 460px;

  transform:
    translate(-50%, -50%);

  border:
    1px solid
    rgba(48, 105, 194, .10);

  border-radius: 50%;
}

.media-stage__rings i + i {
  width: 320px;
  height: 320px;

  border-color:
    rgba(48, 105, 194, .18);
}

.media-stage__header {
  position: absolute;

  left: 24px;
  right: 24px;
  top: 22px;

  z-index: 30;

  display: flex;

  align-items: flex-start;
  justify-content: space-between;
}

.media-stage__header span {
  color: #55dcff;

  font:
    700 8px/1
    "Space Grotesk",
    sans-serif;

  letter-spacing: .10em;

  text-transform: uppercase;
}

.media-stage__header h2 {
  margin: 9px 0 0;

  color: #f4f8ff;

  font:
    700 26px/.95
    "Space Grotesk",
    sans-serif;

  letter-spacing: -.035em;
}

.media-stage__header > strong {
  color: #54759f;

  font:
    700 7px/1
    "Space Grotesk",
    sans-serif;

  letter-spacing: .10em;
}

/* APP / PHONE */

.app-fan,
.browser-fan {
  position: absolute;

  inset:
    72px
    14px
    115px;
}

.phone-device,
.media-logo,
.browser-device {
  position: absolute;

  left: 50%;
  top: 50%;

  cursor: zoom-in;

  will-change:
    transform,
    opacity;
}

.phone-device {
  z-index: 4;

  width:
    clamp(
      175px,
      15vw,
      220px
    );

  aspect-ratio:
    9 / 19;

  padding:
    14px 8px
    9px;

  overflow: hidden;

  border:
    1px solid
    rgba(78, 138, 231, .34);

  border-radius: 28px;

  background:
    linear-gradient(
      145deg,
      #0b1b32,
      #06101e
    );

  box-shadow:
    0 28px 65px
    rgba(0, 0, 0, .40);
}

.phone-device:not(:disabled):hover,
.browser-device:not(:disabled):hover,
.media-logo:not(:disabled):hover {
  z-index: 30;

  border-color:
    rgba(85, 220, 255, .72);
}

.phone-device:disabled,
.browser-device:disabled,
.media-logo:disabled {
  cursor: default;
}

.phone-device__speaker {
  width: 34px;
  height: 3px;

  margin:
    0 auto
    9px;

  border-radius: 999px;

  background: #1c304d;
}

.phone-device__screen {
  width: 100%;
  height:
    calc(100% - 12px);

  overflow: hidden;

  border-radius: 20px;

  background: #02050a;
}

.phone-device__screen img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  object-position:
    top center;
}

.phone-device__screen > span {
  display: grid;

  place-items: center;

  align-content: center;

  gap: 10px;

  width: 100%;
  height: 100%;

  color: #536b8f;

  background:
    linear-gradient(
      rgba(29, 78, 146, .13) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(29, 78, 146, .13) 1px,
      transparent 1px
    ),
    #06101f;

  background-size:
    24px 24px;
}

.phone-device__screen small {
  color: #55dcff;

  font:
    700 7px/1
    "Space Grotesk",
    sans-serif;
}

.phone-device__screen b {
  color: #9daec7;

  font:
    700 13px/1
    "Space Grotesk",
    sans-serif;
}

.media-logo {
  z-index: 12;

  display: grid;
  place-items: center;

  width:
    clamp(
      115px,
      9vw,
      145px
    );

  aspect-ratio: 1;

  overflow: hidden;

  padding: 22px;

  border:
    1px solid
    rgba(85, 220, 255, .56);

  border-radius: 27%;

  background:
    linear-gradient(
      145deg,
      rgba(14, 35, 69, .98),
      rgba(4, 11, 23, .98)
    );

  box-shadow:
    0 25px 65px
    rgba(0, 0, 0, .42),
    0 0 46px
    rgba(36, 124, 255, .10);
}

.media-logo img {
  width: 100%;
  height: 100%;

  object-fit: contain;
}

.media-logo strong {
  color: #dcecff;

  font:
    700 23px/1
    "Space Grotesk",
    sans-serif;
}

/* WEB / BROWSER */

.browser-device {
  overflow: hidden;

  border:
    1px solid
    rgba(70, 130, 224, .32);

  border-radius: 18px;

  background: #07111f;

  box-shadow:
    0 28px 70px
    rgba(0, 0, 0, .42);
}

.browser-device--main {
  z-index: 5;

  width:
    min(
      580px,
      82%
    );

  aspect-ratio:
    16 / 10;
}

.browser-device--side {
  z-index: 3;

  width:
    min(
      410px,
      61%
    );

  aspect-ratio:
    16 / 10;
}

.browser-device__chrome {
  display: flex;

  align-items: center;
  justify-content: space-between;

  height: 32px;

  padding:
    0 12px;

  border-bottom:
    1px solid
    rgba(62, 108, 179, .20);

  background: #0b1728;
}

.browser-device__chrome > span {
  display: flex;

  gap: 5px;
}

.browser-device__chrome i {
  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: #405370;
}

.browser-device__chrome b {
  color: #59708f;

  font:
    600 7px/1
    "Space Grotesk",
    sans-serif;

  letter-spacing: .07em;
}

.browser-device__viewport {
  width: 100%;
  height:
    calc(100% - 32px);

  overflow: hidden;

  background: #02050a;
}

.browser-device__viewport img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  object-position:
    top center;
}

.browser-device__viewport > span {
  display: grid;

  place-items: center;

  align-content: center;

  gap: 10px;

  width: 100%;
  height: 100%;

  color: #627593;

  background:
    linear-gradient(
      rgba(28, 73, 135, .12) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(28, 73, 135, .12) 1px,
      transparent 1px
    ),
    #06101f;

  background-size:
    28px 28px;
}

.browser-device__viewport small {
  color: #55dcff;

  font:
    700 7px/1
    "Space Grotesk",
    sans-serif;
}

.browser-device__viewport b {
  color: #9aacc4;

  font:
    700 13px/1
    "Space Grotesk",
    sans-serif;
}

.media-logo--browser {
  width: 105px;

  padding: 18px;
}

/* DESCRIPTION */

.media-stage__copy {
  position: absolute;

  left: 24px;
  right: 24px;
  bottom: 22px;

  z-index: 24;

  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    auto;

  column-gap: 24px;

  align-items: end;

  pointer-events: none;
}

.media-stage__copy p {
  grid-column: 1;

  margin: 0 0 7px;

  color: #fff;

  font:
    700 11px/1.2
    "Space Grotesk",
    sans-serif;
}

.media-stage__copy > span {
  grid-column: 1;

  max-width: 600px;

  color: #f4f8ff;

  font:
    500 13px/1.65
    "Noto Sans KR",
    sans-serif;
}

.media-stage__cta {
  grid-column: 2;
  grid-row:
    1 / span 2;

  align-self: end;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 42px;

  gap: 10px;

  padding: 11px 15px;

  border:
    1px solid
    rgba(96, 158, 255, .55);

  border-radius: 11px;

  background:
    rgba(9, 24, 48, .78);

  color: #fff;

  font:
    700 11px/1
    "Space Grotesk",
    sans-serif;

  letter-spacing: .04em;

  white-space: nowrap;

  text-decoration: none;

  pointer-events: auto;

  box-shadow:
    0 10px 28px
    rgba(0, 0, 0, .22);

  transition:
    transform .2s ease,
    border-color .2s ease,
    background .2s ease;
}

.media-stage__cta:hover {
  transform: translateY(-2px);

  border-color:
    rgba(85, 220, 255, .85);

  background:
    rgba(15, 40, 76, .92);
}

.media-stage__cta:focus-visible {
  outline:
    2px solid
    #55dcff;

  outline-offset: 3px;
}

.media-stage__cta b {
  font-size: 15px;
}

.media-stage__cta--play-store {
  min-width: 178px;
  min-height: 56px;

  justify-content: flex-start;

  gap: 11px;

  padding: 8px 15px 8px 11px;

  border:
    1px solid
    rgba(255, 255, 255, .72);

  border-radius: 13px;

  background: #050505;

  letter-spacing: 0;

  box-shadow:
    0 12px 30px
    rgba(0, 0, 0, .35),
    inset 0 0 0 1px
    rgba(255, 255, 255, .07);
}

.media-stage__cta--play-store:hover {
  border-color: #fff;

  background: #111;
}

.media-stage__play-icon {
  width: 32px;
  height: 32px;

  flex: 0 0 auto;
}

.media-stage__cta--play-store > span {
  display: grid;

  gap: 2px;

  text-align: left;
}

.media-stage__cta--play-store small {
  font:
    500 9px/1
    "Noto Sans KR",
    sans-serif;
}

.media-stage__cta--play-store strong {
  font:
    600 18px/1
    "Space Grotesk",
    sans-serif;

  letter-spacing: -.025em;
}

/* LIGHTBOX */

:global(
  html.orbit-media-lightbox-open
) {
  overflow: hidden;
}

:global(
  .orbit-media-lightbox
) {
  position: fixed;

  inset: 0;

  z-index: 10000;

  display: grid;

  place-items: center;

  padding: 38px;

  background:
    rgba(1, 4, 9, .95);

  backdrop-filter:
    blur(18px);
}

:global(
  .orbit-media-lightbox__close
) {
  position: absolute;

  top: 28px;
  right: 32px;

  border: 0;

  background: transparent;

  color: #e5eefc;

  font:
    700 9px/1
    "Space Grotesk",
    sans-serif;

  letter-spacing: .09em;

  cursor: pointer;
}

:global(
  .orbit-media-lightbox__content
) {
  display: grid;

  justify-items: center;

  gap: 15px;

  max-width: 92vw;
  max-height: 88vh;
}

:global(
  .orbit-media-lightbox__content img
) {
  max-width: 100%;
  max-height: 79vh;

  object-fit: contain;

  border-radius: 17px;

  box-shadow:
    0 42px 110px
    rgba(0, 0, 0, .65);
}

:global(
  .orbit-media-lightbox__content span
) {
  color: #7286a5;

  font:
    600 8px/1
    "Space Grotesk",
    sans-serif;

  letter-spacing: .08em;
}

/* RESPONSIVE */

@media (
  max-width: 1180px
) {
  .media-stage {
    min-height: 530px;
  }

  .phone-device {
    width: 180px;
  }
}

@media (
  max-width: 900px
) {
  .media-stage {
    height: 620px;
    min-height: 620px;

    border-radius: 22px;
  }

  .app-fan,
  .browser-fan {
    inset:
      70px
      8px
      128px;
  }

  .phone-device {
    width:
      min(
        42vw,
        190px
      );
  }

  .browser-device--main {
    width: 88%;
  }

  .browser-device--side {
    width: 62%;
  }

  .media-stage__copy {
    display: block;
  }

  .media-stage__copy a {
    display: inline-block;

    margin-top: 14px;
  }
}

@media (
  max-width: 560px
) {
  .media-stage {
    height: 560px;
    min-height: 560px;
  }

  .phone-device {
    width:
      min(
        45vw,
        170px
      );
  }

  .media-logo {
    width: 105px;
  }
}
</style>
