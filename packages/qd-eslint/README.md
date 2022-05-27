# `qd-eslint`

react eslint自动校验集成库，开箱即用

## Usage

- yarn add qd-eslint -D

```js
module.exports = {
  extends: [
    require.resolve("qd-eslint"),
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // 自定义规则
    "no-console": "off",
    // ...
  },
};
```
