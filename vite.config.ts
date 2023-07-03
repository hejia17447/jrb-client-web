import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

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
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],
        eslintrc: {
          // 是否自动生成 eslint 规则，建议生成之后设置 false 
          enabled: true, 
          // 指定自动导入函数 eslint 规则的文件
          filepath: "./.eslintrc-auto-import.json", 
        },
        // 指定自动导入函数TS类型声明文件路径
        dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"), 
      }),
      Components({
        // 指定自动导入组件TS类型声明文件路径
        dts: path.resolve(pathSrc, "types", "components.d.ts"), 
      }),
    ],
  }
})
