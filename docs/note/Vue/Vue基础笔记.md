---
title: Vue.js基础笔记
date: 2020-01-09
tags:
 - js
 - Vue
categories:
 - 笔记
---

## Vue模板语法

### 插值

::: tip
vue的模板语法{{}}双大括号插值 react{}
:::

数据绑定最常见的形式就是使用 `Mustache` 语法 (双大括号) 的文本插值

```javascript
插入属性值 {{ msg }}
插入运算 {{ num + 1 }}
插入布尔值 {{ isTrue }}
插入JS表达式 {{ str.split('').reverse().join('') }}
插入三元运算符 {{ 1 > 2 ? '真的' : '假的' }}
插入字符串 {{ 'hahahahah' }}
插入对象 {{ {name:'zhangsan'} }}
```

### 指令

- 指令的介绍：指令 (Directives) 是带有 `v-` 前缀的特殊 attribute。
- 指令 attribute 的值预期是单个 JavaScript 表达式（ `v-for` 例外）
- 指令的职责：当表达式的值改变时，将其产生的连带影响，**响应式**地作用于 DOM。
- 指令的演示
  - `v-text`：元素的 `innerText` 属性，必须是双标签 跟 `{{}}` 效果是一样的 使用较少
  - `v-once`：一次性插值 `<span v-once>这个将不会改变: {{ msg }}</span>`
  - `v-html`：元素的 `innerHtml`
  - `v-if`：数据属性对应的值为假则不渲染，反之渲染 `appendChild()/removeChild()`
  - `v-else-if`
  - `v-else`
  - `v-show`：控制dom元素的显示隐藏 `display:none/block;`
    ::: tip
    **v-if 和 v-show的区别（官网解释）**   
    v-if 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做，直到条件第一次变为真时，才会渲染条件块。  
    相比之下，v-show 就简单的多，不管初始条件是什么，元素总是会被渲染，并且只是简单的基于CSS进行切换。  
    一般来说，v-if 有更高的切换开销，而v-show有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用v-show较好；如果在运行时条件甚少改变，则使用v-if较好
    :::
  - `v-on`:监听 DOM 事件，并在触发时运行一些 JavaScript 代码  简写为 `@`
    - 可以绑定方法
    - 也可以直接内联 JavaScript 语句
    - `Vue` 为 `v-on` 提供了事件修饰符来解决对事件细节的处理
      ```html
      <!-- 阻止单击事件继续传播 -->
      <a v-on:click.stop="doThis"></a>
      
      <!-- 提交事件不再重载页面 -->
      <form v-on:submit.prevent="onSubmit"></form>
      
      <!-- 修饰符可以串联 -->
      <!--v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。-->
      <a v-on:click.stop.prevent="doThat"></a>
      
      <!-- 只有修饰符 -->
      <form v-on:submit.prevent></form>
      
      <!-- 添加事件监听器时使用事件捕获模式 -->
      <!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
      <div v-on:click.capture="doThis">...</div>
      
      <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
      <!-- 即事件不是从内部元素触发的 -->
      <div v-on:click.self="doThat">...</div>
      
      <!-- 点击事件将只会触发一次 -->
      <a v-on:click.once="doThis"></a>
      
      <!-- Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符。-->
      <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
      <!-- 而不会等待 `onScroll` 完成  -->
      <!-- 这其中包含 `event.preventDefault()` 的情况 -->
      <div v-on:scroll.passive="onScroll">...</div>
      ```
    - `Vue` 允许为 `v-on` 在监听键盘事件时添加按键修饰符
      ```html
      <!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
      <input v-on:keyup.enter="submit">

      <!-- 你可以直接将 KeyboardEvent.key 暴露的任意有效按键名转换为 kebab-case 来作为修饰符 -->
      <input v-on:keyup.page-down="onPageDown">
      ```
    - 使用系统修饰键来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。
      - `.ctrl`
      - `.alt`
      - `.shift`
      - `.meta`
      - `.exact`: 实现系统修饰符的精确控制
      - `.left`: 鼠标左键
      - `.right`: 鼠标右键
      - `.middle`: 鼠标滑轮
      ```html
      <!-- Alt + C -->
      <input @keyup.alt.67="clear">

      <!-- Ctrl + Click -->
      <div @click.ctrl="doSomething">Do something</div>

      <!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
      <button @click.ctrl="onClick">A</button>

      <!-- 有且只有 Ctrl 被按下的时候才触发 -->
      <button @click.ctrl.exact="onCtrlClick">A</button>

      <!-- 没有任何系统修饰符被按下的时候才触发 -->
      <button @click.exact="onClick">A</button>
      ```
  - `v-bind`：绑定标签上的属性（内置属性和自定义属性）简写为 `:`  
    使用`v-bind`绑定class和style
    - 操作元素的 class 列表和内联样式是数据绑定的一个常见需求
    - 在将 `v-bind` 用于 `class` 和 `style` 时, 表达式结果的类型除了字符串之外，还可以是对象或数组。
    - 当在一个自定义组件上使用 class 属性时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖。
    - 当 `v-bind:style` 使用需要添加`浏览器引擎前缀`的 CSS 属性时，如 `transform`，`Vue.js` 会自动侦测并添加相应的前缀。
    - 从 2.3.0 起你可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值
    ```javascript
    // 绑定HTML class

    // 对象语法
    <div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
    // 数组语法
    <div v-bind:class="[activeClass, errorClass]"></div>
    // 使用三元表达式切换样式
    <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

    // 绑定内联样式

    // 对象语法
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    // 数组语法 （将多个样式对象应用到同一个元素上）
    <div v-bind:style="[baseStyles, overridingStyles]"></div>
    // 多重值 （只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。）
    <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
    ```
  - `v-for`
    - 基于一个数组来渲染一个列表 `v-for="(item, index) in items"`
    - 也可以用`of`来代替`in`, 这样更接近Javascripe迭代器的语法
    - 遍历一个对象的属性 `v-for="(value, name) in object"`
    - 在遍历对象时，会按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下都一致。
    - 建议尽可能在使用 `v-for` 时提供 key attribute, 以便跟踪每个节点的身份，从而重用和重新排序现有元素
    - 不要使用对象或数组之类的非基本类型值作为 v-for 的 key。请用字符串或数值类型的值。
    - 数组更新检测
      - Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新  
        包括`push() pop() shift() unshift() splice()
        sort() reverse()`
      - 当使用非变异方法时，可以用新数组替换旧数组
      - Vue不能检测通过索引和数组长度导致的数组的变动解决办法如下
      ```javascript
      // 解决无法检测通过索引设置数组项
      Vue.set(vm.items, indexOfItem, newValue)
      // 或者
      vm.items.splice(indexOfItem, 1, newValue)
      // 解决无法检测修改数组长度
      vm.items.splice(newLength)
      ```
    - 对象更新检测
      - Vue 不能检测对象属性的添加或删除
      - 对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。但是，可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式属性。
      - 为已有对象赋值多个新属性应该用新属性创建一个新对象赋给已有对象
        ```javascript
        vm.userProfile = Object.assign({}, vm.userProfile, {
          age: 27,
          favoriteColor: 'Vue Green'
        })
        ```
    - 过滤和排序数组
      - 通过计算属性 `v-for="n in computedEvenNumbers"`
      - 通过方法 `v-for="n in getEvenNumbers(numbers)`
  - `v-model`
    - 用于在表单中创建双向数据绑定，负责监听用户的输入事件以更新数据
    - `v-model` 在内部为不同的输入元素使用不同的属性并抛出不同的事件
      - text 和 textarea 元素使用 `value` 属性和 `input` 事件；
      - checkbox 和 radio 使用 `checked` 属性和 `change` 事件；
      - select 字段将 value 作为 `prop` 并将 `change` 作为事件。
    - 修饰符
      - `.lazy`: 从触发input事件时更新改为触发change事件更新
      - `.number`: 自动将用户的输入值转为数值类型
      - `.trim`: 自动过滤用户输入的首尾空白字符
## 计算属性

### 使用场景
模板内的表达式 ===> 简单运算  
复杂逻辑 ===> 计算属性

### 与方法的比较

- 将同一函数定义为一个方法或者一个计算属性的最终结果确实是完全相同的
- 不同的是计算属性是基于它们的响应式依赖进行缓存的
- 只在相关响应式依赖发生改变时它们才会重新求值
- 每当触发重新渲染时，调用方法将总会再次执行函数
- 缓存的目的是避免多次执行性能开销比较大的计算属性

### 与侦听属性的比较
- `Vue` 提供了一种更通用的方式来观察和响应 `Vue` 实例上的数据变动：侦听属性
- 当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch`

```javascript
watch: {
  firstName: function (val) {
    this.fullName = val + ' ' + this.lastName
  },
  lastName: function (val) {
    this.fullName = this.firstName + ' ' + val
  }
},
computed: {
  fullName: function () {
    return this.firstName + ' ' + this.lastName
  }
}
```

### 计算属性的setter

```javascript
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

## 侦听器

### 使用场景

需要在数据变化时执行异步或开销较大的操作时使用侦听器来响应数据的变化

```javascript
watch: {
  // 如果 `question` 发生改变，这个函数就会运行
  question: function (newQuestion, oldQuestion) {
    this.answer = 'Waiting for you to stop typing...'
    this.debouncedGetAnswer()
  }
}
```

## 组件基础

- 组件可以复用无数次，每用一次组件，就会有一个它的新实例被创建
- 一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝
- 每个组件必须只有一个根元素
- 组件的插槽可以向组件传递内容，只需要在组件内部使用`<slot></slot>`
- 可以通过Vue 的 `<component>` 元素的 `is` 属性来实现动态组件

### 通过props传递数据

Prop 是你可以在组件上注册的一些自定义 attribute。当一个值传递给一个 prop attribute 的时候，它就变成了那个组件实例的一个属性。  

一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。

### 使用`$emit`触发事件

1. 子组件可以通过调用内建的 `$emit` 方法传入事件名称来触发一个事件
2. 父组件可以通过 v-on 来监听子组件要触发的事件来调用父组件中的方法
3. 可以使用 `$emit` 的第二个参数来传递参数
