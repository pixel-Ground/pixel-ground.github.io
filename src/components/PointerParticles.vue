<template>
  <canvas ref="canvas" class="pointer-particles" aria-hidden="true"></canvas>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvas = ref(null)
let ctx
let frameId
let resizeObserver
const particles = []
const maxParticles = 650
const pointer = { x: 0, y: 0, mx: 0, my: 0 }
let enabled = true

class Particle {
  constructor(spread, speed) {
    this.x = pointer.x
    this.y = pointer.y
    this.mx = pointer.mx * 0.08
    this.my = pointer.my * 0.08
    this.size = Math.random() * 9 + 1
    this.decay = Math.random() * 0.12 + 0.08
    this.speed = Math.min(speed, 30) * 0.045
    this.spread = spread * (this.speed + 0.15)
    this.vx = (Math.random() - 0.5) * this.spread - this.mx
    this.vy = (Math.random() - 0.5) * this.spread - this.my
    this.gravity = (Math.random() - 0.7) * 0.025
    this.opacity = Math.random() * 0.4 + 0.5
  }

  update() {
    const s = Math.max(0, this.size)
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`
    ctx.fillRect(Math.round(this.x - s / 2), Math.round(this.y - s / 2), Math.max(1, Math.round(s)), Math.max(1, Math.round(s)))
    this.x += this.vx * 0.18
    this.y += this.vy * 0.18
    this.vy += this.gravity
    this.vx *= 0.985
    this.vy *= 0.985
    this.size -= this.decay
    this.opacity -= 0.012
  }
}

function velocity(event) {
  const x = event.movementX || 0
  const y = event.movementY || 0
  return Math.sqrt(x * x + y * y)
}

function createParticles(event, count, speed, spread) {
  if (!enabled) return
  pointer.x = event.clientX
  pointer.y = event.clientY
  pointer.mx = event.movementX || 0
  pointer.my = event.movementY || 0

  for (let i = 0; i < count; i += 1) {
    if (particles.length >= maxParticles) particles.shift()
    particles.push(new Particle(spread, speed))
  }
}

function onMove(event) {
  const v = velocity(event)
  createParticles(event, Math.min(3 + Math.floor(v * 0.25), 10), v, 10)
}

function onClick(event) {
  createParticles(event, 72, 18, 62)
}

function resize() {
  const el = canvas.value
  if (!el) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  el.width = Math.round(innerWidth * dpr)
  el.height = Math.round(innerHeight * dpr)
  el.style.width = `${innerWidth}px`
  el.style.height = `${innerHeight}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  for (let i = particles.length - 1; i >= 0; i -= 1) {
    particles[i].update()
    if (particles[i].size <= 0.2 || particles[i].opacity <= 0) particles.splice(i, 1)
  }
  frameId = requestAnimationFrame(animate)
}

onMounted(() => {
  enabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(pointer: fine)').matches
  ctx = canvas.value.getContext('2d', { alpha: true })
  resize()
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('click', onClick, { passive: true })
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(document.documentElement)
  frameId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId)
  resizeObserver?.disconnect()
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('click', onClick)
})
</script>
