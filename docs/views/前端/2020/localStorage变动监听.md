---
title: localStorage变动监听
date: 2020-01-09
sidebar: auto
tags: 
 - js
 - Vue
categories:
 - 前端
---

## 单页面监听localStorage变动

- 方法1：重写localStorage.setItem()方法
  ```javascript
  const oldSetItem = window.localStorage.setItem
  window.localStorage.setItem = function(key, newValue) {
    if (key === '你要监听的key') {
      // do something
    }
    oldSetItem(key, newValue)
  }
  ```
  
- 方法2：封装原生localStorage的api,生成自己的自定义功能
  ```javascript
  var myStorage = {
    setItem(key, val, ...rest){
      // do something
      window.localStorage.setItem(key,val)
    }
    getItem(key,..rest){
      // do something
      return window.localStorage. getItem(key)
    }
    // ...其他方法
  }
  export default myStorage
  ```
- 方法3：监听localStorage时间
  ```javascript
  // 重写setItem方法
  const oldSetItem = window.localStorage.setItem
  window.localStorage.setItem = function(key, newValue) {
    var setItemEvent = new Event("setItemEvent")
    setItemEvent.key = key
    setItemEvent.newValue = newValue
    window.dispatchEvent(setItemEvent)
    oldSetItem.apply(this, arguments)
  }
  // 添加监听事件
  window.addEventListener("setItemEvent", function(e) {
    // do something
  })
  ```

## 不同页面监听localStorage变动

```javascript
window.addEventListener("storage", function (e) {
  if (e.key === '你要监听的key') {
    // do something
    console.log(e.newValue)
  }
})
```

## 参考链接

- [localStorage单页面及不同页面监听变动](https://blog.csdn.net/qq_42076140/article/details/80307326)
- [vue 怎么监听localStorage值得变化](https://segmentfault.com/q/1010000015906159)
- [vuex持久化插件](https://github.com/robinvdvleuten/vuex-persistedstate)