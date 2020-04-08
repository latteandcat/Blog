---
title: JS数据类型
sidebarDepth: 2
tags:
 - js
categories:
 - 笔记
date: 2019-10-14
---

::: tip 笔记概览
1、JS数据类型  
2、JS数据类型的判断  
3、JS数据类型的转换  
:::
<!-- more -->
## JS数据类型

- 基本数据类型：
  - Undefined
    - 声明但未对其进行初始化时值即为undefined
    - 引入是为了区分空对象指针与未经初始化的变量
    - 对未初始化和未声明的变量执行typeof操作符都会返回undefined，这个结果有逻辑上的合理性(无论对哪种变量都不可能执行真正的操作)
  - Null
    - 表示一个空对象指针
    - undefined值是派生自null的（null == undefined为true）
    - 只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存为null
  - Boolean
  - Number
    - 在进行算术计算时，所有以八进制和十六进制表示的数值最终都将被转换为十进制数值、
    - 由于浮点数值需要的内存空间是保存整数值的两倍，因此ECMAScript会不失时机地将浮点数值转换为整数值
    - 浮点数值的最高精度是17位小数，但在进行算术计算时其精确度远远不如整数。(0.1 + 0.2 = 0.30000000000000004)
    - NaN的特点是
      - 任何涉及NaN的操作都会返回NaN
      - NaN与任何值都不相等包括它本身
  - String 
- 引用数据类型：Function、Object（Array、Date、Function、Error、RegExp、Math、Number、String、Boolean、Globle）  
  Object的每个实例都具有下列方法和属性
   - constructor: 保存着用于创建当前对象的函数
   - hasOwnProperty(propertyName): 用于检查给定的属性在当前对象实例中是否存在
   - isPrototypeOf(object): 用于检查传入的对象是否是当前对象的原型
   - propertyIsEnumerable(propertyName): 用于检查给定的属性是否能够使用for-in语句来枚举
   - toLocaleString(): 返回对象的字符串表示，该字符串与执行环境对应
   - toString(): 返回对象的字符串表示
   - valueOf(): 返回对象的字符串、数值或布尔值表示
- ES6新增：Symbol（Symbol类型的对象永远不相等，即便创建它们的时候传入了相同的值，因此，可借助此特性解决属性名的冲突问题，这也是该数据类型存在的主要用途，意为标记）

## JS数据类型的判断

### 1.typeof 操作符

`typeof` 操作符可能返回的值
- "undefined" 如果这个值未定义
- "boolean" 如果这个值是布尔值
- "string" 如果这个值是字符串
- "number" 如果这个值是数值
- "object" 如果这个值是对象或null
- "function" 如果这个值是函数
- "symbol" 如果这个值是Symbol

### 2.instanceof 对象运算符

- `obj1 instanceof obj2` 可以判断obj1是否为obj2的实例
- obj2必须为对象，否则会报错
- 可以对不同的对象实例进行判断判断方法是根据对象的原型链依次向下查询，如果obj2的原型属性存在obj1的原型链上，（obj1 instanceof obj2）值为true
- instanceof检测不到基本数据类型但是可以检测到使用下面的方式创建的num、str、boolean
 ```javascript
var num = new Number(123);
var str = new String('abcdef');
var boolean = new Boolean(true);
// 以上三种方式等同于new Object()，Object构造函数会根据传入值的类型返回相应基本包装类型的实例 
```

### 3.constructor 查看对象对应的构造函数

使用constructor是不保险的，因为constructor属性是可以被修改的，会导致检测出的结果不正确
```javascript
var str = 'hello';
alert(str.constructor == String);//true

var bool = true;
alert(bool.constructor == Boolean);//true

var num = 123;
alert(num.constructor ==Number);//true

var nul = null;
alert(nul.constructor == Object);//报错

var und = undefined;
alert(und.constructor == Object);//报错

var oDate = new Date();
alert(oDate.constructor == Date);//true

var json = {};
alert(json.constructor == Object);//true

var arr = [];
alert(arr.constructor == Array);//true

var reg = /a/;
alert(reg.constructor == RegExp);//true

var fun = function(){};
alert(fun.constructor ==Function);//true

var error = new Error();
alert(error.constructor == Error);//true
```
### 4.Object.prototype.toString.call()

可以说不管是什么类型，它都可以立即判断出。  
`toString`是`Object`原型对象上的一个方法，该方法默认返回其调用者的具体类型，更严格的讲，是`toString`运行时this指向的对象类型，返回的类型格式为`[object xxx]`，xxx是具体的数据类型  
其中包括：  
`String,Number,Boolean,Undefined,Null,Function,Date,Array,RegExp,Error,HTMLDocument,... `  
基本上所有对象的类型都可以通过这个方法获取到。

### 5. 四种判断方法的比较

  | 不同类型的优缺点 | typeof                     | instanceof                         | constructor                                 | Object.prototype.toString.call   |
  | :--------------: | -------------------------- | ---------------------------------- | ------------------------------------------- | -------------------------------- |
  |       优点       | 使用简单                   | 能检测出引用类型                   | 基本能检测所有的类型（除了null和undefined） | 检测出所有的类型                 |
  |       缺点       | 只能检测出基本类型(除null) | 不能检测出基本类型，且不能跨iframe | constructor易被修改，也不能跨iframe         | IE6下，undefined和null均为Object |

### 6. 一些Tips

- `null == undefined`是true，其实值undefined是null派生来的，因此ecmaScript把他们定义为相等的
- 判断一个对象`{}`是否为空对象的方法
  - 用 `for in` 遍历属性
    ```javascript
    function isEmptyObject(e) {  
      var t;  
      for (t in e)  
        return !1;  
      return !0  
    }
    ```
  - 通过JSON自带的`.stringify()` 
    ```javascript
    if(JSON.stringify(c)=='{}'){
      console.log('空对象');
    }
    ```
  - ES6新增的方法`Object.keys()` 
    ```javascript
    if (Object.keys(obj).length==0) {
      console.log('空对象');
    } else {
      console.log('非空对象');
    }
    ```

## JS数据类型的转换

### Boolean 
  - `Boolean()`
    |       转换类型       |        转换为true的值        | 转换为false的值 |
    | :------------------: | :--------------------------: | :-------------: |
    |  String => Boolean   |          非空字符串          |    空字符串     |
    |  Number => Boolean   | 任何非零数字值（包括无穷大） |     0和NaN      |
    |  Object => Boolean   |           任何对象           |      null       |
    | Undefined => Boolean |        not applicable        |    undefined    |

### Number
  - `Number()`  
    转换规则
    - `Boolead => Number` true和false将分别被转换为1和0
    - `null  => Number` 返回0
    - `undefined  => Number` 返回NaN
    - `String => Number`
      - 只包含数字则将其转换为十进制数值
      - 包含有效的浮点格式则将其转换为对应的浮点数值
      - 包含有效的十六进制格式，则将其转换为相同大小的十进制数值
      - 空字符串转换为0
      - 包含上述格式之外的字符转换为NaN
    - `Object  => Number`
      - 是对象则调用对象的valueOf() 方法，然后依照前面的规则转换返回的值，如果转换的结果是NaN，则调用对象的toString() 方法，然后再依照前面的规则转换返回的字符串值

  - `parseInt()`

    `Number()`在转换字符串时比较复杂而且不够合理，在处理整数的时候更常用`parseInt()`

    转换规则：从第一个非空格字符开始，如果第一个非空格字符不是数字字符或者负号，就会返回NaN，如果第一个非空格字符是数字字符，就会继续解析直到解析完所有字符或者遇到了一个非数字字符。

    小数点不算做有效字符

    第二个参数可以设置转换时使用的基数(即多少进制)

  - `parseFloat()`  
    转换规则与`parseInt()`相似，但是字符串中的第一个小数点是有效的，而第二个小数点都是无效的
  
    `parseInt()` 和 `parseFloat()`的区别  
      - `parseFloat`的第一个小数点是有效的
      - `parseFloat`始终都会忽略前导的0
      - `parseFloat`只解析十进制值，因此他没有用第二个参数指定基数的用法，所以十六进制的字符串始终会被转换成0
      - 如果字符串包含的是一个可解析为整数的值，`parseFloat`会返回整数

### String 
  - `toString()`
    - 数值、布尔值、对象和字符串值都有`toString()`方法但null和undefinded值没有这个方法
    - 在调用数值的该方法时`toString()`也可以传递参数，参数为输出数值的基数

  - `String()`  
    在不知道要转换的值是不是null或undefined的情况下，还可以使用转型函数`String()`，这个函数能够将任何类型的值转换为字符串，转换规则如下：
    - 如果值有`toString()`方法，则调用该方法并返回相应的结果
    - 如果值为null则返回"null"
    - 如果值是undefined，则返回"undefined"

### Object
  - `toLocalString()`：返回对象的字符串表示，该字符串与执行环境的地区对应
  - `toString()`：返回对象的字符串表示
  - `valueOf()`：返回对象的字符串、数值或布尔值表示

### 隐式类型转换

  转换隐式类型转换指的是字符串和数值类型之间的转换

  - 在进行字符串和数字之间进行减乘除取模运算或者进行比较运算时，字符串会自动转换为数字。转换数字的默认方法是调用`Number()`
  - 进行加法运算则是将数字看成字符串进行拼接 