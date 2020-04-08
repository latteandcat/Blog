---
title: JS继承
sidebarDepth: 2
tags:
 - js
categories:
 - 笔记
date: 2019-11-12
publish: false
---

## JS中继承的概念

通过某种方式让一个对象访问到另一个对象中的属性和方法，我们把这种方法称之为继承  
并不是所谓的xxx extends yyy

## 使用继承的意义

有些对象会有方法(动作、行为)，而这些方法都是函数，如果把这些方法和函数都放在构造函数中声明就会导致内存的浪费

```js
  function Poet () {
    this.say=function(){
      console.log("你好")
    }
  }
  var p1 = new Poet();
  var p2 = new Poet();
  // false
  console.log(p1.say === p2.say);
```

## 继承的实现方式

### 原型链继承
```javascript
  Poet.prototype.say = function() {
    console.log('你好')
  }
```
缺点：添加一两个方法无所谓，但是如果方法很多会导致过多得代码冗余

### 原型链继承的改良版
```javascript
  Poet.prototype = {
    constructor: Poet,
    say: function() {
      console.log('你好')
    },
    write: function() {
      console.log('我写了一首诗')
    }
  }
```
**注意点**  
1、一般情况下，应该先改变原型，再创建对象
2、一般情况下，对于新原型，会添加一个constructor属性，从而不破坏原有的原型对象的结构

### 拷贝继承（混入继承：mixin）

#### 使用场景
有时候想使用某个对象中的属性，但是又不能直接修改它，于是就可以创建一个该对象的拷贝
```javascript
var p1 = { age: 2 }
var p2 = p1
p2.age = 18
// 1、修改了o2对象的age属性
// 2、由于o2对象跟o1对象是同一个对象
// 3、所以此时o1对象的age属性也被修改了

// 优化代码

var p3 = { age: 2 }
p3.age = 18
```

#### 拷贝继承的实现

对要拷贝的对象使用for...in循环来创建对象的拷贝，然后就可以对克隆的对象进行属性的修改

```javascript
  function extend (target, source) {
    for (let key in source) {
      target[key] = source[key]
    }
    return target
  }
  extend(target,source)
```
由于拷贝继承在实际开发中使用场景非常多，所以很多库都对此有了实现，例如Jquery中的$.extend

ES6中的 `对象扩展运算符: ...` 仿佛就是专门为了拷贝继承而生
```javascript
  let source={ name: "李白", age: 15 }
  //让target是一个新对象，同时拥有了name、age属性
  let target={ ...source }
  // 还可以修改source中的属性
  let target2={ ...source,age:18 }
```

#### 浅拷贝和深拷贝

- 浅拷贝只是拷贝一层属性，没有内部对象
- 深拷贝其实是利用了递归的原理，将对象的若干层属性拷贝出来

### 原型式继承

`Object.create(对象)`

- 创建一个纯洁的对象（什么属性都没有）  
  `Object.create(null)`
- 创建一个继承自某个父对象的子对象
  ```javascript
    let parent = {
      age: 18,
      gender: 'male'
    }
    let student = Object.create(parent)
  ```

### 借用构造函数实现继承

- 使用场景：适用于2种构造函数之间逻辑有相似的情况
  ```js
  function Animal(name, age, gender) {
    this.name = name
    this.age = age
    this.gender = gender
  }
  function Person(name, age, gender, say) {
    this.name = name
    this.age = age
    this.gender = gender
    this.say = function () {}
  }
  ```
- 原理：函数的call、apply调用方式
  ```js
  function Animal (name,age){
    this.name=name;
    this.age=age;
  }
  function Person(name,age,address){
    Animal.call(this,name);
    this.address=address;
  }
  ```
- 局限性：Animal（父类构造函数）的代码必须完全适用于Person（子类构造函数）

### 寄生继承、寄生组合继承
