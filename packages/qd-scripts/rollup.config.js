import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json'

export default {
  input: 'commander/qd-scripts.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json()
  ]
};

// import chalk from 'chalk'
// import inquirer from 'inquirer'
// import figlet from 'figlet'
// import ora from 'ora'
