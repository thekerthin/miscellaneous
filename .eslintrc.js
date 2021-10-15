module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    'node': true
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'quotes': ['error', 'single'],
    'semi': [2, 'always'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
};
