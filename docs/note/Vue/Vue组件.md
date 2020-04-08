---
title: Vue组件
date: 2020-03-31
tags:
 - js
 - Vue
categories:
 - 笔记
---

## 组件注册

### 组件名

- 命名规范：字母全小写且必须包含一个连字符
- 使用 `kebab-case` 定义组件时引用时也必须使用 `kebab-case`
- 使用 `PascalCase` 定义组件时引用时两种命名法都可以使用。

### 全局注册

```javascript
Vue.component('my-component-name', {
  // ... 选项 ...
})
```

### 局部注册

1. 定义组件
2. 在components选项中引入组件

```javascript
var ComponentA = { /* ... */ }
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA
  }
})
```

### 模块系统

#### 在模块系统中局部注册

```javascript
import ComponentA from './ComponentA'

export default {
  components: {
    ComponentA
  }
}
```

#### 基础组件的自动化全局注册

1. 使用`require.context()`获取文件基础组件
2. 遍历注册获得的基础组件

```javascript
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

## Prop

- Prop的大小写: 使用DOM中的模板时`camelCase`的 prop 名需要使用其等价的`kebab-case`命名
- Prop的类型: props属性可以是字符串数组，也可以以对象的形式来指定prop的类型
  ```javascript
  // 字符串数组
  props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
  // 对象
  props: {
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    contactsPromise: Promise // or any other constructor
  }
  ```
- 单向数据流: 父组件更新时子组件中的prop也会随之更新, 但在子组件中无法直接更新prop的值
- Prop验证: `props`属性可以接受一个带有验证需求的对象  
  type支持`String、Number、Boolean、Array、Object、Date、Function、Symbol`
  ```javascript
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
  ```
  ::: tip  
  prop 会在一个组件实例创建之前进行验证，所以实例的属性 (如 data、computed 等) 在 default 或 validator 函数中是不可用的。  
  :::

## 非Prop的Attribute

- 介绍：一个非 `prop` 的 `attribute` 是指传向一个组件，但是该组件并没有相应 prop 定义的 attribute。
- 替换：对于绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的值。
- 合并：对于 `class` 和 `style` 来说，外部的值会和组件内部的值合并
- 禁用：在组件的选项中设置 `inheritAttrs: false`来禁止组件的根元素继承 attribute
  配合实例的 $attrs 属性使用, 可以手动决定这些 attribute 会被赋予哪个元素
  ```javascript
  Vue.component('base-input', {
    inheritAttrs: false,
    props: ['label', 'value'],
    template: `
      <label>
        {{ label }}
        <input
          v-bind="$attrs"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
        >
      </label>
    `
  })
  ```
