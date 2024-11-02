import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/jadenthomas.github.io/',
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.png', '**/*.PNG'],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})