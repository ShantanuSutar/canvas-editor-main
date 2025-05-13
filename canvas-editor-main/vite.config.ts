// vite.config.ts
import { defineConfig } from 'vite'
import typescript from '@rollup/plugin-typescript'
import dts from 'vite-plugin-dts'
import * as path from 'path'

export default defineConfig(({ mode }) => {
  const pkgName = 'canvas-editor'

  if (mode === 'lib') {
    return {
      plugins: [
        // 1) Compile TS
        {
          ...typescript({
            tsconfig: './tsconfig.json',
            declaration: false // let vite-plugin-dts handle .d.ts
          }),
          apply: 'build'
        },

        // 2) Generate .d.ts files into dist/
        dts({
          insertTypesEntry: true,
          outDir: 'dist/types'
        })
      ],

      build: {
        // emit source maps alongside each bundle
        sourcemap: true,

        // extract CSS into its own file(s)
        cssCodeSplit: true,

        // enable treeshaking target
        target: 'esnext',

        lib: {
          entry: path.resolve(__dirname, 'src/editor/index.ts'),
          name: 'CanvasEditor',
          formats: ['es', 'umd'],
          // outputs:
          //   dist/canvas-editor.es.js      + dist/canvas-editor.es.js.map
          //   dist/canvas-editor.umd.js     + dist/canvas-editor.umd.js.map
          fileName: format => `${pkgName}.${format}.js`
        },

        rollupOptions: {
          // externals you don’t want to bundle:
          external: ['vue'],
          output: {
            // if user publishes to NPM, they’ll import Vue themselves
            globals: {
              vue: 'Vue'
            },
            // assetFileNames lets us name the CSS output
            assetFileNames: assetInfo => {
              if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                return `${pkgName}.css`
              }
              // fallback for svg, png, etc.
              return 'assets/[name]-[hash][extname]'
            }
          }
        }
      }
    }
  }

  // default "app" mode (dev / preview)
  return {
    base: `/${pkgName}/`,
    server: {
      host: '0.0.0.0'
    }
  }
})
