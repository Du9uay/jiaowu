import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 生产环境基础路径配置 - GitHub Pages需要仓库名作为base
  base: process.env.NODE_ENV === 'production' ? '/jiaowu/' : '/',
  // 构建配置
  build: {
    outDir: 'dist',
    // 启用 sourcemap 方便调试
    sourcemap: true,
    // 资源内联限制
    assetsInlineLimit: 4096,
  },
  // 开发服务器配置
  server: {
    host: '0.0.0.0',
    port: 5173,
    // 启用热重载
    hmr: true,
  },
  // 预览服务器配置
  preview: {
    host: '0.0.0.0',
    port: 4173,
  }
})
