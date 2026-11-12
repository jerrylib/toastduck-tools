// GitHub Pages 没有服务端重写规则，BrowserRouter 的深层路径（如 /toastduck-tools/exchange-rate）
// 会返回 404。这里把构建好的 index.html 复制一份为 404.html，让 404 响应也能把 SPA 拉起来，
// 浏览器地址栏保持不变，路由由 BrowserRouter 按 pathname 匹配。
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const distDir = resolve(process.cwd(), 'dist')
const indexFile = resolve(distDir, 'index.html')
const notFoundFile = resolve(distDir, '404.html')

if (!existsSync(indexFile)) {
  console.error('[copy-404] dist/index.html 不存在，请先执行 vite build')
  process.exit(1)
}

copyFileSync(indexFile, notFoundFile)
console.log('[copy-404] 已生成 dist/404.html')
