'use strict';

const baseRules = {
  camelcase: "error",
  "no-var": "error",
  "no-console": "off",
  "prefer-template": "error",
  "no-multi-assign": "error",
  "no-case-declarations": "error",
  "no-else-return": "error",
  "newline-per-chained-call": "error",
  "import/no-mutable-exports": "error",
  "import/no-cycle": "error",
  "import/no-self-import": "error",
  "comma-dangle": ["error", "always-multiline"],
  "function-paren-newline": ["error", "multiline",],
  "object-shorthand": ["error", "methods", { avoidExplicitReturnArrows: true, },],
  "arrow-parens": ["error", "as-needed", { requireForBlockBody: true, },],
  "no-confusing-arrow": ["error", { allowParens: true, },],
  "id-length": [
    "off",
    {
      properties: "never",
      exceptions: [
        "a",
        "b",
        "c",
        "e",
        "i",
        "j",
        "k",
        "l",
        "o",
        "t",
        "v",
        "_",
        "$",
      ],
    },
  ],
  "no-mixed-operators": "warn",
  "no-param-reassign": "warn",
  "lines-around-comment": [
    "error",
    { beforeBlockComment: true, beforeLineComment: false, },
  ],
  "padded-blocks": "off",
  "padding-line-between-statements": [
    "error",
    { blankLine: "always", prev: "function", next: "function", },
    {
      blankLine: "always",
      prev: ["block-like", "block",],
      next: ["block-like", "block",],
    },
    { blankLine: "always", prev: "*", next: "return", },
  ],
  "@typescript-eslint/no-var-requires": "off",
  "@typescript-eslint/no-explicit-any": "off",
};

const reactRules = {
  camelcase: ["error", { allow: ["^UNSAFE_",], },],
  "jsx-quotes": ["error", "prefer-double",],
  "react/prop-types": "warn",
  "react/jsx-handler-names": [
    "off",
    { eventHandlerPrefix: "(handle|on|set)", checkLocalVariables: true, },
  ],
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "warn",
  "react/jsx-closing-tag-location": 0,
  "react/jsx-closing-bracket-location": [1, "line-aligned",],
};

const tsRules = {
  "@typescript-eslint/no-explicit-any": 1,
  "@typescript-eslint/no-var-requires": "off",
};

module.exports = {
  reportUnusedDisableDirectives: true,
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
      },
    },
  },
  overrides: [
    {
      files: ['*.js'],
      parser: 'babel-eslint',
      extends: [
        require.resolve('eslint-config-standard'),
      ],
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: { jsx: false },
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      rules: Object.assign({}, baseRules),
    },
    {
      files: ['*.jsx'],
      parser: 'babel-eslint',
      extends: [
        'plugin:react/recommended',
        require.resolve('eslint-config-standard'),
        require.resolve('eslint-config-standard-jsx'),
      ],
      plugins: [
        'react-hooks',
      ],
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      settings: { react: { version: 'detect' } },
      rules: Object.assign({}, baseRules, reactRules),
    },
    {
      files: ["*.ts",],
      parser: require.resolve("@typescript-eslint/parser",),
      extends: [
        require.resolve("eslint-config-standard",),
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
      ],
      plugins: ["@typescript-eslint",],
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: { jsx: false, },
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      rules: Object.assign({}, baseRules, tsRules,),
    },
    {
      files: ["*.tsx",],
      parser: require.resolve("@typescript-eslint/parser",),
      extends: [
        "plugin:react/recommended",
        require.resolve("eslint-config-standard",),
        require.resolve("eslint-config-standard-jsx",),
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
      ],
      plugins: ["@typescript-eslint", "react-hooks",],
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: { jsx: true, },
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      settings: { react: { version: "detect", }, },
      rules: Object.assign({}, baseRules, reactRules, tsRules,),
    },
  ]
};
