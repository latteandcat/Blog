import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "latte and cat",
  description: "life is like a cup of latte, and cat will make it unlonely",
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "orange4u",
    authorAvatar: "/head.png",
    lastUpdatedText: "最近更新",
    series: {
      "/docs/notes/": [
        {
          text: "module one",
          children: ["home", "theme"],
        },
        {
          text: "module two",
          children: ["api", "plugin"],
        },
      ],
    },
    navbar: [
      { text: "首页", link: "/", icon: "Home" },
      { text: "分类", link: "/categories/qianduan/1/", icon: "Category" },
      { text: "标签", link: "/tags/qianduan/1/", icon: "Tag" },
      { text: '留言板', link: '/docs/message-board', icon: 'Chat' }
    ],
    // commentConfig: {
    //   type: 'valine',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true
});
