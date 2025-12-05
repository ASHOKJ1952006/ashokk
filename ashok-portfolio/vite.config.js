import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'next/image': path.resolve(process.cwd(), 'src/shims/nextImage.js'),
      three: path.resolve(process.cwd(), 'node_modules/three'),
    },
  },
  assetsInclude: ['**/*.fbx'],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: []
  },
  optimizeDeps: {
    include: ['three'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'build'
  }
})
