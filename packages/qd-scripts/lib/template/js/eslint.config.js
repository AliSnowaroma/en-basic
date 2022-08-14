module.exports = {
  extends: [
    require.resolve('qd-eslint'),
  ],
  settings: {
    react: {
      version: 'detect', // 告诉 eslint-plugin-react 自动检测 React 的版本
    },
  },
  rules: {
    // 自定义规则
    'no-console': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-named-as-default': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/named': 'off',
    experimentalDecorators: 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
}
