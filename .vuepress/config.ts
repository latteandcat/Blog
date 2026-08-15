import { defineUserConfig } from "vuepress";
import { pwaPlugin } from "@vuepress/plugin-pwa";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
  lang: "zh-CN",
  title: "Latte and cat MindGarden",
  description: "Life is like a cup of latte, and cat will make it unlonely.",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  bundler: viteBundler(),
  shouldPrefetch: false,
  plugins: [
    pwaPlugin({
      update: "hint",
      showInstall: false,
      favicon: "/favicon.ico",
      themeColor: "#5b8fc9",
      locales: {
        "/": {
          hint: "发现新内容可用",
          update: "新内容已准备就绪",
        },
      },
    }),
  ],
  theme: recoTheme({
    logo: "/logo.png",
    author: "Latte and cat",
    authorAvatar: "/head.png",
    lastUpdatedText: "最近更新",
    // series 为原 sidebar
    series: {
      "/docs/frontend2019/": [
        {
          text: "HTML5",
          children: ["html5-semantic", "html5-media", "html5-form", "html5-api"],
        },
        {
          text: "CSS3",
          children: ["css3-newfeature", "css3-flip"],
        },
        {
          text: "JS",
          children: ["js-datatype", "js-object", "js-function", "js-prototype-chains-closures", "localStorage"]
        },
        {
          text: "Vue",
          children: ["vue-basic-notes", "vue-component"]
        },
        {
          text: "其他",
          children: ["canvas", "wechat-program-intro", "fe-unit-test-intro"]
        }
      ],
    },
    navbar: [
      { text: "首页", link: "/" },
      { text: "分类", link: "/categories/DRL/1" },
      { text: "标签", link: "/tags/ROS/1" },
      {
        text: "笔记",
        children: [
          { text: "前端学习笔记2019", link: "/docs/frontend2019/html5-semantic" }
        ]
      },
      { text: '时间轴', link: '/timeline' }
    ],
    socialLinks: [
      { icon: 'IconWiki', link: 'https://latteandcat.cn' },
      { icon: 'IconGithub', link: 'https://github.com/latteandcat' }
    ]
  })
});
