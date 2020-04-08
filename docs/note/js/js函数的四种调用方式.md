---
title: JS函数的四种调用方式
tags:
 - js
categories:
 - 笔记
date: 2019-11-27
---

> 在ES6之前，函数内部的this是由该函数的调用方式决定的，跟大小写和书写位置无关

## 函数调用

直接调用函数时函数内部中的this指向window

```javascript
let age = 18
let name = '张三'
let p = {
  age: 15,
  name: '李四',
  say:function(){
    console.log(this.age, this.name)
  }
}
let f1 = p.say;
f1() // 输出：18 张三
```

## 方法调用

通过对象里的方法调用函数，函数内部中的this指向调用该方法的对象

```javascript
let age = 18
let name = '张三'
let p = {
  age: 15,
  name: '李四',
  say:function(){
    console.log(this.age, this.name)
  }
}
p.say() // 输出：15 李四
```

## 构造函数调用

通过new关键字来调用函数即为构造函数调用方式，函数内部的this指向该构造函数的实例

**对象的属性查找规则**
1. 首先查看本身有没有length属性
2. 如果本身没有该属性，那么去它的原型对象中查找
3. 如果原型对象中没有，那么就去原型对象的原型对象中查找，最终一直找到根对象（Object.prototype）
4. 最终都没有找到的话，我们认为该对象并没有该属性，如果获取该属性的值：undefined

```javascript
let age = 18
let name = '张三'
let p = {
  age: 15,
  name: '李四',
  say:function(){
    console.log(this.age, this.name)
  }
}
let s1 = new p.say()
// 输出：undefined undefined
```

## 上下文方式调用

上下文方式调用有三种：call、apply、bind

- call方法的第一个参数决定了函数内部this的值
  - 如果是一个对象类型，那么函数内部的this指向该对象
  - 如果是undefined、null，那么函数内部的this指向window
  - 如果是数字，那么函数内部的this指向对应的Number构造函数的实例
  - 如果是字符串，那么函数内部的this指向对应的String构造函数的实例
  - 如果是布尔值，那么函数内部的this指向对应的Boolean构造函数的实例

  ```javascript
  function fn() {
    console.log(this)
  }
  fn.call([1,3,5])
  fn.call({ age: 20, height: 1000 })
  fn.call(1) // this --> new Number(1)
  fn.call("abc") // this --> new String("abc")
  fn.call(true) // this --> new Boolean(false)
  fn.call(null) // this --> window
  fn.call(undefined) // this --> window
  ```

- call和apply都可以改变函数内部的this的值但是传参的形式不同

  ```javascript
  function toString(a,b,c){
    console.log(a + " " + b + " " + c);
  }
  toString.call(null,1,3,5)    // 输出 1 3 5
  toString.apply(null,[1,3,5]) // 输出 1 3 5
  ```

- bind方法执行之后会产生一个新函数，这个新函数里面的逻辑和原来还是一样的，唯一的不同是this的指向被改变了、

  ```javascript
  function write() {
    console.log(this.poem)
  }
  let writePoem = write.bind({ poem: '唐诗' })
  writePoem()
  ```

- 手动实现bind

  - [js中自己实现bind函数的方式](https://blog.csdn.net/lovefengruoqing/article/details/80186401)  
  - [JavaScript 中 apply 、call 的详解](https://github.com/lin-xin/blog/issues/7)
  ```javascript
  // bind方法放在函数的原型中
  Function.prototype.bind = function () {
    var self = this,                    // 保存原函数即fn
    context = [].shift.call(arguments), // 保存需要绑定的this上下文
    args = [].slice.call(arguments);    // 剩余的参数转为数组
    return function () {                // 返回一个新函数
      console.log(context, args, [].slice.call(arguments))
      // 输出 {age:18} , [1, 2, 3] , [4, 5, 6]
      self.apply(context,[].concat.call(args, [].slice.call(arguments)));
    }
  }
  function fn(){
    console.log(arguments);
    // 输出的Arguments包含 1, 2, 3, 4, 5, 6
  }
  var _f1=fn.bind({age:18}, 1, 2, 3)
  _f1(4,5,6)
  ```