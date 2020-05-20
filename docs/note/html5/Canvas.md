---
title: Canvas
date: 2019-09-10
tags:
 - Canvas
 - Html5
categories:
 - 笔记
---

## 绘图工具

canvas画布  
- 默认大小为300*200  
- 可通过width属性和height属性设置画布大小   
- 解决画布重绘问题：描边后使用 `beginPath()` 开启新的图层
```html
<canvas width="600" height="400"></canvas>
```

## 绘图方法

线连接方式：   lineJoin: round | bevel | miter (默认)

线帽（线两端的结束方式）：  lineCap: butt(默认值) | round | square 

闭合路径： ctx.closePath()

开启新的图层： ctx.beginPath()  

```js
// 获取canvas画布对象
var canvas =document.querySelector("canvas");
// 获取绘图上下文
var ctx=canvas.getContext("2d");
// 落笔
ctx.moveTo(x,y)
// 连线
ctx.lineTo(x,y)
// 设置线的颜色为红色
ctx.strokeStyle="red";
// 设置线宽
ctx.lineWidth="20";
// 描边
ctx.stroke()
```

## 渐变方案

### 线性渐变

```js
// x0-->渐变开始的x坐标
// y0-->渐变开始的y坐标
// x1-->渐变结束的x坐标
// y1-->渐变结束的y坐标
var grd=ctx.createLinearGradient(x0,y0,x1,y1);  
      
// 设置渐变的开始颜色
grd.addColorStop(0,"black");      
// 设置渐变的中间颜色
grd.addColorStop(0.1,"yellow");   
// 设置渐变的结束颜色
grd.addColorStop(1,"red");        

ctx.strokeStyle=grd;
ctx.stroke();
      
```
备注：addColorStop(offse,color)中渐变的开始位置和结束位置介于0-1之间，0代表开始，1代表结束。中间可以设置任何小数。

### 径向渐变
```js
// (x0,y0)-->渐变的开始圆的 x,y 坐标
// r0-->开始圆的半径
// (x1,y1)-->渐变的结束圆的 x,y 坐标
// r1-->结束圆的半径

ctx.createradialGradient(x0,y0,r0,x1,y1,r1);

```

## 填充效果

```js
ctx.fillstyle="值";    设置填充颜色
ctx.fill();	          设置填充效果
```

## 非零环绕原则

1. 任意找一点，越简单越好
2. 以点为圆心，绘制一条射线，越简单越好（相交的边越少越好）
3. 以射线为半径顺时针旋转，相交的边同向记为+1，反方向记为-1，如果相加的区域等于0，则不填充。（同向和反向指的是旋转方向和绘制方向是否相同）
4. 非零区域填充  
例子：回字图案

## 绘制虚线

- 原理：设置虚线其实就是设置实线与空白部分直接的距离,利用数组描述其中的关系  
- 绘制
  - ctx.setLineDash(数组);  
  - ctx.stroke();
- 实线和空白不断根据数组的值循环
- 如果要将虚线改为实线，只要将数组改为空数组即可

## 绘制矩形

- 绘制一个描边矩形： `content.strokeRect(x,y,width,height)`
- 绘制一个填充矩形： `content.fillRect(x,y,width,height)`  
- 清除：		   `content.clearRect(x,y,width,height)`  
- 实现动画矩形
  - 先清屏
  - 绘制图形
  - 处理变量
```js
//开始位置
var x=0;
//处理的是一个增量
var step=5;
//改变方向变量
var i=1;
//创建一个定时器
setInterval(function(){
	//先清屏
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//开始绘制图形
	ctx.fillRect(x, 100, 100, 200);
	//开始处理变量
	x+=step*i;
	if ( x > canvas.width - 100) {
		i=-1;
	} else if(x<0) {
		i=1;
	}
},20);
```

## 绘制文本

- 绘制填充文本：`content.fillText(文本的内容,x,y)`
  
- 绘制镂空文本：`content.strokeText()`
  	   
- 设置文字大小：
  - `content.font="20px 微软雅黑"`
  - 备注： 该属性设置文字大小，必须按照cssfont属性的方式设置
  	   
- 文字水平对齐方式
  - `content.textalign="left | right | center"`
  - 文字在圆心点位置的对齐方式
  
- 文字垂直对齐方式
  - `content.textBaseline="top | middle | bottom | alphabetic(默认)"`
  
- 文字阴影效果
  - 设置文字阴影的颜色 `ctx.shadowColor="red"`  
  - 设置文字阴影的水平偏移量 `ctx.ShadowOffsetX=值` 
  - 设置文字阴影的垂直偏移量 `ctx.shadowOffsetY=值`
  - 设置文字阴影的模糊度 `ctx.shadowBlur=值`

## 绘制图片

- 将图片绘制到画布的指定位置
  - `content.drawImage(图片对象,x,y)`
- 将图片绘制到指定区域大小的位置
  - ` content.drawImage(图片对象,x,y,width,height);`
  - x,y指的是矩形区域的位置
  - width和height指的是矩形区域的大小
- 将图片的指定区域绘制到指定矩形区域内
  - `content.drawImage(图片对象,sx,sy,swidth,sheight,dx,dy,dwidth,dheight);`
  - sx,sy 指的是要从图片哪块区域开始绘制
  - swidth，sheight 是指截取图片区域的大小
  - dx,dy 是指矩形区域的位置
  - dwidth,dheight是指矩形区域的大小
- 解决图片绘制到某一个区域的按比例缩放绘制
  - 绘制宽：绘制高 == 原始宽：原始高

## 绘制圆弧

- `content.arc(x,y,radius,startradian,endradian,direct);`
  - (x,y) 为圆心的坐标
  - radius 为半径
  - startradian 为开始弧度
  - endradian 为结束弧度
  - direct 为方向（默认顺时针 false）true 代表逆时针
- 以圆心为中心向右为0角 顺时针为正，逆时针为负
- 角度 和 弧度的关系： 角度:弧度= 180:pi

## 坐标系变换

### 平移

坐标系原点的平移：`ctx.translate(x,y);`  

通过该方法可以将原点的位置进行重新设置。  

注意
- translate(x,y) 中不能设置一个值
- 与moveTo(x,y) 的区别
  - moveTo(x,y) 指的是将画笔的落笔点的位置改变，而坐标系中的原点位置并没有发生改变
  - translate(x,y) 是将坐标系中的原点位置发生改变

### 旋转

坐标系旋转：`ctx.rotate(弧度)`

### 伸缩

沿着x轴和y轴缩放：`ctx.scale(x,y)` 

x,y 为倍数  例如： 0.5  1