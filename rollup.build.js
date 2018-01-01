const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

const defaultPlugins = [
  babel({
    exclude: 'node_modules/**'
  })
]

// Regular bundle
rollup.rollup({
  input: 'src/SerialTools1200.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}).then(bundle => {
  bundle.write({
    format: 'umd',
    name: 'SerialTools1200',
    file: 'build/SerialTools1200.js',
    indent: '  ',
  })
})

// Minified bundle
rollup.rollup({
  input: 'src/SerialTools1200.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    uglify({})
  ],
}).then(bundle => {
  bundle.write({
    format: 'umd',
    name: 'SerialTools1200',
    file: 'build/SerialTools1200.min.js',
    indent: '  ',
  })
})

// Module bundle
rollup.rollup({
  input: 'src/SerialTools1200.js',
}).then(bundle => {
  bundle.write({
    format: 'es',
    file: 'build/SerialTools1200.module.js',
  })
})
