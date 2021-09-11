---
title: Vuepress-theme-reco 新手指北之 Hello烤鸭
date: 2021-08-21
sidebar: auto
tags: 
 - vuepress
 - vuepress-theme-reco
categories:
 - 前端
sticky: 2
---

::: tip
[一键烤鸭-Github](https://github.com/smallsunnyfox/vuepress-theme-reco-starter)  
效果预览
![](https://photo.smallsunnyfox.com/images/blog/views/vuepress-theme-reco-starter-review.png)
:::

## 安装vuepress

[Vuepress中文网-指南-快速上手](https://www.vuepress.cn/guide/getting-started.html)

### 初始化

```
mkdir vuepress-theme-reco-starter

cd vuepress-theme-reco-starter

npm init # yarn init

npm install -D vuepress # yarn add -D vuepress

```
### 在package.json中添加script
```
"scripts": {
  "docs:dev": "vuepress dev docs",
  "docs:build": "vuepress build docs"
}
```

## 安装vuepress-theme-reco

[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/views/1.x/installUse.html)
```
npm install vuepress-theme-reco --save-dev

# or

yarn add vuepress-theme-reco
```

## 安装vuepress-plugin-permalink-pinyin 

[一个将中文标题转换为音译permalink的VuePress插件](https://github.com/viko16/vuepress-plugin-permalink-pinyin)
```
npm i vuepress-plugin-permalink-pinyin --save-dev

# or

yarn add vuepress-plugin-permalink-pinyin --dev
```

## 创建文件目录结构(入门版)

[Vuepress中文网-指南-目录结构](https://www.vuepress.cn/guide/directory-structure.html#%E9%BB%98%E8%AE%A4%E7%9A%84%E9%A1%B5%E9%9D%A2%E8%B7%AF%E7%94%B1)  
```
.
├── docs
│   ├── .vuepress
│   │   ├── public
│   │   │   │── avatar.png(头像)
│   │   │   └── bg.png(首页背景图)
│   │   └── config.js(博客配置)
│   ├── views
│   │   └── 美食\2021\烤鸭.md(测试文章)
│   └── README.md(首页配置)
└── package.json
```

## 配置主题

此处仅包含一些常用的基础配置  
详细配置和进阶功能请参考[主题文档](https://vuepress-theme-reco.recoluan.com/views/1.x/)

### docs/.vuepress/config.js
```
module.exports = {
  theme: 'reco',
  title: "hello reco",
  description: 'welcome to my blog builded with vuepress-theme-reco',
  // 移动端优化
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  // 主题设置
  themeConfig: {
    type: 'blog',
    author: 'new recoer',
    // 显示在个人信息的头像
    authorAvatar: '/avatar.png',
    // 导航栏左侧logo
    logo: '/avatar.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航及其深度
    subSidebar: 'auto',
    sidebarDepth: 1,
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 项目开始时间
    startYear: '2021',
    // 导航栏配置
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      { text: 'GitHub', link: 'https://github.com/smallsunnyfox/vuepress-theme-reco-starter', icon: 'reco-github' }
    ],
    // 博客配置
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: 'Tag'      // 默认文案 “标签”
      }
    },
    // 友情链接
    friendLink: [
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        logo: 'https://photo.smallsunnyfox.com/images/blog/friendlink/reco.png',
        link: 'https://www.recoluan.com'
      },
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        logo: "https://photo.smallsunnyfox.com/images/blog/friendlink/theme_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      }
    ]
  },
  // 插件配置
  plugins: [
    [
      'permalink-pinyin',
      {
        lowercase: true,
        separator: '-'
      }
    ]
  ]
}
```
### docs/README.md

```
---
home: true
bgImage: '/bg.png'
bgImageStyle: {
  height: '480px',
  color: 'white'
}
---
```
## 文章测试

[分类和标签](https://vuepress-theme-reco.recoluan.com/views/1.x/blog.html)  
[完整的FrontMatter](https://vuepress-theme-reco.recoluan.com/views/1.x/frontMatter.html)

### docs/views/美食/2021/烤鸭.md

```
---
title: 烤鸭的做法
date: 2021-08-08 08:00:00
sidebar: auto
tags:
 - 烤鸭
 - 美食
categories:
 - 美食
---

Hello 烤鸭

```

## 端盘上菜

```
npm run docs:dev

&&

npm run docs:build
```