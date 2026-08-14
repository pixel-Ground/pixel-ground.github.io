import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 사용자 사이트 저장소: https://pixel-ground.github.io/
  base: '/',
  build: {
    target: 'es2020',
    cssCodeSplit: false,
  },
})
