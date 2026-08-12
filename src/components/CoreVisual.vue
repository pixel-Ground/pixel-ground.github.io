<template>
  <div class="core-visual" aria-hidden="true">
    <div class="core-depth core-depth--outer"></div>
    <div class="core-depth core-depth--inner"></div>
    <svg class="core-scene" viewBox="0 0 520 520" role="presentation">
      <defs>
        <filter id="coreGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.09 0 0 0 0 0.42 0 0 0 0 1 0 0 0 .48 0" />
        </filter>
        <g id="cube">
          <polygon points="50,2 96,27 50,52 4,27" fill="#2f7dff" />
          <polygon points="4,27 50,52 50,98 4,73" fill="#123c9b" />
          <polygon points="96,27 50,52 50,98 96,73" fill="#071c54" />
        </g>
      </defs>
      <circle cx="265" cy="265" r="135" fill="#176bff" opacity=".12" filter="url(#coreGlow)" />
      <g class="cube cube--main" transform="translate(210 175) scale(1.08)"><use href="#cube" /></g>
      <g class="cube cube--left" transform="translate(145 250) scale(.82)"><use href="#cube" /></g>
      <g class="cube cube--right" transform="translate(278 252) scale(.82)"><use href="#cube" /></g>
      <g class="cube cube--bottom" transform="translate(215 320) scale(.8)"><use href="#cube" /></g>
      <g class="cube cube--seed" transform="translate(231 118) scale(.48)"><use href="#cube" /></g>
      <g class="core-pixels" fill="#fff">
        <rect x="120" y="190" width="5" height="5"/><rect x="380" y="205" width="7" height="7"/><rect x="405" y="278" width="4" height="4"/>
        <rect x="118" y="330" width="3" height="3"/><rect x="365" y="365" width="5" height="5"/><rect x="160" y="405" width="6" height="6"/>
        <rect x="332" y="105" width="3" height="3"/><rect x="101" y="276" width="4" height="4"/>
      </g>
    </svg>
    <div class="core-caption">
      <span>CORE / IDENTITY OBJECT</span>
      <small>Scroll moves depth — not decoration.</small>
    </div>
  </div>
</template>
