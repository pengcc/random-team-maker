import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    testTimeout: 2000,
    global: true,
    coverage: {
      reporter: ['text', 'html'],
    },
  },
})