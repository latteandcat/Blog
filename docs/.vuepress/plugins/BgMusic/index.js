const { resolve } = require('path')

module.exports = (options, context) => ({
  define () {
    const { position, audios, autoplay, autoShrink, shrinkMode, floatPosition, floatStyle} = options
    return {
      POSITION: position || {
        left: '10px',
        bottom: '10px',
        'z-index': '999999'
      }, // 播放器位置
      AUDIOS: audios, // 播放列表
      AUTOPLAY: autoplay || true, // 是否开启自动播放
      AUTO_SHRINK: autoShrink || false, // 是否默认收缩 
      SHRINK_MODE: shrinkMode || 'float',
      FLOAT_POSITION: floatPosition || 'left', // 指定浮窗模式浮动在哪一侧
      FLOAT_STYLE: floatStyle || {
        bottom: '200px',
        'z-index': '999999'
      }
    }
  },
  name: '@vuepress-reco/vuepress-plugin-bgm-player',
  enhanceAppFiles: resolve(__dirname, './bin/enhanceAppFile.js'),
  globalUIComponents: 'BgMusic'
})
