import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 모든 IP 주소에서 접근 가능
    port: 5173  // 원하는 포트 번호
  },
  resolve: { //추가
    alias: [{
      find: "@src",
      replacement: path.resolve(__dirname, "src")
    },
    {
      find: "@components",
      replacement: path.resolve(__dirname, "src/components")
    }
    ]
  },
  css: {
    postcss: './postcss.config.cjs',
  },
})
