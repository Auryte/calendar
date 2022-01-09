module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: [2, 'always'],
    'id-length': [2, { max: 25 }],
    'max-lines-per-function': [2],
    'max-len': [2, { code: 100 }],
    'no-console': [1],
    quotes: [2, 'single']
  }
};
