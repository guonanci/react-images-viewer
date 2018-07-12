import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

const name = 'Viewer'
const path = 'dist/react-images-viewer'
const globals = {
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
  react: 'React',
  aphrodite: 'aphrodite',
  'aphrodite/no-important': 'aphroditet',
  // 'react-scrolllock': 'Scrolllock',
  'react-transition-group': 'ReactTransitionGroup',
  'react-spinners': 'BounceLoader'
}

const external = Object.keys(globals)
const babelOptions = (production) => {
  let r = {
    babelrc: false,
    presets: [['es2015', { modules: false }, 'stage-0', 'react']],
    plugins: ['external-helpers']
  }
  if (production) {
    r.plugins.push('transform-react-remove-prop-types')
  }
  return r
}

export default [
  {
    input: 'src/Viewer.js',
    output: {
      file: path + '.es.js'
    },
    external: external,
    plugins: [babel(babelOptions(false))]
  },
  {
    input: 'src/Viewer.js',
    output: {
      name: name,
      file: path + '.js',
      format: 'umd'
    },
    global: global,
    external: external,
    plugins: [babel(babelOptions(true)), resolve(), uglify({}, minify)]
  }
]
