---
title: chai.js笔记
date: 2019-07-01
sidebarDepth: 2
tags:
 - 单元测试
categories:
 - 笔记
---
## BDD

### 介绍

expect和should是BDD风格的，二者使用相同的链式语言来组织断言

但不同在于他们初始化断言的方式：

- expect使用构造函数来创建断言对象实例
- should通过为Object.prototype新增方法来实现断言（所以should不支持IE）
- expect直接指向chai.expect
- should则是chai.should()。

### 语言链

下面的接口是单纯作为语言链提供以期提高断言的可读性。除非被插件改写否则它们一般不提供测试功能

- to

- be

- been

- is

- that

- which

- and

- has

- have

- with

- at

- of

- same

### 断言

- .not：对之后的断言取反
- .deep

  - 设置deep标记，然后使用equal和property断言。
  - 该标记可以让其后的断言不是比较对象本身，而是递归比较对象的键值对
- .any：在`keys`断言之前使用`any`标记（与`all`相反）
- .all：在`keys`断言之前使用`all`标记（与`any`相反）
- .a(type) / .an(type)

  - type为被测试的值的类型
  - `a`和`an`断言即可作为语言链又可作为断言使用
- .include(value)  /  .contains(value)

  - value: Object | String | Number
  - `include()`和`contains()`即可作为属性类断言前缀语言链又可作为作为判断数组、字符串是否包含某值的断言使用。当作为语言链使用时，常用于`key()`断言之前
- .ok：断言其目标为`真值`
- .true： 断言目标为`true`，注意，这里与`ok`的区别是不进行类型转换，只能为`true`才能通过断言
- .false：断言目标为`false`
- .null：断言目标为`null`
- .undefined：断言目标为`undefined`
- .NaN：断言目标为非数字`NaN`
- .exist：断言目标存在，即非`null`也非`undefined`
- .empty
  - 断言目标的长度为`0`。
  - 对于数组和字符串，它检查`length`属性
  - 对于对象，它检查可枚举属性的数量

- .arguments：断言目标是一个参数对象`arguments`
- .equal(value)
  - value：Mixed
  - 断言目标严格等于(`===`)`value`。
  - 如果设置了`deep`标记，则断言目标深度等于`value`

- .eql(value)
  - value：Mixed
  - 断言目标深度等于`value`，相当于`deep.equal(value)`的简写

- .above(value)
  - value：Number
  - 断言目标大于（超过）`value`
  - 也可接在`length`后来断言一个最小的长度。相比直接提供长度的好处是提供了更详细的错误消息

- .least(value)
  - value：Number
  - 断言目标不小于（大于或等于）`value`
  - 也可接在`length`后来断言一个最小的长度。相比直接提供长度的好处是提供了更详细的错误消息

- .below(value)
  - value：Number
  - 断言目标小于`value`
  - 也可接在length后来断言一个最大的长度。相比直接提供长度的好处是提供了更详细的错误消息

- .most(value)
  - value：String
  - 断言目标不大于（小于或等于）`value`
  - 也可接在length后来断言一个最大的长度。相比直接提供长度的好处是提供了更详细的错误消息

- .within(start, finish)
  - start：Number，下限
  - finish：Number，上限
  - 断言目标在某个区间内
  - 也可接在length后来断言一个长度区间。相比直接提供长度的好处是提供了更详细的错误消息

- .instanceof(constructor)
  - constructor: Constructor构造函数
  - 断言目标是构造函数的一个实例

- .property(name, [value])
  - name：String，属性名

  - value：Mixed，可选，属性值

  - 断言目标是否拥有某个名为`name`的属性，可选地如果提供了`value`则该属性值还需要严格等于（`===`）`value`。

  - 如果设置了`deep`标记，则可以使用点`.`和中括号`[]`来指向对象和数组中的深层属性

    ```js
    // 简单引用
    var obj = { foo: 'bar' }
    expect(obj).to.have.property('foo')
    expect(pbj).to.have.property('foo', 'bar')
    
    // 深层引用
    var deepObj = {
      green: { tea: 'matcha' },
      teas: [ 'Chai', 'matcha', { tea: 'konacha' } ]
    }
    
    expect(deepObj).to.have.deep.property('green.tea', 'matcha')
    expect(deepObj).to.have.deep.property('teas[1]', 'matcha')
    expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha')
    ```

  - 如果目标是一个数组，还可以直接使用一个或多个数组下标作为`name`来在嵌套数组中断言`deep.property`

    ```js
    var arr = [
      [ 'chai', 'matcha', 'konacha' ],
      [ { tea: 'chai' },
        { tea: 'matcha' },
        { tea: 'konacha' }
      ]
    ]
    expect(arr).to.have.deep.property('[0][1]', 'matcha')
    expect(arr).to.have.deep.property('[1][2].tea', 'konacha')
    ```

  - `property`把断言的主语（subject）从原来的对象变为当前属性的值，使得可以在其后进一步衔接其它链式断言（来针对这个属性值进行测试）

    ```js
    expect(obj).to.have.property('foo')
      .that.is.a('string')
    expect(deepObj).to.have.property('green')
      .that.is.an('object')
      .that.deep.equals({ tea: 'matcha' })
    expect(deepObj).to.have.property('teas')
      .that.is.an('array')
      .with.deep.property('[2]')
        .that.deep.equals({ tea: 'konacha' })
    ```

  - 只有当设置了`deep`标记的时候，在`property()` `name`中的点（`.`）和中括号（`[]`）才必须使用双反斜杠`\`进行转义

    ```js
    // 简单指向
    var css = { '.link[target]': 42 }
    expect(css).to.have.property('.link[target]', 42)
    
    //深度指向
    var deepCss = { 'link': { '[target]': 42 } }
    expect(deepCss).to.have.deep.property('\\.link\\.[target]', 42)
    ```

- .ownProperty(name)
  - name：String，属性名
  - 断言目标拥有名为`name`的自有属性

- .ownPropertyDescription(name, [descriptor])
  - name：String，属性名
  - descriptor：Object，描述对象，可选
  - 断言目标的某个自有属性存在描述符对象，如果给定了`descroptor`描述符对象，则该属性的描述符对象必须与其相匹配

- .length：设置`.have.length`标记作为比较`length`属性值的前缀
- .lengthOf(value)
  - value：Number
  - 断言目标的`length`属性为期望的值

- .match(regexp)
  - regexp：RegExp，正则表达式
  - 断言目标匹配到一个正则表达式

- .string(string)
  - string：String，字符串
  - 断言目标字符串包含另一个字符串

- .keys(key1, [key2], [...])
  - key：String | Array | Object 属性名
  - 断言目标包含传入的属性名
  - 与`any`，`all`，`contains`或者`have`前缀结合使用会影响测试结果：
    - 当与`any`结合使用时，无论是使用`have`还是使用`contains`前缀，目标必须至少存在一个传入的属性名才能通过测试。注意，`any`或者`all`应当至少使用一个，否则默认为`all`
    - 当结合`all`和`contains`使用时，目标对象必须至少拥有全部传入的属性名，但是它也可以拥有其它属性名
    - 当结合`all`和`have`使用时，目标对象必须且仅能拥有全部传入的属性名

- .throw(constructor)
  - constructor：ErrorConstructor | String | RegExp
  - 断言目标函数会抛出一个指定错误或错误类型（使用`instanceOf`计算），也可使用正则表达式或者字符串来检测错误消息
  - 注意，当一个抛错断言被否定了（前面有`.not`），那么它会从Error构造函数开始依次检查各个可能传入的参数。检查一个只是消息类型不匹配但是已知的错误，合理的方式是先断言该错误存在，然后使用`.and`后断言错误消息不匹配

- .respondTo(method)
  - method：String
  - 断言目标类或对象会响应一个方法（存在这个方法）

- .itself
  - 设置`itself`标记，然后使用`respondTo`断言
  - 用于检查一个构造函数是否会响应一个静态方法（挂载在构造函数本身的方法）

- .satisfy(method)
  - method：Function，测试器，接受一个参数表示目标值，返回一个布尔值
  - 断言目标值能够让给定的测试器返回真值

- .closeTo(expected, delta)
  - expect：Numbre，期望值
  - delta：Numbre，范围半径
  - 断言目标数字等于`expected`，或在期望值的+/-`delta`范围内

- .members(set)
  - set：Array
  - 断言目标是`set`的超集，或前者有后者所有严格相等（`===`）的成员。另外，如果设置了`deep`标记，则成员进行深度比较（include/contains只能接受单个值，但它们的主语除了是数组，还可以判断字符串；members则将它们的能力扩展为能够接受一个数组，但主语只能是数组）

- .oneOf(list)
  - list：Array
  - 断言目标值出现在`list`数组的某个顶层位置（直接子元素，严格相等）

- .change(object, property)
  - object：Object，对象
  - property：String，属性名
  - 断言目标方法会改变指定对象的指定属性

- .increase(object, property)
  - object：Object，对象
  - property：String，属性名
  - 断言目标方法会增加指定对象的属性

- .decrease(object, property)
  - object：Object，对象
  - property：String，属性名
  - 断言目标方法会减少指定对象的属性

- .extensible：断言目标对象是可扩展的（可以添加新的属性）
- .sealed：断言目标对象是封闭的（无法添加新的属性并且存在的属性不能被删除但可以被修改）
- .frozen：断言目标对象是冻结的（无法添加新的属性并且存在的属性不能被删除和修改）

## [TDD](https://www.chaijs.com/api/assert/)