module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': ['error', 'windows'],
    indent: ['warn', 2],
    'react/prop-types': 'off',
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
};
