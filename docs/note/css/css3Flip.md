---
title: CSS3实现翻转(Flip)效果
date: 2019-09-09
sidebarDepth: 2
tags:
 - css3
categories:
 - 笔记
---

## 实现原理

- 在最外层的容器元素上设置整个动画区域的 `perspective` 属性以实现3D效果
- 当外层容器元素遇到鼠标悬停事件时，内部存放卡片的容器旋转
- 卡片正面和背面的元素都要绝对定位，这样它们才能在相同位置相互遮挡。他们的背面可视性 `backface-visibility` 属性设置为隐藏，这样每个卡片的背面在翻转时都是看不见的
- 卡片正面的z-index值要比背面大
- 鼠标没放上去之前让背面旋转180度，以背面示人
- 备注
  - 当为元素定义 perspective 属性时，其子元素会获得透视效果，而不是元素本身。
  - perspective 属性只影响 3D 转换元素
  - 不要为了防止元素溢出设置overflow属性，这将导致3D效果无法实现。

## HTML布局

```html
<div class="container">
  <div class="flip">
    <div class="front">
    </div>
    <div class="back">
    </div>
  </div>
</div>
```

## CSS分析

### 元素布局
为了让卡片的正面和背面在相同位置重叠，给`.front`,`.back`相对定位 `.flip` 进行绝对定位

```css
.container, .front, .back {
  width: 300px;
  height: 300px;
}
.flip {
  position: relative;
}
.front, .back{
  position: absolute;
  top: 0px;
  left: 0px;
}
.front {
  z-index:2;
}
```

### 动画效果的实现

1. 设置3d效果和动画
```css
.container {
  perspective: 1000;
  transform-style: preserve-3d;
}
.flip {
  transition: 0.6s;
  transform-style: preserve-3d;
}
```
2. 设置背面隐藏
```css
.front, .back {
  backface-visibility: hidden;
}
```
3. 设置反转效果  
鼠标没放上去之前让背面旋转180度，以背面示人  
鼠标经过的时候 flip就翻转180度
```css
.back {
  transform:rotateY(-180deg);
}
.container:hover .flip {
  transform:rotateY(180deg);
}
```
4. 垂直翻转和水平翻转的区别  
垂直效果与水平翻转异曲同工  
但是如果你只是把rotateY换成rotateX  
那么你会发现图片是以顶部的那条线翻转的。  
因为默认的transform-origin值，是以元素的中心点为基本点翻转的。  
解决方法：  
   (1). 给.flip设置和.front,.back相同的宽高。  
   (2). 给.flip设置transform-origin:100% 150px/*高度的一半*/属性。

5. IE的适配  
需要针对IE对这段标准的卡片翻转代码进行特殊的修改，因为IE还没有实现现代浏览器中的transform功能。基本的做法就是对正面和背面两个卡片同时分别翻转。

## 参考链接

[如何用CSS3来实现卡片的翻转特效](https://www.cnblogs.com/cmy1996/p/9129307.html)

[CSS图片翻转动画技术详解](http://www.webhek.com/post/css-flip.html)