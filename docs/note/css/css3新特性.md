---
title: CSS3新特性
date: 2019-09-08
sidebarDepth: 2
tags:
 - css3
categories:
 - 笔记
---

## 背景

CSS3更新了几个新的背景属性用来控制背景元素

- `background-origin`: 规定背景图片的定位区域，可选值如下
  - `padding-box`  背景图像相对内边距定位（默认值）
  - `border-box`   背景图像相对边框定位【以边框左上角为参照进行位置设置】
  - `content-box`  背景图像相对内容区域定位【以内容区域左上角为参照进行位置设置】
  - 默认值为`padding-box`

- `background-clip`: 规定背景的绘制区域，可选值如下
  - `border-box`	 背景被裁切到边框盒子位置 【将背景图片在整个容器中显示】
  - `padding-box`	 背景被裁切到内边距区域【将背景图片在内边距区域（包含内容区域）显示】
  - `content-box`	 背景被裁切到内容区域【将背景图片在内容区域显示】
  - 默认值为`border-box`

- `background-size`: 规定背景图片的尺寸，可选值如下
  - `length`       设置背景图片高度和宽度
  - `percentage`   将计算相对于背景定位区域的百分比
  - `cover`        会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小
  - `contain`      会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。


## 边框

- 边框圆角 `border-radius: 左上 右上 右下 左下`;
  - `border-top-left-radius` 左上
  - `border-top-right-radius` 右上
  - `border-bottom-right-radius` 右下
  - `border-bottom-left-radius` 左下
- 盒子阴影 `box-shadow: h-shadow v-shadow blur spread color inset`;
  - `h-shadow`: 必需的。代表阴影在水平方向的偏移量（正数向右，负数向左）
  - `v-shadow`: 必需的。代表阴影在垂直方向的偏移量（正数代表向下，负数代表向上）
  - `blur`: 可选。模糊距离（不能设置负数）
  - `spread`: 可选。阴影的大小
  - `color`: 可选。阴影的颜色
  - `inset`: 可选。从外层的阴影（开始时）改变阴影内侧阴影

- 边框图片 `border-image: source slice width outset repeat`;
  - `border-image-source`: 设置边框图片
  - `border-image-slice: number|%|fill`: 指定图像的边界向内偏移
  - `border-image-width: number|%|auto`: 边框图片宽度
  - `border-image-outset: length|number`: 指定在边框外部绘制 `border-image-area` 的量
    - length
    - number代表相应的border-width 的倍数
  - `border-image-repeat`: 设置边框图片的平铺方式
    - stretch默认值。拉伸图像来填充区域
    - repeat平铺图像来填充区域
    - round如果无法完整平铺所有图像，则对图像进行缩放以适应区域
    - space如果无法完整平铺所有图像，扩展空间会分布在图像周围

## 文本效果

- 文本阴影 `text-shadow: h-shadow v-shadow blur color;` 
  - `h-shadow`: 必需的。代表阴影在水平方向的偏移量（正数向右，负数向左）
  - `v-shadow`: 必需的。代表阴影在垂直方向的偏移量（正数代表向下，负数代表向上）
  - `blur`: 可选。模糊距离（不能设置负数）
  - `color`: 可选。阴影的颜色
- 文本溢出 `text-overflow: clip|ellipsis|string;`
  - `clip` 修剪文本
  - `ellipsis` 显示省略符号来代表被修剪的文本
  - `string` 使用给定的字符串来代表被修剪的文本
- 自动换行 `word-wrap: normal|break-word;`
  - `normal` 只在允许的断字点换行（浏览器保持默认处理）
  - `break-word` 在长单词或 URL 地址内部进行换行
- 断行规则 `word-break: normal|break-all|keep-all;`
  - `normal` 使用浏览器默认的换行规则
  - `break-all` 允许在单词内换行
  - `keep-all` 只能在半角空格或连字符处换行

## 渐变

### 线性渐变
`background: linear-gradient(direction, color-stop1, color-stop2, ...);`
1. 开始颜色和结束颜色
   - 取值可以为关键字、十六进制颜色值、RGBA颜色等
2. 渐变的方向 
   - `to + right | top | bottom | left`
   - 通过角度表示一个方向 0deg(从下向上) 90deg(从左到右)
3. 渐变的范围
   - 可以使用长度单位来控制渐变的开始位置与结束位置，在颜色后面用空格隔开加长度，长度单位可以是px也可以是%等
4. 重复的线性渐变
   - `repeating-linear-gradient()` 函数用于重复线性渐变
   - `repeating-linear-gradient(red, yellow 10%, green 20%);`
### 径向渐变
`background: radial-gradient(position , shape size, start-color, ..., last-color);`
1. 颜色  
   - 颜色可以为关键词、十六进制颜色值、RGBA颜色值等
2. 圆心位置 `postion`
   - `position` 可以为长度值或者关键字
   - 若提供两个参数则第一个参数表示横坐标，第二个参数表示纵坐标
   - 若只提供一个，第二个值默认为50%，即center
3. 圆形状 `shape`
   - `circle` 定义径向渐变为圆形
   - `ellipse` 定义径向渐变为椭圆形
4. 圆大小 `size`  
主要用于定于径向渐变的结束形状大小
   - `closest-side`: 指定径向渐变的半径长度为从圆心到离圆心最近的边
   - `closest-corner`: 指定径向渐变的半径长度为从圆心到离圆心最近的角
   - `farthest-side`: 指定径向渐变的半径长度为从圆心到离圆心最远的边
   - `farthest-corner`: 指定径向渐变的半径长度为从圆心到离圆心最远的角
5. 重复的径向渐变
   - `repeating-radial-gradient` 函数用于重复径向渐变

## 2D转换

- 位移
  - `transform: translate(100px, 100px);`
  - 位移是相对元素自身的位置发生位置改变
- 旋转
  - `transform: rotate(60deg);`
  - 取值为角度
- 缩放
  - `transform: scale(0.5, 1);`
  - 取值为倍数关系，缩小大于0小于1，放大设置大于1
- 倾斜
  - `transform: skew(30deg, 30deg);`
  - 第一个值代表沿着x轴方向倾斜
  - 第二个值代表沿着y轴方向倾斜
  - `skewX()` 表示只在X轴(水平方向)倾斜
  - `skewY()` 表示只在Y轴(垂直方向)倾斜
- `martix()`
  - matrix 包含旋转，缩放，移动（平移）和倾斜功能
  - martix 使用六个值的矩阵来定义2D转换
## 3D转换

- 位移
  - `transform: translateX()  translateY()   translateZ();`
- 旋转
  - `transform: rotateX(60deg)  rotateY(60deg)  rotateZ(60deg);`
- 缩放
  - `transform: scaleX(0.5)  scaleY(1)  scaleZ(1);`
- 更改转换元素的位置
  - 2D转换元素可以改变元素的X和Y轴
  - 3D转换元素，还可以更改元素的Z轴
  - `transform-origin: x-axis y-axis z-axis;`
    - `x-axis: left|center|right|length|%`
    - `y-axis: top|center|bottom|length|%`
    - `z-axis: length`
- 元素呈现
  - 指定嵌套元素怎样在三维空间中呈现
  - `transform-style: flat|preserve-3d;`
  - `flat`: 子元素将不保留其 3D 位置。
  - `preserve-3d`: 子元素将保留其 3D 位置。
- 透视效果
  - 规定 3D 元素的透视效果
  - `perspective: number|none;`
    - `number`: 元素距离视图的距离，以像素计。
    - `none`: 默认值。与 0 相同。不设置透视。
- 底部位置
  - 定义 3D 元素所基于的 X 轴和 Y 轴 （3D 元素的底部位置）。
  - `perspective-origin: x-axis y-axis;`
    - `x-axis: left|center|right|length|%`
    - `y-axis: top|center|bottom|length|%`
- 背部可见性
  - 定义当元素不面向屏幕时是否可见
  - `backface-visibility: visible|hidden;`
    - `visible`: 默认值。 背面是可见的。
    - `hidden`: 背面是不可见的。
- `matrix3d()`
  - matrix3d 使用16个值的矩阵来定义3D转换

## 过渡
CSS3 过渡是元素从一种样式逐渐改变为另一种的效果  
`transition: property duration timing-function delay;`
- 过渡属性
  - `transition-property: none|all|property;`
  - `transition-property` 属性指定CSS属性的过渡效果
- 过渡执行时间
  - `transition-duration: time;`
  - `transition-duration` 属性规定完成过渡效果需要花费的时间（以秒或毫秒计）
- 过渡类型
  - `transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);`
  - [几种过渡类型具体介绍](https://www.cnblogs.com/afighter/p/5731293.html)
- 过渡延迟时间
  - `transition-delay: time;`
  - `transition-delay` 属性指定何时将开始切换效果

## 动画

### 定义动画集
- 动画是使元素从一种样式逐渐变化为另一种样式的效果。  
- 动画可以改变任意多的样式任意多的次数。
- 动画使用用百分比来规定变化发生的时间，或用关键词 "from" 和 "to"，等同于 0% 和 100%
  ```css
  @keyframes  rotate {
  	/* 定义开始状态  0%*/
  	0% {
  		transform: translateX(0px);
  	}
		/* 定义结束状态 100%*/
		100% {
			transform: translateX(200px);
		}
	}
  ```
### 调用动画集
动画属性的简写属性  
`animation: name duration timing-function delay iteration-count direction fill-mode play-state;`

- 动画名称
  - `animation-name: keyframename|none`
  - `animation-name` 属性为 @keyframes 动画指定名称。
- 动画周期
  - `animation-duration: time`
  - `animation-duration` 定义动画完成一个周期需要多少秒或毫秒。
- 动画速度曲线
  - `animation-timing-function: linear|ease|ease-in|ease-out|cubic-bezier(n,n,n,n)`
  - `animation-timing-function` 指定动画速度曲线。
  - 速度曲线定义动画从一套 CSS 样式变为另一套所用的时间。
  - 速度曲线用于使变化更为平滑。
- 动画开始时间
  - `animation-delay: time`
  - `animation-delay` 属性定义动画什么时候开始。
  - `animation-delay` 值单位可以是秒（s）或毫秒（ms）。
  - 允许负值，-2s 使动画马上开始，但跳过 2 秒进入动画
- 动画播放次数
  - `animation-iteration-count: n | infinite`
  - `animation-iteration-count` 属性定义动画应该播放多少次。
- 动画循环方向
  - `animation-direction: normal|reverse|alternate|alternate-reverse|initial|inherit`
    - `normal` 默认值。动画按正常播放。
    - `reverse` 动画反向播放。
    - `alternate` 动画在奇数次正向播放，在偶数次反向播放。
    - `alternate-reverse` 动画在奇数次反向播放，在偶数次正向播放。
  - `animation-direction` 属性定义是否循环交替反向播放动画。
  - 如果动画被设置为只播放一次，该属性将不起作用。
- 动画的运行和暂停
  - `animation-play-state: paused|running;`
  - `animation--play-state` 属性指定动画是否正在运行或已暂停。
- 动画的结束状态
  - `animation-fill-mode` 属性规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式
  - `animation-fill-mode: none|forwards|backwards|both|initial|inherit;`
    - `none` 默认值。动画在动画执行之前和之后不会应用任何样式到目标元素。
    - `forwards` 在动画结束后（由 `animation-iteration-count` 决定），动画将使用元素的结束属性值。
    - `backwards` 动画将应用在 `animation-delay` 定义期间启动动画的第一次迭代的关键帧中定义的属性值。这些都是 from 关键帧中的值（当 animation-direction 为 "normal" 或 "alternate" 时）或 to 关键帧中的值（当 animation-direction 为 "reverse" 或 "alternate-reverse" 时）。
    - `both` 动画遵循 `forwards` 和 `backwards` 的规则。也就是说，动画会在两个方向上扩展动画属性。

## 多媒体查询

### 媒体查询的定义
- 使用 @media 查询，你可以针对不同的媒体类型定义不同的样式。
- 使用 @media 可以针对不同的屏幕尺寸设置不同的样式，用于设计响应式的页面
- 重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

### 媒体查询的使用
- 直接使用
  ```css
  @media mediatype and|not|only (media feature) {
      CSS-Code;
  }
  ```
- 针对不同的媒体使用不同的样式表
  ```html
  <link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">
  ```
- [css3媒体类型和媒体功能](https://www.w3cschool.cn/cssref/css3-pr-mediaquery.html)
- [css媒体类型](https://www.w3cschool.cn/css/css-mediatypes.html)

## Flex布局

### 定义
- `Flex` 是 `Flexible Box` 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
- 任何一个容器都可以指定为 Flex 布局。`display: flex`
- 行内元素也可以使用 Flex 布局。`display: inline-flex`
- 设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

### 基本概念
- 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。
- 它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。
- 容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。
  - 主轴的开始位置（与边框的交叉点）叫做 `main start`，结束位置叫做 `main end`
  - 单个项目占据的主轴空间叫做 `main size`
  - 交叉轴的开始位置叫做 `cross start`，结束位置叫做 `cross end`
  - 单个项目占据的交叉轴空间叫做 `cross size`

### 容器的属性

- `flex-direction`
  - `flex-direction` 属性决定主轴的方向（即项目的排列方向）。
  - `flex-direction: row | row-reverse | column | column-reverse`
    - row（默认值）：主轴为水平方向，起点在左端。
    - row-reverse：主轴为水平方向，起点在右端。
    - column：主轴为垂直方向，起点在上沿。
    - column-reverse：主轴为垂直方向，起点在下沿。
- `flex-wrap`
  - 默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行。
  - `flex-wrap: nowrap | wrap | wrap-reverse`
    - nowrap（默认）：不换行。
    - wrap：换行，第一行在上方。
    - wrap-reverse：换行，第一行在下方。
- `flex-flow`
  - `flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。
  - `flex-flow: <flex-direction> || <flex-wrap>`
- `justify-content`
  - `justify-content` 属性定义了项目在主轴上的对齐方式。
  - `justify-content: flex-start | flex-end | center | space-between | space-around`
    - flex-start（默认值）：左对齐
    - flex-end：右对齐
    - center： 居中
    - space-between：两端对齐，项目之间的间隔都相等。
    - space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
- `align-items`
  - `align-items` 属性定义项目在交叉轴上如何对齐。
  - `align-items: flex-start | flex-end | center | baseline | stretch`
    - flex-start：交叉轴的起点对齐。
    - flex-end：交叉轴的终点对齐。
    - center：交叉轴的中点对齐。
    - baseline: 项目的第一行文字的基线对齐。
    - stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
- `align-content`
  - `align-content` 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
  - `align-content: flex-start | flex-end | center | space-between | space-around | stretch`
    - flex-start：与交叉轴的起点对齐。
    - flex-end：与交叉轴的终点对齐。
    - center：与交叉轴的中点对齐。
    - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
    - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
    - stretch（默认值）：轴线占满整个交叉轴。

### 项目的属性

- `order`
  - `order` 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- `flex-grow`
  - `flex-grow` 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
  - 如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。
  - 如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
- `flex-shrink`
  - `flex-shrink` 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
  - 如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。
  - 如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。
  - 负值对该属性无效
- `flex-basis`
  - `flex-basis` 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
  - `flex-basis: number|%|auto;`
- `flex`
  - `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。
  - `flex-shrink` 和 `flex-basis`为可选属性。
  - 该属性有两个快捷值：`auto (1 1 auto)` 和 `none (0 0 auto)`。
- `align-self`
  - `align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。
  - 默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。
  - `align-self: auto | flex-start | flex-end | center | baseline | stretch;`

### 实例

[Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)