import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'CTable',
      fileName: 'ctable',
      formats:["umd","es"]
    },
    target:"modules",
    minify:true,
    sourcemap:false,
  },
})
