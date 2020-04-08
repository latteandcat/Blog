---
title: JS对象
tags:
 - js
categories:
 - 笔记
date: 2019-11-12
---

## 创建对象

对象是键值对的集合：对象是由属性和方法构成的 (ps：也有说法为：对象里面皆属性，认为方法也是一个属性)

```javascript
var poet = {
  name: "海子",
  age: 18,
  sayHello: function () {
    console.log("你好");
  },
  writePoem: function (num) {
    console.log(name + "写了" + num + "首诗");
  }
}
```

## 对象属性操作

### 获取属性

- 通过 `.` 语法
  ```javascript
    poet.name // 获取到name属性的值
    poet.sayHello // 获取到一个方法
  ```
- 通过 `[]` 语法
  ```javascript
    poet['name'] // 等价于poet.name
    poet['sayHello'] // 等价于poet.sayHello
  ```
- 两种方法的差异
  - `·` 语法更方便但是有局限性
    - `·` 后面不能使用js中的关键字、保留字(class、this、function。。。)
    - `·` 后面不能使用数字
  - `[]` 使用更广泛
    - poet[变量名]
    - ['class']、['this']
    - [0]、[1]、[2]（obj[3]=obj["3"]）
    - ["[object Array]"] （jquery）
    - ["{abc}"]（给对象添加了{abc}属性）

### 设置属性

`poet["name"]="戴望舒"` 等价于：`poet.name="戴望舒"`
- 含义：如果poet对象中没有name属性，就添加一个name属性，值为"戴望舒"，如果poet对象中有name属性，就修改name属性的值为"戴望舒"
- 案例
```javascript
poet.isDied = false
poet["books"] = ["诗集", "自传"]
poet.selfDescription = function () {
  console.log('大家好，我是戴望舒')
}
```

### 删除属性

- `delete poet["age"]`
- `delete post.age`

## 通过构造函数创建对象

### 构造函数的概念

- 任何函数都可以当成构造函数
- 只要把一个函数通过new的方式来进行调用，我们就把这一次函数的调用方式称之为：构造函数的调用
- `new Object()` 等同于对象字面量 {}

```javascript
  function Painter(name, age) {
    this.name = name
    this.age = age
  }
  // p1就是根据Painter构造函数创建出来的对象
  var p1 = new Paniter("八大山人", 99)
```

### 构造函数的执行过程

`var p1 = new Paniter("八大山人", 99)`

1. 创建一个对象 `_p1`（我们把这个对象称之为Painter构造函数的实例）
2. 创建一个内部对象 `this` , 将this指向实例 `_p1`
3. 执行函数内部的代码，其中，操作this的部分就是操作了实例 `_p1`
4. 返回值
   1. 如果函数没有返回值，那么就会返回构造函数的实例 `_p1`
   2. 如果函数返回了一个基本数据类型的值，那么本次构造函数的返回值是该实例 `_p1`
   3. 如果函数返回了一个复杂数据类型的值，那么本次函数的返回值就是该值
    ```javascript
    function fn () {

    }
    function fn2 () {
      return "abc";
    }
    function fn3(){
      return [1,3,5]; 
      //数组是一个对象类型的值，
      //所以数组是一个复杂数据类型的值
      //-->本次构造函数的真正返回值就是该数组
      //-->不再是fn3构造函数的实例
    }

    //f1就是fn的实例
    var f1=new fn();
    //f2是fn2构造函数的实例
    var f2=new fn2();
    //f3值为[1,3,5], f3不是fn3的实例
    var f3=new fn3();
    ```