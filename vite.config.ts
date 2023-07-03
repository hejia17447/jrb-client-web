import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const pathSrc = path.resolve(__dirname, "src")

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd());

  return {
    // 路径别名
    resolve: {
      alias: {
        "@": pathSrc,
      }
    },
    server: {},
    plugins: [vue()],
  }
})
