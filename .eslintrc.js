/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2020-09-04 10:59:42
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-05-25 17:56:52
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript/recommended', '@vue/prettier', '@vue/prettier/@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],
    'no-unused-vars': 'off',
    'vue/no-unused-vars': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  }
}
