<template>
  <div class="project-preview project-fan-preview" :class="{ 'has-multiple': orderedMedia.length > 1 }">
    <div class="project-fan-preview__ambient" aria-hidden="true"></div>
    <div class="project-fan-preview__guide" aria-hidden="true">
      <span>{{ stageLabel }}</span>
      <i></i>
      <b>{{ Math.round(fanProgress * 100) }}%</b>
    </div>

    <template v-if="orderedMedia.length">
      <button
        v-for="(item, index) in orderedMedia"
        :key="item.id || `${project.id}-${index}`"
        type="button"
        class="fan-card"
        :class="[
          `fan-card--${item.kind || 'screen'}`,
          { 'is-placeholder': !item.src, 'is-clickable': !!item.src },
        ]"
        :style="fanCardStyle(index, item)"
        :disabled="!item.src"
        @click="openLightbox(item)"
      >
        <span class="fan-card__chrome" aria-hidden="true">
          <i></i><i></i><i></i>
          <em>{{ item.label || `MEDIA ${String(index + 1).padStart(2, '0')}` }}</em>
        </span>

        <span class="fan-card__media">
          <img v-if="item.src" :src="item.src" :alt="item.alt || `${project.name} ${item.label || '프로젝트 이미지'}`" />
          <span v-else class="fan-card__placeholder">
            <small>{{ item.label || 'SCREEN' }}</small>
            <strong>IMAGE SLOT</strong>
            <em>이미지 경로를 연결하면 자동 적용됩니다.</em>
          </span>
        </span>

        <span v-if="item.src" class="fan-card__expand" aria-hidden="true">EXPAND ↗</span>
      </button>
    </template>

    <div v-else class="project-fan-preview__fallback">
      <AiDecisionPreview />
    </div>

    <div class="project-fan-preview__hint">
      <span>SCROLL TO FAN OUT</span>
      <small>이미지를 선택하면 확대됩니다.</small>
    </div>

    <Teleport to="body">
      <Transition name="lightbox-fade">
        <div
          v-if="lightboxItem"
          class="project-lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="`${project.name} 이미지 확대`"
          @click.self="closeLightbox"
          @wheel.prevent
        >
          <button class="project-lightbox__close" type="button" aria-label="확대 이미지 닫기" @click="closeLightbox">CLOSE ×</button>
          <div class="project-lightbox__meta">
            <span>{{ project.name }}</span>
            <b>{{ lightboxItem.label || 'PROJECT MEDIA' }}</b>
          </div>
          <img :src="lightboxItem.src" :alt="lightboxItem.alt || `${project.name} 확대 이미지`" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import AiDecisionPreview from './AiDecisionPreview.vue'

const props = defineProps({
  project: { type: Object, required: true },
  fanProgress: { type: Number, default: 0 },
  localProgress: { type: Number, default: 0 },
})

const lightboxItem = ref(null)

const media = computed(() => {
  if (Array.isArray(props.project.media) && props.project.media.length) return props.project.media.slice(0, 3)
  if (props.project.image) {
    return [{
      id: `${props.project.id}-primary`,
      kind: props.project.imageMode === 'icon' ? 'logo' : 'screen',
      label: props.project.imageMode === 'icon' ? 'APP LOGO' : 'PROJECT SCREEN',
      src: props.project.image,
      alt: `${props.project.name} 프로젝트 이미지`,
    }]
  }
  return []
})

// Fan은 좌측 화면 → 중앙 로고 → 우측 화면 순으로 읽히도록 정렬합니다.
const orderedMedia = computed(() => {
  if (media.value.length < 2) return media.value
  const logo = media.value.find((item) => item.kind === 'logo')
  const screens = media.value.filter((item) => item !== logo)
  if (!logo) return media.value
  return [screens[0], logo, screens[1]].filter(Boolean)
})

const stageLabel = computed(() => {
  if (props.localProgress < 0.2) return 'LOGO FOCUS'
  if (props.localProgress < 0.7) return 'FAN OPENING'
  if (props.localProgress < 0.88) return 'EXPLORE'
  return 'TRANSITION'
})

function fanCardStyle(index, item) {
  const total = orderedMedia.value.length
  if (total === 1) {
    return {
      '--fan-x': '0px',
      '--fan-y': '0px',
      '--fan-r': '0deg',
      '--fan-s': '1',
      '--fan-o': '1',
      '--fan-z': '3',
    }
  }

  const positions = total === 2 ? [-0.65, 0.65] : [-1, 0, 1]
  const slot = positions[index] ?? 0
  const p = props.fanProgress
  const isLogo = item.kind === 'logo'
  const closedOpacity = isLogo ? 1 : 0

  return {
    '--fan-x': `${slot * 132 * p}px`,
    '--fan-y': `${Math.abs(slot) * 28 * p}px`,
    '--fan-r': `${slot * 12 * p}deg`,
    '--fan-s': `${(isLogo ? 1 : 0.94) + Math.abs(slot) * 0.025 * p}`,
    '--fan-o': `${closedOpacity + (1 - closedOpacity) * p}`,
    '--fan-z': `${isLogo ? 4 : 2 + Math.round(p)}`,
  }
}

function openLightbox(item) {
  if (!item?.src) return
  lightboxItem.value = item
}

function closeLightbox() {
  lightboxItem.value = null
}

function onKeydown(event) {
  if (event.key === 'Escape' && lightboxItem.value) closeLightbox()
}

watch(lightboxItem, (item) => {
  document.documentElement.classList.toggle('project-lightbox-open', !!item)
})

window.addEventListener('keydown', onKeydown)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.classList.remove('project-lightbox-open')
})
</script>
