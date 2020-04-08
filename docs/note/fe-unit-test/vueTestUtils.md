---
title: VueTestUtils笔记
tags:
 - 单元测试
categories:
 - 笔记
date: 2019-07-01
---

[官网](https://vue-test-utils.vuejs.org/zh/)

[API](https://vue-test-utils.vuejs.org/zh/api/)

[Wrapper](https://vue-test-utils.vuejs.org/zh/api/wrapper/)

[WrapperArray](https://vue-test-utils.vuejs.org/zh/api/wrapper-array/)

[挂载选项](https://vue-test-utils.vuejs.org/zh/api/options.html)

[组件](https://vue-test-utils.vuejs.org/zh/api/components/)

## 起步demo

挂载 ==> 测试 ==> 模拟交互

```javascript
/* eslint-disable no-unused-expressions */
import { mount } from '@vue/test-utils'// 从测试实用工具集中导入 `mount()` 方法
import Counter from '@/components/counter.vue'// 导入要测试的组件
import { expect } from 'chai'// 导入要使用的断言集

describe.only('Counter', () => {
  // 现在挂载组件，你便得到了这个包裹器
  const wrapper = mount(Counter)
  // 检查该组件渲染出来的 HTML 是否符合预期。
  it('renders the correct markup', () => {
    expect(wrapper.html()).contain('<span class="count">0</span>')
  })
  // 也便于检查已存在的元素
  it('has a button', () => {
    expect(wrapper.contains('button')).to.be.ok
  })
  // 模拟用户交互
  it('button click should increment the count', () => {
    expect(wrapper.vm.count).toBe(0)
    const button = wrapper.find('button')// 定位按钮
    button.trigger('click')// 模拟点击
    expect(wrapper.vm.count).toBe(1)
  })
})
```

## 关于nextTick()

> 为了简化用法，Vue Test Utils 同步应用了所有的更新，所以你不需要在测试中使用 Vue.nextTick > 来等待 DOM 更新。
>
> 注意：当你需要为诸如异步回调或 Promise 解析等操作显性改进为事件循环的时候，nextTick 仍然是必要的。

如果你仍然需要在自己的测试文件中使用 `nextTick`，注意任何在其内部被抛出的错误可能都不会被测试运行器捕获，因为其内部使用了 Promise。

关于这个问题有两个建议：

- 要么你可以在测试的一开始将 Vue 的全局错误处理器设置为 `done` 回调
- 要么你可以在调用 `nextTick` 时不带参数让其作为一个 Promise 返回

```javascript
// 这不会被捕获
it('will time out', done => {
  Vue.nextTick(() => {
    expect(true).toBe(false)
    done()
  })
})

// 接下来的两项测试都会如预期工作
it('will catch the error using done', done => {
  Vue.config.errorHandler = done
  Vue.nextTick(() => {
    expect(true).toBe(false)
    done()
  })
})

it('will catch the error using a promise', () => {
  return Vue.nextTick().then(function() {
    expect(true).toBe(false)
  })
})
```

## 常用技巧

### 测试什么

> 对于UI组件的测试不要一味地追求行覆盖率，因为它会导致我们过分关注组件的内部实现细节，从而导致琐碎的测试。

取而代之的是，我们推荐把测试撰写为断言你的组件的公共接口，并在一个黑盒内部处理它。一个简单的测试用例将会断言一些输入 (用户的交互或 prop 的改变) 提供给某组件之后是否导致预期结果 (渲染结果或触发自定义事件)。

比如，对于每次点击按钮都会将计数加一的 `Counter` 组件来说，其测试用例将会模拟点击并断言渲染结果会加 1。该测试并没有关注 `Counter` 如何递增数值，而只关注其输入和输出。

该提议的好处在于，即便该组件的内部实现已经随时间发生了改变，只要你的组件的公共接口始终保持一致，测试就可以通过。

### 浅渲染

> 浅渲染的背景
>
> 在测试用例中，我们通常希望专注在一个孤立的单元中测试组件，避免对其子组件的行为进行间接的断言。
>
> 额外的，对于包含许多子组件的组件来说，整个渲染树可能会非常大。重复渲染所有的子组件可能会让我们的测试变慢。

Vue Test Utils 允许你通过 `shallowMount` 方法只挂载一个组件而不渲染其子组件 (即保留它们的存根)

### 断言触发的事件

每个挂载的包裹器都会通过其背后的 Vue 实例自动记录所有被触发的事件。你可以用 `wrapper.emitted()` 方法取回这些事件记录。

然后你可以基于这些数据来设置断言，你也可以调用 `wrapper.emittedByOrder()` 获取一个按触发先后排序的事件数组。

### 从子组件触发事件

你可以通过访问子组件实例来触发一个自定义事件

### 操作组件状态

你可以在包裹器上用 `setData` 或 `setProps` 方法直接操作组件状态

### 仿造 Prop

你可以使用 Vue 在内置 `propsData` 选项向组件传入 prop

也可以用 `wrapper.setProps({})` 方法更新这些已经挂载的组件的 prop

### 应用全局的插件和混入

有些组件可能依赖一个全局插件或混入 (mixin) 的功能注入，比如 `vuex` 和 `vue-router`。

如果你在为一个特定的应用撰写组件，你可以在你的测试入口处一次性设置相同的全局插件和混入。但是有些情况下，比如测试一个可能会跨越不同应用共享的普通的组件套件的时候，最好还是在一个更加隔离的设置中测试你的组件，不对全局的 `Vue` 构造函数注入任何东西。我们可以使用 [`createLocalVue`](https://vue-test-utils.vuejs.org/zh/api/createLocalVue.html) 方法来存档它们

```javascript
import { createLocalVue } from '@vue/test-utils'

// 创建一个扩展的 `Vue` 构造函数
const localVue = createLocalVue()

// 正常安装插件
localVue.use(MyPlugin)

// 在挂载选项中传入 `localVue`
mount(Component, {
  localVue
})
```

### 仿造注入

另一个注入 prop 的策略就是简单的仿造它们。你可以使用 `mocks` 选项

```javascript
import { mount } from '@vue/test-utils'

const $route = {
  path: '/',
  hash: '',
  params: { id: '123' },
  query: { q: 'hello' }
}

mount(Component, {
  mocks: {
    // 在挂载组件之前
    // 添加仿造的 `$route` 对象到 Vue 实例中
    $route
  }
})
```

### 存根组件

你可以使用 `stubs` 选项覆写全局或局部注册的组件

```javascript
import { mount } from '@vue/test-utils'

mount(Component, {
  // 将会把 globally-registered-component 解析为
  // 空的存根
  stubs: ['globally-registered-component']
})
```

## 测试键盘、鼠标等其它 DOM 事件

### 触发事件

`Wrapper` 暴露了一个 `trigger` 方法。它可以用来触发 DOM 事件。

```javascript
const wrapper = mount(MyButton)

wrapper.trigger('click')
```

`find` 方法也会返回一个 `Wrapper`。假设 `MyComponent` 包含一个按钮，下面的代码会点击这个按钮。

```javascript
const wrapper = mount(MyComponent)

wrapper.find('button').trigger('click')
```

###  选项

`trigger` 方法接受一个可选的 `options` 对象。这个 `options` 对象里的属性会被添加到事件中。

注意其目标不能被添加到 `options` 对象中。

### 键盘限制

键盘可以用`wrapper.trigger('keydown.xxx')`来触发

此种方式支持的按键名是有限的，这些按键名会被翻译成一个`keyCode`

| key name  | key code |
| --------- | -------- |
| enter     | 13       |
| esc       | 27       |
| tab       | 9        |
| space     | 32       |
| delete    | 46       |
| backspace | 8        |
| insert    | 45       |
| up        | 38       |
| down      | 40       |
| left      | 37       |
| right     | 39       |
| end       | 35       |
| home      | 36       |
| pageup    | 33       |
| pagedown  | 34       |

其他按键的触发为下面这种形式

```javascript
wrapper.trigger('keydown', {
    key: 'a'
})
```

## 配合Vue Router 使用

### 在测试中安装Vue Router

在测试中，你应该杜绝在基本的 Vue 构造函数中安装 Vue Router。安装 Vue Router 之后 Vue 的原型上会增加 `$route` 和 `$router` 这两个只读属性。

为了避免这样的事情发生，我们创建了一个 `localVue` 并对其安装 Vue Router。

```javascript
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

shallowMount(Component, {
  localVue,
  router
})
```

> **注意：**在一个 `localVue` 上安装 Vue Router 时也会将 `$route` 和 `$router`作为两个只读属性添加给该 `localVue`。这意味着如果你使用安装了 Vue Router 的 `localVue`，则不能在挂在一个组件时使用 `mocks` 选项来覆写 `$route` 和 `$router`。

### 测试使用了 `router-link` 或 `router-view` 的组件

当你安装 Vue Router 的时候，`router-link` 和 `router-view` 组件就被注册了。这意味着我们无需再导入可以在应用的任意地方使用它们。

当我们运行测试的时候，需要令 Vue Router 相关组件在我们挂载的组件中可用。有以下两种做法

- 使用存根

  ```javascript
  import { shallowMount } from '@vue/test-utils'
  
  shallowMount(Component, {
    stubs: ['router-link', 'router-view']
  })
  ```

- 为 localVue 安装 Vue Router

  ```javascript
  import { shallowMount, createLocalVue } from '@vue/test-utils'
  import VueRouter from 'vue-router'
  
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  
  shallowMount(Component, {
    localVue
  })
  ```

### 伪造 $route 和 $router

有的时候你想要测试一个组件在配合 `$route` 和 `$router` 对象的参数时的行为。这时候你可以传递自定义假数据给 Vue 实例。

```javascript
import { shallowMount } from '@vue/test-utils'

const $route = {
  path: '/some/path'
}

const wrapper = shallowMount(Component, {
  mocks: {
    $route
  }
})

wrapper.vm.$route.path // /some/path
```

> 安装 Vue Router 会在 Vue 的原型上添加 `$route` 和 `$router` 只读属性。
>
> 这意味着在未来的任何测试中，伪造 `$route` 或 `$router` 都会失效。
>
> 要想回避这个问题，就不要在运行测试的时候全局安装 Vue Router，而用上述的 `localVue` 用法。

## 在组件中测试Vuex

### 伪造Action

站在测试的角度，我们不关心这个 action 做了什么或者这个 store 是什么样子的。我们只需要知道这些 action 将会在适当的时机触发，以及它们触发时的预期值。

为了完成这个测试，我们需要在浅渲染组件时给 Vue 传递一个伪造的 store。

我们可以把 store 传递给一个 [`localVue`](https://vue-test-utils.vuejs.org/zh/api/options.html#localvue)，而不是传递给基础的 Vue 构造函数。`localVue` 是一个独立作用域的 Vue 构造函数，我们可以对其进行改动而不会影响到全局的 Vue 构造函数。

### 伪造Getter

我们并不关注这些 getter 返回什么——只关注它们被正确的渲染。

### 伪造Module

[Module](https://vuex.vuejs.org/zh/guide/modules.html) 对于将我们的 store 分隔成多个可管理的块来说非常有用。它们也暴露 getter。我们可以在测试中使用它们。

### 测试一个Vuex Store

这里有两个测试 Vuex store 的方式。第一个方式是分别单元化测试 getter、mutation 和 action。第二个方式是创建一个 store 并针对其进行测试。两种方式的比较如下。

- 分别测试 getter、mutation 和 action
  Getter、mutation 和 action 全部是 js 函数，所以我们可以不通过 Vue Test Utils 和 Vuex 测试它们。
  分别测试 getter、mutation 和 action 的好处是你的单元测试是非常详细的。当它们失败时，你完全知道你代码的问题是什么。当然另外一方面你需要伪造诸如 `commit` 和 `dispatch` 的 Vuex 函数。这会导致在一些情况下你伪造错了东西，导致单元测试通过，生产环境的代码却失败了。
- 这样做的好处是我们不需要伪造任何 Vuex 函数。另一方面当一个测试失败时，排查问题的难度会增加。