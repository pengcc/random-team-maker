import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unocss({
      rules: [
        [/^fs-[(calc.*)]$/, ([, c]) => ({'font-size': `${c}`})]],
    })
  ],
})
