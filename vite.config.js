import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const researchIndex = path.resolve(rootDir, 'public/research/index.html')

function researchDirectoryIndex() {
  const attach = (server) => {
    const base = (server.config.base || '/').replace(/\/$/, '')
    const matches = new Set([`${base}/research`, `${base}/research/`, '/research', '/research/'])
    server.middlewares.use((req, res, next) => {
      const url = req.url?.split('?')[0]
      if (!matches.has(url)) {
        next()
        return
      }
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(fs.readFileSync(researchIndex))
    })
  }

  return {
    name: 'research-directory-index',
    configureServer: attach,
    configurePreviewServer: attach,
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/rundoo/',
  plugins: [react(), tailwindcss(), researchDirectoryIndex()],
})
