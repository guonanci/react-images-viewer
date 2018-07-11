// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'react',
  ],
  // check if imports actually resolve
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: '16.4.1'
    },
  },
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-unused-vars": [2, { "vars": "all", "args": "after-used" }],
    'global-require': 0,
  }
}
