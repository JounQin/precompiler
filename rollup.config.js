import babel from 'rollup-plugin-babel'
import {argv} from 'yargs'

const suffix = {cjs: '.common', es: '.esm'}

export default {
  entry: 'src/index.js',
  dest: `dist/precompiler${suffix[argv.format] || ''}.js`,
  external: ['underscore'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [['env', {modules: false}], 'stage-0']
    })
  ],
  moduleName: 'precompiler',
  globals: {
    underscore: 'underscore'
  }
}
