---
title: Vue-cli3中的前端单元测试之环境搭建
date: 2019-07-18
sidebar: auto
tags: 
 - 单元测试
categories:
 - 前端
---

> 本文中所用到的测试工具如下  
> kmci: karma + mocha + chai + istanbul  
> 此文只涉及在vue-cli3中如何集成以上工具，不再详细介绍各个工具

<!-- more -->

## mocha + chai

首先创建vue-cli3的项目

```
vue create unit-test
```

在预设环境中选择unit-test 随后选择mocha + chai

之后项目就自带了vue-cli帮我们集成的mocha和chai

## karma

### 1.安装相关依赖

```
npm install --save-dev karma karma-chrome-launcher karma-mocha karma-sourcemap-loader karma-spec-reporter karma-webpack
```

### 2.配置karma

在项目的根目录执行karma的初始化方法，生成`karma.conf.js`

```
karma init
```

初始化过程中，会有一些选项，用于生成配置文件的默认值。

```
Which testing framework do you want to use ?
Press tab to list possible options. Enter to move to the next question.
> mocha

Do you want to use Require.js ?
This will add Require.js plugin.
Press tab to list possible options. Enter to move to the next question.
> no

Do you want to capture any browsers automatically ?
Press tab to list possible options. Enter empty string to move to the next question.
> Chrome
>

What is the location of your source and test files ?
You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
Enter empty string to move to the next question.
>

Should any of the files included by the previous patterns be excluded ?
You can use glob patterns, eg. "**/*.swp".
Enter empty string to move to the next question.
>

Do you want Karma to watch all the files and run the tests on change ?
Press tab to list possible options.
> yes
```

更改生成的karma配置文件

添加了**webpack**相关的配置，增加了**测试文件**和**需要预编辑的文件**的匹配条件式。

```
// Karma configuration
// Generated on Mon Jul 01 2019 18:02:32 GMT+0800 (GMT+08:00)
let webpackConfig = require('@vue/cli-service/webpack.config.js')
module.exports = function (config) {
  config.set({
    webpack: webpackConfig,
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      'tests/**/*.spec.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
```

### 3.编写测试用例

理论上应为每个Vue组件分别写一个单元测试文件。测试文件名应该为“**[组件名].spec.js**”，比如组件名为`HelloWorld.vue`，那么对应的测试文件名为`HelloWorld.spec.js`

### 4.运行测试用例

在`package.json`中添加一条script。

```
"test": "karma start"
```

然后运行执行命令，开始测试。

```
npm run test
```

[参考文章](https://blog.csdn.net/dikentoujing99/article/details/86686348): 若遇到webpack的编译报错请参考原文解决方案

## istanbul

### 1.安装相关依赖

```
npm install --save-dev babel-plugin-istanbul istanbul-instrumenter-loader nyc
```

### 2.配置babel

babel.config.js

```js
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    'babel-plugin-istanbul'
  ]
}
```

### 3.配置webpack

vue.config.js

```js
const path = require('path')
module.exports = {
  chainWebpack: config => {
    config.devtool('eval')
    config.module
      .rule('istanbul')
      .test(/\.(js|vue)$/)
      .enforce('post')
      .include.add(path.resolve(__dirname, '/src'))
      .end()
      .use('istanbul-instrumenter-loader')
      .loader('istanbul-instrumenter-loader')
      .options({ esModules: true })
      .end()
  }
}
```

### 4.配置nyc

nyc是istanbul的命令行工具

package.json

```
"nyc": {
    "check-coverage": true,
    "per-file": true,
    "lines": 90,
    "statements": 90,
    "functions": 90,
    "branches": 90,
    "include": [
      "src/**/*.{js,vue}"
    ],
    "exclude": [
      "src/*.js"
    ],
    "reporter": [
      "text",
      "lcov",
      "text-summary"
    ],
    "extension": [
      ".js",
      ".vue"
    ],
    "cache": true,
    "all": true
  }
```

### 5.使用

- Single-run: `nyc vue-cli-service test:unit`
- Watched run: `nodemon --exec nyc vue-cli-service test:unit`
- add `coverage` and `.nyc_output` to your `.gitignore`.
- npm install --save-dev nodemon（用于监听）

[参考issue](https://github.com/vuejs/vue-cli/issues/1363)：遇到的一些问题的解决方案也都来源于issue

## Vue Test Utils

直接安装即可使用 `npm install --save-dev @vue/test-utils `

## 相关链接

[练习项目](https://github.com/smallsunnyfox/frontend-unit-test)

[Istanbul官网](https://istanbul.js.org/)

[Mocha中文文档](https://segmentfault.com/a/1190000011362879#articleHeader4)

[Chai BDD 风格中文文档](https://www.jianshu.com/p/f200a75a15d2)

[Chai TDD 风格断言库](https://www.chaijs.com/api/assert/)

[Karma官网](http://karma-runner.github.io/latest/index.html)

[element-ui的单元测试](https://github.com/ElemeFE/element/tree/dev/test/unit)

[Vue组件的单元测试](https://cn.vuejs.org/v2/cookbook/unit-testing-vue-components.html)

[Testing Vue.js Applications](https://cn.vuejs.org/v2/cookbook/unit-testing-vue-components.html)