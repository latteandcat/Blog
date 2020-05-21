---
title: HTML5表单元素
date: 2019-09-11
sidebarDepth: 2
tags:
 - Html5
categories:
 - 笔记
---
## 新的表单元素

### 新的Input类型

<br>
<form>
    <fieldset>
        <legend>新的表单控件</legend> <br>
        邮箱 type="email" <input placeholder="输入合法的邮箱地址" type="email" /> <br><br>
        url type="url" <input placeholder="输入合法的网址" type="url" /> <br><br>
        search type="search" <input placeholder="输入搜索内容" type="search" /> <br><br>
        数字 type="number" <input placeholder="只能输入数字" type="number" /> <br><br>
        电话 type="tel" <input placeholder="输入合法的电话" type="tel" /> <br><br>
        滑块 type="range" <input type="range" /> <br><br>
        颜色 type="color" <input placeholder="" type="color" /> <br><br>
        日期 type="date" <input placeholder="" type="date" /> <br><br>
        选择一个日期（UTC 时间） type="datetime" <input placeholder="" type="datetime" /> <br><br>
        选择一个日期和时间 (无时区) type="datetime-local" <input placeholder="" type="datetime-local" /> <br><br>
        月份 type="month" <input placeholder="" type="month" /> <br><br>
        周 type="week" <input placeholder="" type="week" /> <br><br>
        时间 type="time" <input placeholder="" type="time" /> <br><br>
    </fieldset>
</form>

### 修改表单控件中的默认提示信息

<br>
<form action="#" method="get">
		<input type="text" name="uname" pattern="^\d{4,11}" required class="uname">
		<input type="submit" name=""><br><br>
    正确格式为4到11位数字，请输入错误格式以测试
</form>
<script>
  var input = document.querySelector(".uname");
  input.oninvalid=function(){   	
    if(this.validity.patternMismatch===true){
      this.setCustomValidity("请输入4到11位数字");
    }else{
      this.setCustomValidity("");
    }
  }
</script>

1. 表单验证触发`oninvalid`事件
2. 通过`setCustomValidity`方法设置修改内容
```html
<form action="#" method="get">
		<input type="text" name="uname" pattern="^\d{4,11}" required class="uname">
		<input type="submit" name="">
</form>
<script>
  var input = document.querySelector(".uname");
  input.oninvalid=function(){   	
    if(this.validity.patternMismatch===true){
      this.setCustomValidity("请输入4到11位数字");
    }else{
      this.setCustomValidity("");
    }
  }
</script>
```

### datalist元素
input 元素使用 datalist 预定义值

<input list="browsers">
<datalist id="browsers">
  <option value="Internet Explorer"></option>
  <option value="Firefox"></option>
  <option value="Chrome"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
</datalist>

```html
<input list="browsers">
<datalist id="browsers">
  <option value="Internet Explorer"></option>
  <option value="Firefox"></option>
  <option value="Chrome"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
</datalist>
```
### output元素

<br>
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0
<input type="range" id="a" value="50">100 +
<input type="number" id="b" value="50">=
<output name="x" for="a b"></output>
</form>

```html
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0
    <input type="range" id="a" value="50">100 +
    <input type="number" id="b" value="50">=
    <output name="x" for="a b"></output>
</form>
```
### keygen元素

`<keygen>`元素的作用是提供一种验证用户的可靠方法。

`<keygen>`标签规定用于表单的密钥对生成器字段。

当提交表单时，会生成两个键，一个是私钥，一个公钥。

私钥（private key）存储于客户端，公钥（public key）则被发送到服务器。公钥可用于之后验证用户的客户端证书（client certificate）。

## 表单新属性

### form
- autocomplete = on | off          自动完成
- novalidate = true | false        是否关闭校验
 
### input
- autofocus : 自动获取焦点
- required : 规定必须在提交之前填写输入域（不能为空）
- placeholder
  - 占位符
  - 适用于以下类型的input标签: text, search, url, telephone, email 以及 password。
- multiple
  - 规定是否可选择多个值
  - 适用于以下类型的input标签: email 和 file。
- autocomplete : 
  - 规定输入字段是否应该启用自动完成功能
  - 适用于以下类型的input标签: text, search, url, telephone, email, password, datepickers, range 以及 color。
- form : 规定输入域所属的一个或多个(用空格分隔)表单
- formaction : 
  - 用于描述表单提交的URL地址
  - 与 `type="submit"` 和 `type="image"` 配合使用
  - 会覆盖`<form>`元素中的 `action` 属性
- formenctype : 
  - 属性描述了表单提交到服务器的数据编码
  - 与 `type="submit"` 和 `type="image"` 配合使用
  - 会覆盖 `form` 元素的 `enctype` 属性
- formmethod : 
  - 定义了表单提交的方式
  - 覆盖了 `<form>` 元素的的 `method` 属性
  - 与 `type="submit"` 和 `type="image"` 配合使用
- formnovalidate : 
  - 描述了 `<input>` 元素在表单提交时无需被验证
  - 会覆盖 `<form>` 元素的`novalidate`属性
  - 与`type="submit"`一起使用  
- formtarget : 
  - 指定一个名称或一个关键字来指明表单提交数据接收后的展示
  - 覆盖 `<form>` 元素的 `target` 属性
  - 与 `type="submit"` 和 `type="image"` 配合使用
- pattern (regexp)
  - 描述了一个正则表达式用于验证 `<input>` 元素的值
  - 适用于以下类型的input标签: text, search, url, tel, email, 以及 password
- list
  - 规定输入域的 datalist
  - 值为 datalist 的 id
- height and width
  - 规定用于 `image` 类型的 `<input>` 标签的图像高度和宽度。
  - 与 `type="image"` 配合使用
- min 、max
  - 适用于以下类型的input标签: datepickers、number 以及 range。
- step
  - 为输入域规定合法的数字间隔
  - 适用于以下类型的input标签: number, range, date, datetime, datetime-local, month, time 以及 week。
