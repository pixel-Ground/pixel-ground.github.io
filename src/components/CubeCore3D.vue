<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref
} from 'vue'

const props = defineProps({
  size: { type: Number, default: 255 },
  gap: { type: Number, default: 5 },

  autoRotate: {
    type: Boolean,
    default: true
  },

  scrollRotate: {
    type: Boolean,
    default: true
  },

  twist: {
    type: Boolean,
    default: true
  },

  twistInterval: {
    type: Number,
    default: 1500
  },

  twistDuration: {
    type: Number,
    default: 560
  }
})

const root = ref(null)
const cubies = ref(createCubies())

const dragX = ref(-22)
const dragY = ref(34)

const scrollX = ref(0)
const scrollY = ref(0)

const idleY = ref(0)

const isDragging = ref(false)

const lastPointer = ref({
  x: 0,
  y: 0
})

const activeMove = ref(null)
const moveAngle = ref(0)

let raf = 0
let twistTimer = 0
let commitTimer = 0
let observer = null
let visible = true
let previousMoveKey = ''

function createCubies() {
  const result = []
  let index = 0

  for (let z = -1; z <= 1; z++) {
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        result.push({
          id: index++,
          x,
          y,
          z
        })
      }
    }
  }

  return result
}

const cubieSize = computed(() =>
  (props.size - props.gap * 2) / 3
)

const step = computed(() =>
  cubieSize.value + props.gap
)

const coreStyle = computed(() => ({
  '--core-size': `${props.size}px`,
  '--cubie-size': `${cubieSize.value}px`,
  '--gap': `${props.gap}px`,

  '--rx':
    `${dragX.value + scrollX.value}deg`,

  '--ry':
    `${dragY.value + scrollY.value + idleY.value}deg`,

  '--twist-duration':
    `${props.twistDuration}ms`
}))

function isInActiveLayer(cubie) {
  const move = activeMove.value

  if (!move) return false

  return (
    cubie[move.axis] ===
    move.layer
  )
}

const stationaryCubies =
  computed(() => {
    if (!activeMove.value) {
      return cubies.value
    }

    return cubies.value.filter(
      cubie =>
        !isInActiveLayer(cubie)
    )
  })

const twistingCubies =
  computed(() => {
    if (!activeMove.value) {
      return []
    }

    return cubies.value.filter(
      cubie =>
        isInActiveLayer(cubie)
    )
  })

function cubieStyle(cubie) {
  return {
    transform:
      `translate3d(` +
      `${cubie.x * step.value}px, ` +
      `${cubie.y * step.value}px, ` +
      `${cubie.z * step.value}px)`
  }
}

const twistLayerStyle =
  computed(() => {
    const move =
      activeMove.value

    if (!move) {
      return {
        transform:
          'rotate3d(0, 1, 0, 0deg)'
      }
    }

    const angle =
      moveAngle.value

    if (move.axis === 'x') {
      return {
        transform:
          `rotateX(${angle}deg)`
      }
    }

    if (move.axis === 'y') {
      return {
        transform:
          `rotateY(${angle}deg)`
      }
    }

    return {
      transform:
        `rotateZ(${angle}deg)`
    }
  })

function rotateCoordinates(
  cubie,
  axis,
  dir
) {
  const x = cubie.x
  const y = cubie.y
  const z = cubie.z

  if (axis === 'x') {
    if (dir > 0) {
      cubie.y = -z
      cubie.z = y
    } else {
      cubie.y = z
      cubie.z = -y
    }
    return
  }

  if (axis === 'y') {
    if (dir > 0) {
      cubie.x = z
      cubie.z = -x
    } else {
      cubie.x = -z
      cubie.z = x
    }
    return
  }

  if (dir > 0) {
    cubie.x = -y
    cubie.y = x
  } else {
    cubie.x = y
    cubie.y = -x
  }
}

function chooseMove() {
  const axes = ['x', 'y', 'z']
  const layers = [-1, 1]

  let move
  let key

  do {
    move = {
      axis:
        axes[
          Math.floor(
            Math.random() *
            axes.length
          )
        ],

      layer:
        layers[
          Math.floor(
            Math.random() *
            layers.length
          )
        ],

      dir:
        Math.random() >
        0.5
          ? 1
          : -1
    }

    key =
      `${move.axis}:` +
      `${move.layer}:` +
      `${move.dir}`
  } while (
    key === previousMoveKey
  )

  previousMoveKey = key

  return move
}

function performTwist() {
  if (
    !props.twist ||
    !visible ||
    isDragging.value ||
    activeMove.value
  ) {
    return
  }

  const move =
    chooseMove()

  activeMove.value = move
  moveAngle.value = 0

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      moveAngle.value =
        move.dir * 90
    })
  })

  clearTimeout(commitTimer)

  commitTimer =
    window.setTimeout(() => {
      cubies.value.forEach(
        cubie => {
          if (
            cubie[move.axis] ===
            move.layer
          ) {
            rotateCoordinates(
              cubie,
              move.axis,
              move.dir
            )
          }
        }
      )

      requestAnimationFrame(() => {
        activeMove.value = null
        moveAngle.value = 0
      })
    }, props.twistDuration + 35)
}

function startTwistLoop() {
  clearInterval(twistTimer)

  twistTimer =
    window.setInterval(
      performTwist,
      Math.max(
        props.twistInterval,
        props.twistDuration + 450
      )
    )
}

function onPointerDown(event) {
  isDragging.value = true

  lastPointer.value = {
    x: event.clientX,
    y: event.clientY
  }

  event.currentTarget
    .setPointerCapture?.(
      event.pointerId
    )
}

function onPointerMove(event) {
  if (!isDragging.value) {
    return
  }

  const dx =
    event.clientX -
    lastPointer.value.x

  const dy =
    event.clientY -
    lastPointer.value.y

  dragY.value += dx * 0.32
  dragX.value -= dy * 0.24

  dragX.value =
    Math.max(
      -68,
      Math.min(
        68,
        dragX.value
      )
    )

  lastPointer.value = {
    x: event.clientX,
    y: event.clientY
  }
}

function stopDrag() {
  isDragging.value = false
}

function updateScroll() {
  if (
    !props.scrollRotate ||
    !root.value
  ) {
    return
  }

  const rect =
    root.value
      .getBoundingClientRect()

  const vh =
    window.innerHeight

  const progress =
    Math.max(
      0,
      Math.min(
        1,
        (vh - rect.top) /
        (vh + rect.height)
      )
    )

  scrollY.value =
    progress * 110

  scrollX.value =
    8 - progress * 16
}

function animate() {
  if (
    props.autoRotate &&
    visible &&
    !isDragging.value
  ) {
    idleY.value =
      (idleY.value + 0.05) %
      360
  }

  raf =
    requestAnimationFrame(
      animate
    )
}

onMounted(() => {
  updateScroll()

  window.addEventListener(
    'scroll',
    updateScroll,
    { passive: true }
  )

  window.addEventListener(
    'resize',
    updateScroll,
    { passive: true }
  )

  if (
    'IntersectionObserver'
    in window
  ) {
    observer =
      new IntersectionObserver(
        ([entry]) => {
          visible =
            entry.isIntersecting
        },
        {
          threshold: 0.05
        }
      )

    if (root.value) {
      observer.observe(
        root.value
      )
    }
  }

  animate()
  startTwistLoop()

  window.setTimeout(
    performTwist,
    700
  )
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)

  clearInterval(twistTimer)
  clearTimeout(commitTimer)

  window.removeEventListener(
    'scroll',
    updateScroll
  )

  window.removeEventListener(
    'resize',
    updateScroll
  )

  observer?.disconnect()
})
</script>

<template>
  <div
    ref="root"
    class="rubik-core-shell"
    :style="coreStyle"
  >
    <div
      class="
        rubik-core-orbit
        rubik-core-orbit--outer
      "
      aria-hidden="true"
    ></div>

    <div
      class="
        rubik-core-orbit
        rubik-core-orbit--inner
      "
      aria-hidden="true"
    ></div>

    <div
      class="rubik-core-scene"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="stopDrag"
      @pointercancel="stopDrag"
      @pointerleave="stopDrag"
    >
      <div class="rubik-core">
        <div
          v-for="
            cubie in stationaryCubies
          "
          :key="
            `fixed-${cubie.id}`
          "
          class="cubie"
          :style="
            cubieStyle(cubie)
          "
        >
          <span class="face face--front"></span>
          <span class="face face--back"></span>
          <span class="face face--right"></span>
          <span class="face face--left"></span>
          <span class="face face--top"></span>
          <span class="face face--bottom"></span>
        </div>

        <!--
          회전 중인 9개의 cubie는
          하나의 preserve-3d 그룹으로 함께 회전합니다.
        -->
        <div
          v-if="activeMove"
          class="twist-layer"
          :style="twistLayerStyle"
        >
          <div
            v-for="
              cubie in twistingCubies
            "
            :key="
              `twist-${cubie.id}`
            "
            class="cubie"
            :style="
              cubieStyle(cubie)
            "
          >
            <span class="face face--front"></span>
            <span class="face face--back"></span>
            <span class="face face--right"></span>
            <span class="face face--left"></span>
            <span class="face face--top"></span>
            <span class="face face--bottom"></span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="rubik-core-pixels"
      aria-hidden="true"
    >
      <i
        v-for="n in 12"
        :key="n"
        :style="{ '--i': n }"
      ></i>
    </div>
  </div>
</template>

<style scoped>
.rubik-core-shell {
  position: relative;

  display: grid;
  place-items: center;

  width: 100%;
  height: 100%;

  min-width: 320px;
  min-height: 320px;

  isolation: isolate;
}

.rubik-core-scene {
  position: relative;

  width: var(--core-size);
  height: var(--core-size);

  perspective: 1100px;
  perspective-origin: 50% 47%;

  cursor: grab;

  touch-action: none;
  user-select: none;

  z-index: 4;
}

.rubik-core-scene:active {
  cursor: grabbing;
}

.rubik-core {
  position: absolute;

  left: 50%;
  top: 50%;

  width: var(--cubie-size);
  height: var(--cubie-size);

  transform-style: preserve-3d;

  transform:
    translate(-50%, -50%)
    rotateX(var(--rx))
    rotateY(var(--ry));

  will-change: transform;
}

/*
 * 중요:
 * twist-layer와 cubie에는 filter / opacity / overflow:hidden
 * 같은 3D flattening 속성을 절대 넣지 않습니다.
 */
.twist-layer {
  position: absolute;

  left: 0;
  top: 0;

  width: var(--cubie-size);
  height: var(--cubie-size);

  transform-style: preserve-3d;
  transform-origin: 50% 50% 0;

  transition:
    transform
    var(--twist-duration)
    cubic-bezier(
      .68,
      .02,
      .2,
      1
    );

  will-change: transform;
}

.cubie {
  position: absolute;

  left: 0;
  top: 0;

  width: var(--cubie-size);
  height: var(--cubie-size);

  transform-style: preserve-3d;

  will-change: transform;
}

.face {
  position: absolute;

  inset: 1.5px;

  border:
    1px solid
    rgba(
      75,
      145,
      250,
      .18
    );

  border-radius: 5px;

  backface-visibility: hidden;

  box-shadow:
    inset 0 0 18px
    rgba(
      255,
      255,
      255,
      .025
    );
}

.face--front {
  transform:
    translateZ(
      calc(
        var(--cubie-size) /
        2
      )
    );

  background:
    linear-gradient(
      145deg,
      #1762df,
      #0e3c96
    );
}

.face--back {
  transform:
    rotateY(180deg)
    translateZ(
      calc(
        var(--cubie-size) /
        2
      )
    );

  background:
    linear-gradient(
      145deg,
      #0a2a70,
      #051944
    );
}

.face--right {
  transform:
    rotateY(90deg)
    translateZ(
      calc(
        var(--cubie-size) /
        2
      )
    );

  background:
    linear-gradient(
      180deg,
      #0e3e9f,
      #07235f
    );
}

.face--left {
  transform:
    rotateY(-90deg)
    translateZ(
      calc(
        var(--cubie-size) /
        2
      )
    );

  background:
    linear-gradient(
      180deg,
      #0b3387,
      #051a49
    );
}

.face--top {
  transform:
    rotateX(90deg)
    translateZ(
      calc(
        var(--cubie-size) /
        2
      )
    );

  background:
    linear-gradient(
      135deg,
      #3e98ff,
      #2378ed
    );
}

.face--bottom {
  transform:
    rotateX(-90deg)
    translateZ(
      calc(
        var(--cubie-size) /
        2
      )
    );

  background:
    linear-gradient(
      180deg,
      #071f54,
      #03112f
    );
}

.rubik-core-orbit {
  position: absolute;

  left: 50%;
  top: 50%;

  transform:
    translate(-50%, -50%);

  border:
    1px solid
    rgba(
      38,
      112,
      226,
      .18
    );

  border-radius: 50%;

  pointer-events: none;

  z-index: 0;
}

.rubik-core-orbit--outer {
  width: 94%;
  height: 94%;
}

.rubik-core-orbit--inner {
  width: 69%;
  height: 69%;

  border-color:
    rgba(
      42,
      125,
      255,
      .27
    );
}

.rubik-core-pixels {
  position: absolute;

  inset: 3%;

  pointer-events: none;

  z-index: 2;
}

.rubik-core-pixels i {
  --angle:
    calc(var(--i) * 30deg);

  position: absolute;

  left: 50%;
  top: 50%;

  width:
    calc(
      2px +
      (var(--i) % 3) *
      2px
    );

  aspect-ratio: 1;

  background:
    rgba(
      255,
      255,
      255,
      .85
    );

  transform:
    rotate(var(--angle))
    translateX(
      calc(
        138px +
        (var(--i) % 4) *
        17px
      )
    )
    rotate(
      calc(
        -1 *
        var(--angle)
      )
    );

  animation:
    pixelDrift
    calc(
      3.5s +
      (var(--i) % 4) *
      .75s
    )
    ease-in-out
    infinite
    alternate;
}

@keyframes pixelDrift {
  from {
    opacity: .25;
  }

  to {
    opacity: .9;
    translate: 0 -11px;
  }
}

@media (max-width: 700px) {
  .rubik-core-shell {
    min-width: 280px;
    min-height: 280px;
  }
}

@media (
  prefers-reduced-motion:
  reduce
) {
  .twist-layer {
    transition: none;
  }

  .rubik-core-pixels i {
    animation: none;
  }
}
</style>
