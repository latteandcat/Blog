---
title: Mocha笔记
date: 2019-07-01
tags:
 - 单元测试
categories:
 - 笔记
---

## 断言

Mocha允许你使用任意你喜欢的断言库，在上面的例子中，我们使用了Node.js内置的assert模块作为断言。如果能够抛出一个错误，它就能够运行。这意味着你能使用下面的这些仓库，比如：

- should.js
- expect.js
- chai
- better-assert
- unexpected

## 异步测试

- 回调函数：通常命名为done()给it()方法，done()接受一个err
- promise：
  - 除了使用done()回调函数，你也可以返回一个Promise,这可以测试那些返回promise的方法
  - 返回一个promise的同时调用done函数将会导致一个异常。
- async/await

## 同步测试

当测试同步代码的时候，可以省略参数中的回调函数，Mocha会自动的测试代码。

## 箭头函数

向Mocha传递箭头函数是不好的，由于this的词法作用域的问题，箭头函数是不能够访问mocha的上下文的。

## 钩子

> 测试可以出现在before,after或者和你的钩子函数交替出现。钩子函数会按照它们被定义的顺序运行。一般就是，`before()(只运行一次) => beforeEach() => afterEach() => after()(只运行一次)`。

- before：在这个区块内的所有测试之前运行
- after：在这个区块内的所有测试之后运行
- beforeEach：在这个区块内的每个测试运行之前运行
- afterEach：在这个区块内的每个测试之后运行

> 所有的钩子可以是同步的也可以是异步的，其行为就像是普通的测试用例。例如，你希望在每个测试之前，向数据库中填充一些内容。

你可以选择几个文件来添加根级别的钩子。例如，添加`beforeEach()`在所有`describe()`块外面(译者注：可以理解为最顶级作用域中)，这会造成在每个测试用例之前调用这个钩子函数。不仅仅它所在的这个文件(这是因为Mocha有一个暗藏的`describe()`，叫做"root-suite")。

## 测试配置

- delay：使用`mocha --delay` 在mocha命令运行之后，先做一些别的工作，再启动测试。
- pending：不给测试用例传递一个回调函数，就是被等待实现的测试用例，但同样会在报告中体现出来。
- .only()：在用例测试集或者用例单元后面加上此方法，可以让mocha只测试此用例集合或者用例单元。
- .skip()：和`only()`方法相反，`.skip()`方法可以用于跳过某些测试测试集合和测试用例。所有被跳过的用例都会被标记为`pending`用例，在报告中也会以`pending`用例显示。
- retry：Mocha允许你为失败的测试用例指定需要重复的次数。这个功能是为端对端测试所设计的，因为这些测试的数据不好模拟。Mocha不推荐在单元测试中使用这个功能。这个功能会重新运行beforeEach和afterEach钩子，但不会重新运行before/after钩子。
  使用`this.retries(4)` 设置

## 动态生成

Mocha可以使用`Function.prototype.call`和函数表达式来定义测试用例，其实就是动态生成一些测试用例，不需要使用什么特殊的语法。和你见过的其他框架可能有所不同，这个特性可以通过定义一些参数来实现测试用例所拥有的功能。

```javascript
var assert = require('chai').assert;

function add() {
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}

describe('add()', function() {
  var tests = [
    {args: [1, 2],       expected: 3},
    {args: [1, 2, 3],    expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ];

  tests.forEach(function(test) {
    it('correctly adds ' + test.args.length + ' args', function() {
      var res = add.apply(null, test.args);
      assert.equal(res, test.expected);
    });
  });
});
```

## 测试耗时

很多的测试报告都会显示测试所花费的时间，同样也会对一些耗时的测试作出特殊的标记。

我们可以使用slow()方法来明确的表示出，超过多久的时间，这个测试就可以认为是slow的。

```javascript
describe('something slow', function() {
  this.slow(10000);

  it('should take long enough for me to go make a sandwich', function() {
    // ...
  });
});
```

## 测试超时

- 测试集合超时
- 测试用例超时
- 钩子函数超时
- `this.timeout(500);`设置超时时间
- `this.timeout(0);`禁止超时时间的判断
- 内层定义的超时时间会覆盖外层的

## 安装使用

安装：npm install mocha

使用：使用mocha指令

```
格式：mocha [debug] [options] [files]

命令：
    init <path> : 生成一个在浏览器中运行的单元测试的模版
```

接口：mocha的测绘接口类型指的是集中测试用例组织模式的选择。Mocha提供了BDD,TDD,Exports,QUnit和Require-style几种接口。

[接口提供的具体方法](https://segmentfault.com/a/1190000011362879#articleHeader22)

## [测试报告](https://segmentfault.com/a/1190000011362879#articleHeader23)