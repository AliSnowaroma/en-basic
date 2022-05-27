'use strict';

module.exports = {
  extends: [
    'stylelint-config-standard',
  ],
  rules: {
    'at-rule-name-newline-after': 'always-multi-line',
    'at-rule-no-unknown': true, // 禁止使用未知的 at 规则
    'at-rule-semicolon-space-before': 'never',
    'block-no-empty': true, // 禁止出现空块
    'color-hex-case': 'upper', // 指定十六进制颜色大小写
    'color-hex-length': 'long', // 指定十六进制颜色是否使用缩写"short"|"long"
    'color-no-invalid-hex': true, // 禁止使用无效的十六进制颜色
    'comment-no-empty': true, // 禁止空注释
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ], // 在声明的块中中禁止出现重复的属性
    'declaration-block-no-shorthand-property-overrides': true, // 禁止缩写属性覆盖相关普通写法属性
    'font-family-name-quotes': 'always-where-recommended', // --指定字体名称是否需要使用引号引起来
    'font-family-no-duplicate-names': true, // 禁止使用重复的字体名称
    'font-family-no-missing-generic-family-keyword': true, // 不允许移除通用的字体
    'font-weight-notation': 'named-where-possible', // --要求使用数字或命名的 (可能的情况下) font-weight 值
    'function-calc-no-invalid': true, // 禁止在calc函数出现无效的参数
    'function-calc-no-unspaced-operator': true, // 禁止在 calc 函数内使用不加空格的操作符
    'function-linear-gradient-no-nonstandard-direction': true, // 根据标准语法，禁止 linear-gradient() 中无效的方向值
    'function-url-quotes': 'always', // --要求或禁止 url 使用引号
    'keyframe-declaration-no-important': true, // 禁止在 keyframe 声明中使用 !important
    'max-line-length': 100, // --限制单行的长度
    'media-feature-name-no-unknown': true, // 禁止使用未知的 media 特性名称
    'no-duplicate-at-import-rules': true, // 禁止重复的@import
    'no-duplicate-selectors': true, // 在一个样式表中禁止出现重复的选择器
    'no-empty-first-line': true, // --第一行不能为空
    'no-empty-source': true, // 禁止空源
    'no-extra-semicolons': true, // 禁止多余的分号
    'no-invalid-double-slash-comments': true, // 禁用 CSS 不支持的双斜线注释
    'selector-attribute-quotes': 'always', // --要求或禁止特性值使用引号
    'string-no-newline': true, // 禁止在字符串中使用（非转义的）换行符
    'string-quotes': 'single', // --Specify single or double quotes around strings
    'value-list-comma-space-after': 'always-single-line',
  },
}

