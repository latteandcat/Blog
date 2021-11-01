module.exports = {
  dest: 'blog',
  theme: 'reco',
  title: 'latte and cat',
  description: 'study programs and record life',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#FF66CC' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/LatteAndCat.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/LatteAndCat.svg', color: '#FF66CC' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/LatteAndCat.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  themeConfig: {
    type: 'blog',
    huawei: false,
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'Notes', link: '/note/', icon: 'reco-document' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      { text: 'PhotoAlbum', link: 'https://photo.smallsunnyfox.com/', icon: 'reco-blog' },
      { text: 'About', link: '/about/', icon: 'reco-account' },
      { text: 'GitHub', link: 'https://github.com/smallsunnyfox', icon: 'reco-github' }
    ],
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
      },
      {
        title: 'L1nSn0w’s Blog',
        desc: '一名热爱计算机与iOS的高中生',
        logo: 'https://photo.smallsunnyfox.com/images/blog/friendlink/lin_snow.png',
        link: 'https://l1nsn0w.gitee.io'
      }
    ],
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: 'Tag' // 默认 “标签”
      }
    },
    logo: 'https://photo.smallsunnyfox.com/images/blog/head.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    subSidebar: 'auto',
    sidebarDepth: 1,
    displayAllHeaders: false,
    sidebar: {
      '/note/': [
        {
          title: 'HTML5',
          collapsable: true,
          children: ['html5/HTML5的语义元素', 'html5/HTML5多媒体标签', 'html5/HTML5表单元素', 'html5/HTML5中的API', 'html5/Canvas']
        },
        {
          title: 'CSS',
          collapsable: true,
          children: ['css/css3新特性', 'css/css3Flip']
        },
        {
          title: 'JS',
          collapsable: true,
          children: ['js/js数据类型', 'js/js对象', 'js/js继承', 'js/js原型链、闭包', 'js/js函数的四种调用方式']
        },
        {
          title: 'Vue.js',
          collapsable: true,
          children: ['Vue/Vue基础笔记', 'Vue/Vue组件']
        },
        {
          title: '前端单元测试',
          collapsable: true,
          children: ['fe-unit-test/chai', 'fe-unit-test/mocha', 'fe-unit-test/vueTestUtils']
        },
        {
          title: '微信小程序',
          collapsable: true,
          children: ['wechat-mini-program/初识微信小程序']
        }
      ]
    },
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: '橘子',
    authorAvatar: 'https://photo.smallsunnyfox.com/images/blog/head.png',
    // 备案号
    record: '豫ICP备19035192号',
    recordLink: 'https://beian.miit.gov.cn/',
    cyberSecurityRecord: '豫公网安备41172602000151号',
    cyberSecurityLink: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41172602000151',
    // 项目开始时间
    startYear: '2019',
    /**
     * valine 设置 (if you need valine comment )
     */
    valineConfig: {
      appId: 'XDwlSXS2pD137bPrPpwQaqqD-gzGzoHsz', // your appId
      appKey: 'CQ8FKrMUP76LwycPcKlDoRqV', // your appKey
      placeholder: '是时候展现真正的技术了',
      avatar: 'wavatar',
      serverUrl: 'https://leanserver.smallsunnyfox.com'
    }
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    /* [
      require('./plugins/KanBanNiang'),
      {
        theme: ['blackCat'],
        width: 200,
        height: 400,
        modelStyle: {
          position: 'fixed',
          right: '70px',
          bottom: '50px',
          opacity: '0.9' 
        },
        messageStyle: {
          position: 'fixed',
          right: '70px',
          bottom: '380px'
        },
        btnStyle: {
          bottom: '60px',
          right: '80px'
        }
      }
    ], */
    [
      require('./plugins/BgMusic'),
      {
        audios: [
          {
            name: '我再没见过 像你一般的星空',
            artist: 'Seto',
            url: 'https://assets.smallsunnyfox.com/music/2.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
          },
          {
            name: '萤火之森',
            artist: 'CMJ',
            url: 'https://assets.smallsunnyfox.com/music/3.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
          }
        ]
      }
    ],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          message: '发现新内容可用',
          buttonText: '刷新'
        }
      }
    ],
    [
      'permalink-pinyin',
      {
        lowercase: true,
        separator: '-'
      }
    ]
  ]
}
