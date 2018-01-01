const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

const banner = "// Copyright 2017 Chris Brown https://2pha.com\n// http://www.apache.org/licenses/LICENSE-2.0";

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
    banner: banner,
  })
})

// Minified bundle
rollup.rollup({
  input: 'src/SerialTools1200.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    uglify({output: {preamble: banner}})
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
    banner: banner,
  })
})
