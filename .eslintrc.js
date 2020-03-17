module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    "jest/globals": true
  },
  extends: [
    'airbnb-base',
    "plugin:jest/recommended"
  ],
  plugins: ["jest"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "linebreak-style": 0,
    "new-cap": 0,
    "no-underscore-dangle": 0
  },
};
