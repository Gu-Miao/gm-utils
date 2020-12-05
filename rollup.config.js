import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const name = 'GmUtils'

export default {
  input: 'src/index.js',
  output: [
    {
      name,
      file: pkg.browser,
      format: 'umd',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'esm'
    },
    {
      name,
      file: path.join('dist/browser/', `gmUtils-${pkg.version}.js`),
      format: 'iife',
      sourcemap: true
    },
    {
      name,
      file: path.join('dist/browser/', `gmUtils-${pkg.version}.min.js`),
      format: 'iife',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    eslint({ exclude: 'node_modules' }),
    babel({ exclude: 'node_modules', babelHelpers: 'bundled' })
  ]
}
