<script setup>
import CubeCore3D from './components/CubeCore3D.vue'
import { currentSiteCopy as site } from './data/siteMode'
</script>

<template>
  <main class="demo">
    <section class="hero">
      <div class="copy">
        <p>WEB · APP · PLATFORM · SAAS</p>
        <h1>DIGITAL PRODUCTS,<span>BUILT WITH DEPTH.</span></h1>
        <div class="body">
          <span
            v-for="line in site.heroLines"
            :key="line"
          >
            {{ line }}
          </span>
        </div>
      </div>

      <CubeCore3D :size="310" :gap="5" />
    </section>

    <section class="scroll-test">SCROLL TEST</section>
  </main>
</template>

<style>
*{box-sizing:border-box}
html,body,#app{margin:0;min-height:100%;background:#03070d;color:#f5f8ff}
body{font-family:Inter,"Noto Sans KR",sans-serif}
.demo{min-height:200vh;background:radial-gradient(circle at 78% 18%,rgba(20,73,155,.12),transparent 28%),#03070d}
.hero{min-height:100svh;display:grid;grid-template-columns:1.08fr .92fr;gap:70px;align-items:center;padding:90px 6vw}
.copy{max-width:760px}
.copy>p{color:#55dcff;font-size:12px;font-weight:700;letter-spacing:.14em}
h1{font-size:clamp(56px,6.5vw,108px);line-height:.91;letter-spacing:-.065em;margin:28px 0}
h1 span{display:block;color:#237cff}
.body{max-width:600px;color:#8090aa;line-height:1.8;word-break:keep-all;overflow-wrap:break-word}
.body span{display:block}
.scroll-test{min-height:100vh;display:grid;place-items:center;color:#536683}
@media(max-width:900px){.hero{grid-template-columns:1fr}.cube-core-shell{order:-1}}
</style>
