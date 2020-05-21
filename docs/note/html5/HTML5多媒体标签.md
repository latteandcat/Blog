---
title: HTML5多媒体标签
date: 2019-09-13
tags:
 - Html5
categories:
 - 笔记
---

## audio标签

### 属性
- src : 音频的地址
- controls : 显示控制栏
- autoplay : 自动播放
- loop : 设置循环播放
- preload : (auto/metadata/none) 规定当网页加载时，音频是否默认被加载以及如何被加载。

### 兼容

**source:** 指定多个音频,如果找到了当前浏览器支持的,那么会直接使用,如果所有的source标签格式都不支持,会显示最后的文本内容  

`<audio>` 元素支持三种音频格式文件: MP3, Wav, 和 Ogg

```html
<audio>
  <source src="trailer.mp3" type="audio/mpeg">
  <source src="trailer.ogg" type="audio/ogg">
  <source src="trailer.wav" type="audio/wav">
  你的浏览器不支持audio标签
</audio>
```
### 浏览器支持

![](http://photo.smallsunnyfox.com/images/blog/H5/audio_explorer.png)


## video标签

### 属性
- controls : 显示控制栏
- autoplay : 自动播放
- loop : 设置循环播放
- width : 宽度
- height : 高度
- poster : 指定视频不播放时显示的封面
- preload : (auto/metadata/none) 在页面加载时预加载视频如果使用autoplay请忽略该属性
- muted : 静音视频


### 兼容

**source:** 指定多个视频,如果找到了当前浏览器支持的,那么会直接使用,如果所有的source标签格式都不支持,会显示最后的文本内容

`<video>` 元素支持三种视频格式文件: MP4, WebM, 和 Ogg

```html
<video>
  <source src="trailer.mp4" type="video/mp4">
  <source src="trailer.ogg" type="video/ogg">
  <source src="trailer.WebM" type="video/WebM">
  你的浏览器不支持video标签
</video>
```

### 浏览器支持

![](http://photo.smallsunnyfox.com/images/blog/H5/video_explorer.png)