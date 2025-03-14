import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import autoprefixer from 'autoprefixer';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from 'tailwindcss';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      // {
      //   file: packageJson.main,
      //   format: 'cjs',
      //   sourcemap: true,
      // },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        noCheck: true, // Disable type checking
      }),
      terser(),
      postcss({
        extract: true, // Extract CSS into a separate file
        minimize: true, // Minify CSS
        plugins: [
          tailwindcss(), // Make sure you've installed tailwindcss
          autoprefixer(), // ...and autoprefixer
        ],
      }),
      // postcss({
      // extract: true, // Extract CSS into a separate file
      // minimize: true, // Minify CSS
      // plugins: [
      //   require('tailwindcss'),
      //   require('autoprefixer'),
      // ],
      // }),
    ],
    external: ['react', 'react-dom'],
  },
  // {
  //   input: 'src/index.ts',
  //   output: [{ file: packageJson.types }],
  //   plugins: [dts.default()],
  //   external: [/\.css$/],
  // },
];
