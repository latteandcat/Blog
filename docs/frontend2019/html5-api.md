---
title: HTML5中的API
date: 2019-09-14
---

## 获取页面元素

- `document.querySelector("选择器");`
  - 选择器可以是css中的任意一种选择器
  - 通过该选择器只能选中第一个元素

- `document.querySelectorAll("选择器");`  
	- querySelectorAll会返回所有符合选择器规则的元素列表
	- querySelector返回的只是单独的一个元素

## 类名操作

- 给当前dom元素添加类样式：`Dom.classList.add("类名")`
- 给当前dom元素移除类样式：`Dom.classList.remove("类名")`
- 检测是否包含类样式：`classList.contains("类名")`
- 切换类样式（有就删除，没有就添加）：`classList.toggle("active")`

## 自定义属性

在标签中可以通过 `data-自定义属性名` 来自定义属性
- 获取自定义属性  
  Dom.dataset.属性名或者Dom.dataset[属性名]  
  Dom.dataset返回的是一个对象
- 设置自定义属性  
  Dom.dataset.自定义属性名=值  或者  Dom.dataset[自定义属性名]=值
- 标签中为data-test-name="123"时，获取时要用Dom.dataset.testName

## 文件读取

```html
上传头像(请上传png jpg gif ico格式的文件)
<input type="file" id="upLoadImg">
<img id="showLogo" style="width:150px;height:150px;" src="head.png"/>
<script>
  var file_btn = document.querySelector("#upLoadImg");
  var logo_wrap = document.querySelector("#showLogo");
  file_btn.onchange = function() {
    var file = this.files[0];
    //判断后缀名是否合法
    var filename = file.name.substring(file.name.lastIndexOf("."));
    var imgs = [".png", ".jpg", "gif", ".ico"];
    var flag = false;
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i] == filename) {
        flag=true;
        break;
      }
    }
    if (flag) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        logo_wrap.src = reader.result;
      }
    } else {
      alert("文件类型不正确，请重新选择");
    }
  }
</script>
```
- `FileReader`
  有三个方法用来读取文件方法，返回结果在result中
  - readAsBinaryString  --- 将文件读取为二进制编码
  - readAsText --- 将文件读取为文本
  - readAsDataURL --- 将文件读取为DataURL
- `FileReader`提供的事件模型
  - onabort 中断时触发
  - onerror 出错时触发
  - onload 文件读取成功完成时触发
  - onloadend 读取完成触发，无论成功或失败
  - onloadstart 读取开始时触发
  - onprogress 读取中
```js
// 获取到文件
var file = this.files[0];
// 创建读取器
var reader = new FileReader();
// 开始读取
reader.readAsText(file);
// 获取读取的结果
// 当文件读取完成后，才可以获取文件信息内容
reader.onload=function() {
  console.log(reader.result);
}	
```
## 获取网络状态

- 获取网络状态
  `window.navigator.onLine` 返回一个布尔值
- 网络状态事件
  - window.ononline
  - window.onoffline
```html
当前网络状态 : <span id="onlineStatus" style="color: #f3f;">--</span>  
<script>
  var state = window.navigator.onLine
  var osid = '#onlineStatus'
  if (state) {
    document.querySelector(osid).innerText = '在线呢！';
  } else {
    document.querySelector(osid).innerText = '掉线啦！';
  }
</script>
```

## 获取地理位置

- 获取当前地理位置 
  
  `window.navigator.geolocation.getCurrentPosition(success,error);`
  
  - 如果getCurrentPosition()运行成功，则向参数success中规定的函数返回一个coordinates对象
    ```js
    function success(position) {
      // position.coords.latitude --> 十进制的纬度
      // position.coords.longitude --> 十进制的经度
      // position.coords.accuracy --> 位置精度
      // position.coords.altitude --> 海拔，海平面以上以米计
      // position.coords.altitudeAccuracy --> 位置的海拔精度
      // position.coords.heading --> 方向，从正北开始以度计
      // position.coords.speed --> 速度，以米/每秒计
      // position.timestamp --> 响应的日期/时间
    }
    ```
  - 如果getCurrentPosition()运行失败，则向参数error中规定的函数返回错误信息
    ```js
    function error(error) {
      let msg = ''
      switch (error.code) {
        case error.PERMISSION_DENIED:
          msg = "用户拒绝对获取地理位置的请求。"
          break;
        case error.POSITION_UNAVAILABLE:
          msg = "位置信息是不可用的。"
          break;
        case error.TIMEOUT:
          msg = "请求用户地理位置超时。"
          break;
        case error.UNKNOWN_ERROR:
          msg = "未知错误。"
          break;
      }
      alert(msg)
    }
    ```
  
- 返回用户的当前位置，并继续返回用户移动时的更新位置

  `window.navigator.geolocation.watchPosition(success,error);`

- 使用 `clearWatch()` 可以停止 `watchPosition()` 方法


## 本地存储

### localStorage

- 永久生效
- 多窗口共享
- 容量大约为20M
```  
🎈window.localStorage.setItem(key,value) --> 设置存储内容

🎈window.localStorage.getItem(key) --> 获取内容

🎈window.localStorage.removeItem(key) --> 删除内容

🎈window.localStorage.clear() --> 清空内容

🎈window.localStorage.key(index) --> 获取指定索引位置数据项的键名
```

### sessionStorage

- 生命周期为关闭当前浏览器窗口
- 可以在同一个窗口下访问
- 数据大小为5M左右
```
🎈window.sessionStorage.setItem(key,value) --> 设置存储内容

🎈window.sessionStorage.getItem(key) --> 获取内容

🎈window.sessionStorage.removeItem(key) --> 删除内容

🎈window.sessionStorage.clear() --> 清空内容

🎈window.sessionStorage.key(index) --> 获取指定索引位置数据项的键名
```

## 拖放

- 设置元素为可拖放
  ```html
  <img draggable="true">
  ```
- 在拖放的过程中会触发以下事件
  - ondragstart - 用户开始拖动元素时触发
  - ondrag - 元素正在拖动时触发
  - ondragend - 用户完成元素拖动后触发
- 释放目标时触发的事件:
  - ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
  - ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
  - ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
  - ondrop - 在一个拖动过程中，释放鼠标键时触发此事件
- 在拖动元素时，每隔 350 毫秒会触发 ondragover 事件
- 实例
  1. 首先设置draggable="true"使元素可拖动
  ```html
  <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
    <img src="1.png" draggable="true" ondragstart="drag(event)" id="drag1" width="100" height="100">
  </div>
  <div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
  ```
  2. 开始拖动时设置被拖数据的数据类型和值
  ```javascript
  function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
  }
  ```
  3. 规定在何处放置被拖动的数据
  ```javascript
  function allowDrop(ev) {
    //默认地，无法将数据/元素放置到其他元素中。
    //如果需要设置允许放置，我们必须阻止对元素的默认处理方式。
    //调用 ondragover 事件的 event.preventDefault() 方法设置允许放置
    ev.preventDefault();
  }    
  ```
  4. 放置被拖数据
  ```javascript
  function drop(ev) {
    // 调用 preventDefault() 来避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）
    ev.preventDefault();
    // 通过 dataTransfer.getData("Text") 方法获得被拖的数据。该方法将返回在 setData() 方法中设置为相同类型的任何数据。
    var data = ev.dataTransfer.getData("Text");
    // 把被拖元素追加到放置元素（目标元素）中
    ev.target.appendChild(document.getElementById(data));
  }
  ```

## WebSocket

### 介绍

- `WebSocket` 是HTML5开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。
- 获取 `WebSocket` 连接后，可以通过 `send()` 方法来向服务器发送数据，并通过 `onmessage` 事件来接收服务器返回的数据。
- 创建方法 `var Socket = new WebSocket(url, [protocal] );`
  - `url`： 连接的 URL
  - `protocal`： 可接受的协议（可选参数）

### 属性

- `readyState` 只读属性，表示连接状态
  - 0：表示连接尚未建立。
  - 1：表示连接已建立，可以进行通信。
  - 2：表示连接正在进行关闭。
  - 3：表示连接已经关闭或者连接不能打开。
- `bufferedAmount` 只读属性，表示已被 `send()` 放入正在队列中等待传输，但是还没有发出的 `UTF-8` 文本字节数

### 事件

- `onopen` 连接建立时触发
- `onmessage` 客户端接收服务端数据时触发
- `onerror` 通信发生错误时触发
- `onclose` 连接关闭时触发

### 方法

- `send()` 使用连接发送数据
- `close()` 关闭连接
