---
title: HTML5语义元素
date: 2019-09-12
tags:
 - Html5
categories:
 - 笔记
---

## 一、什么是语义元素

- 语义 = 意义
- 语义元素 = 元素的意义
- 一个语义元素能够清楚地描述其意义给浏览器和开发者

##  二、语义化优点：

- 为了在没有css时，也可以很好地呈现出内容结构，代码结构。
- 易于用户阅读，样式丢失的时候能让页面呈现清晰的结构。
- 有利于SEO，搜索引擎根据标签来确定上下文和各个关键字的权重。
- 方便其他设备解析，如盲人阅读器根据语义渲染网页
- 有利于开发和维护，语义化更具可读性，代码更好维护，与CSS3关系更和谐。

## 三、html5新的语义元素

``` html
<article>规定独立的自包含内容</article>
<aside>侧栏</aside>
<details>定义用户能够查看或隐藏的额外细节</details>
<figcaption>为图片添加可见的注释</figcaption>
<figure>组合图片和其注释</figure>
<footer>为文档和节规定页脚</footer>
<header>为文档和节规定页眉</header>
<main>规定文档的主内容</main>
<nav>定义导航链接集合</nav>
<section>定义文档中的节</section>
<summary>定义details元素的可见标题</summary>
<time>定义日期/时间</time>
```
## 四、其他语义元素
```html
<title>标题</title>
<mark>呈现黄色突出显示，定义重要的或强调的文本</mark>
<small>呈现小号字体效果，指定细则，输入免责声明、注解、署名、版权。</small>
<strong>呈现粗体效果，和em标签一样用于强调文本，强调的程度更强</strong>
<em>呈现斜体效果，将其中的文本表示为强调的内容</em>
<blockquote cite="url">定义块引用，块引用拥有它们自己的空间</blockquote>
<q cite="url">短的引述（跨浏览器问题，尽量避免使用）</q>
<abbr title="Professor">Prof(简称或缩写)</abbr>
<cite>表示所包含的文本对某个参考文献的引用，比如书籍或者杂志的标题</cite>
<dfn>定义术语元素，与定义必须紧挨着，可以在描述列表dl元素中使用</dfn>\
<address>呈现斜体效果，作者、相关人士或组织的联系信息（电子邮件地址、指向联系信息页的链接）</address>
<del>呈现为下划线，移除的内容</del>
<ins>呈现为删除线，添加的内容</ins>
<code>标记代码</code>
<meter>定义已知范围或分数值内的标量测量。(IE不支持meter)<meter>
<progress max="100" value="50">
  定义运行中的进度(进程)
  兼容ie: <span>76</span>% 
</progess>
<details>
  <summary>前端</summary>
  <p>html</p>
  <p>css</p>
  <p>js</p>
</details>
<input id="myCar" list="cars" />
<datalist id="cars">
  <!--选项列表，与input配合使用来定义input可能使用的值 -->
  <option value="BMW">
  <option value="Ford">
  <option value="Volvo">
</datalist>
```

## 五、语义元素的浏览器兼容

### 设置样式为块级元素
```css
 header, section, footer, aside, nav, article, figure
 { 
 	display: block; 
 } 
```
### 对ie浏览器的兼容
- 第一种解决方案
```html
<style type="text/css">
	nav {
		height: 200px;
		background-color: red;
		/* 将元素转化为块级元素 */
		display: block;
	}
</style>

<script type="text/javascript">
	//第一种解决方案
	document.createElement("nav");
</script>
```
- 第二种解决方案
引入js插件，本质上与第一种解决方案相同
- 第三种解决方案
对浏览器版本进行判断，在需要的时候引入js插件

```html
//谷歌静态资源库
<!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
//百度静态资源库
<!--[if lt IE 9]>
  <script src="http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
<![endif]-->
```

## 六、注意事项
1.尽可能少的使用无语义的标签div和span；

2.在语义不明显时，既可以使用div或者p时，尽量用p, 因为p在默认情况下有上下间距，对兼容特殊终端有利；

3.不要使用纯样式标签，如：b、font、u等，改用css设置。

4.需要强调的文本，可以包含在strong或者em标签中（浏览器预设样式，能用CSS指定就不用他们），strong默认样式是加粗（不要用b），em是斜体（不用i）；

5.使用表格时，标题要用caption，表头用thead，主体部分用tbody包围，尾部用tfoot包围。表头和一般单元格要区分开，表头用th，单元格用td；

6.表单域要用fieldset标签包起来，并用legend标签说明表单的用途；

7.每个input标签对应的说明文本都需要使用label标签，并且通过为input设置id属性，在lable标签中设置for=someld来让说明文本和相对应的input关联起来。
