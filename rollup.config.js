import babel from 'rollup-plugin-babel'
import {argv} from 'yargs'

const {watch} = argv

export default {
  entry: 'src/index.js',
  dest: `dist/precompiler${watch ? '' : '.esm'}.js`,
  format: watch ? 'cjs' : 'es',
  external: ['underscore'],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
