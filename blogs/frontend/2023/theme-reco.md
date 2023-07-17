---
title: Vuepress-theme-reco-v1.x 新手指北之Hello烤鸭
date: 2023-05-29
tags: 
 - Vuepress
 - Vuepress-theme-reco
categories:
 - 前端
sticky: 1
---

## 初始化项目

### 创建目录并初始化

```
mkdir blog

cd blog

npm init
```
### 添加script
```
"scripts": {
  "docs:dev": "vuepress dev docs",
  "docs:build": "vuepress build docs"
}
```

### 安装主题

[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/views/1.x/installUse.html)

```
npm install vuepress-theme-reco --save-dev
```

### 安装必备插件

[一个将中文标题转换为音译permalink的VuePress插件](https://github.com/viko16/vuepress-plugin-permalink-pinyin)

虽然可以通过该插件转换中文路径，但还是建议尽量使用英文命名目录和文件

```
npm i vuepress-plugin-permalink-pinyin --save-dev
```

## 搭建基础目录结构

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
│   │   └── 美食/2023/烤鸭.md(测试文章)
│   └── README.md(首页配置)
└── package.json
```

## 完善基础配置

此处仅包含一些常用的基础配置  
详细配置和进阶功能请参考[主题文档](https://vuepress-theme-reco.recoluan.com/views/1.x/)
### docs/.vuepress/config.js
```
module.exports = {
  theme: 'reco',
  title: '我的美食分享博客',
  description: '欢迎来到我的美食分享博客',
  // 移动端优化
  head: [['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]],
  // 主题设置
  themeConfig: {
    type: 'blog',
    author: 'myname',
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
    startYear: '2023',
    // 导航栏配置
    nav: [
      { text: '主页', link: '/', icon: 'reco-home' },
      { text: '时间线', link: '/timeline/', icon: 'reco-date' },
      { text: '仓库地址', link: 'https://github.com/smallsunnyfox/vuepress-theme-reco-starter', icon: 'reco-github' }
    ],
    // 博客配置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认文案 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认文案 “标签”
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
        logo: 'https://photo.smallsunnyfox.com/images/blog/friendlink/theme_reco.png',
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
## 起锅烧油

写文章时需要在FrontMatter中补充文章信息

[分类和标签](https://vuepress-theme-reco.recoluan.com/views/1.x/blog.html)  
[完整的FrontMatter](https://vuepress-theme-reco.recoluan.com/views/1.x/frontMatter.html)

### docs/views/美食/2023/烤鸭.md

```
---
title: 烤鸭的做法
date: 2023-05-29 22:00:00
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
npm run dev

&&

npm run build
```