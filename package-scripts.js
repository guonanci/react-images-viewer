const npsUtils = require('nps-utils')
const path = require('path')
const { series, rimraf, concurrent }  = npsUtils

module.exports = {
  scripts: {
    build: {
      description: 'clean dist directory and run all builds',
      default: series(
        rimraf('dist'),
        rimraf('lib'),
        concurrent
      ),
      rollup: 'rollup --config',
      babel: 'babel src -d lib',
      less: series(
        'lessc examples/src/example.less examples/dist/example.css'
      ),
    },
  }
}
