import { fileURLToPath, URL } from 'url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return { 
    define : {
    },
    server : {
          host: "dev.lan",
          watch: {
              usePolling: true,
              interval: 1000,
              binaryInterval: 3000
          },
          /*
          hmr: {
              port: 2500
          }
          */
      },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
