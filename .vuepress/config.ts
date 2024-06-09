import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import type { DefaultThemeOptions } from "vuepress";


export default defineUserConfig({
  title: "latte and cat",
  description: "Life is like a cup of latte, and cat will make it unlonely.",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "zsw",
    authorAvatar: "/head.png",
    lastUpdatedText: "最近更新",
    navbar: [
      { text: "首页", link: "/", icon: "Home" },
      { text: "分类", link: "/categories/qianduan/1", icon: "Category" },
      { text: "标签", link: "/tags/qianduan/1", icon: "Tag" },
      { text: '时间轴', link: '/timeline', icon: 'Time' },
      { text: '留言板', link: '/docs/message-board', icon: 'Chat' }
    ],
    commentConfig: {
      type: 'giscus',
      options: {
        repo: 'latteandcat/Blog',
        repoId: 'MDEwOlJlcG9zaXRvcnkyNTQwNzUxMTk=',
        category: 'Announcements',
        categoryId: 'DIC_kwDODyTg784CXXQ8',
        mapping: 'title',
        strict: '1',
        lang: 'zh-CN',
        crossorigin: 'anonymous'
      }
    }
  })
});
