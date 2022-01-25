import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unocss({
      shortcuts: [
        // you could still have object style
        {
          'btn': 'py-2 px-4 font-semibold rounded-lg',
        },
      ],
      }),
  ],
})
