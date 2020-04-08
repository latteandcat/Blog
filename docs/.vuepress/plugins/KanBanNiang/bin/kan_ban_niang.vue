<template>
  <div class="reco-kbn-panel" :style="panelStyle" v-if="isLoaded">
    <div
      v-if="!isCleanMode"
      class="reco-kbn-message"
      :style="'width:'+ width +'px'">
    </div>
    <div 
      class="reco-kbn-model"
      :style="'width:'+ width +'px;height:' + height + 'px'">
      <canvas
        id="reco-kbn"
        :width="width"
        :height="height"
        class="live2d"
        style="position: absolute; left: 0px; top: 0px;"
      ></canvas>
    </div>
    <div 
      v-if="!isCleanMode"
      class="reco-kbn-btns"
      :style="'height:'+ height +'px'">

    </div>
  </div>
</template>

<script>
  import live2dJSString from './assets/js/live2d'
  export default {
    name: 'KanBanNiang',
    data() {
      return {
        isLoaded: true,
        isCleanMode: CLEAN,
        width: WIDTH,
        height: HEIGHT,
        panelStyle: PANEL_STYLE,
        currentTheme: THEME[0],
        myTheme: THEME,
        themeName: ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
        // 模型地址
        model: {
          blackCat:
            // 'http://assets.smallsunnyfox.com/models/live2d-widget-model-hijiki/assets/hijiki.model.json',
            'https://assets.smallsunnyfox.com/models/model/HyperdimensionNeptunia/histoire/index.json',
          whiteCat:
            'https://assets.smallsunnyfox.com/models/live2d-widget-model-tororo/assets/tororo.model.json',
          haru1:
            'https://assets.smallsunnyfox.com/models/live2d-widget-model-haru/01/assets/haru01.model.json',
          haru2:
            'https://assets.smallsunnyfox.com/models/live2d-widget-model-haru/02/assets/haru02.model.json',
          haruto:
            'https://assets.smallsunnyfox.com/models/live2d-widget-model-haruto/assets/haruto.model.json',
          koharu:
            'https://assets.smallsunnyfox.com/models/live2d-widget-model-koharu/assets/koharu.model.json',
          izumi:
            'https://assets.smallsunnyfox.com/models/live2d-widget-model-izumi/assets/izumi.model.json',
          shizuku:
            'https://assets.smallsunnyfox.com/models/live2d-widget-model-shizuku/assets/shizuku.model.json',
          wanko:
            'https://assets.smallsunnyfox.com/models/live2d-widget-model-wanko/assets/wanko.model.json',
          miku:
            'https://assets.smallsunnyfox.com/models/live2d-widget-model-miku/assets/miku.model.json',
          z16:
            'https://assets.smallsunnyfox.com/models/live2d-widget-model-z16/assets/z16.model.json'
        }
      }
    },
    created () {
      if (this.isCleanMode) {
        this.$set(this.panelStyle, 'width', this.width)
        this.$set(this.panelStyle, 'height', this.height)
      } else {
        this.$set(this.panelStyle, 'width', this.width + 30 + 'px')
        this.$set(this.panelStyle, 'height', this.height + 100 + 'px')
      }
    },
    mounted() {
      this.initBanNiang()
    },
    methods: {
      initBanNiang () {
        if (this.themeName.indexOf(this.currentTheme) === -1) {
          console.log('@vuepress-reco/vuepress-plugin-kan-ban-niang不支持主题' + this.currentTheme + ', 请检查主题名, 或前往https://vuepress-theme-reco.recoluan.com/views/plugins/kanbanniang.html 查看支持的主题')
          document.querySelector('.kanbanniang').style.display = 'none'
          return
        }
        const isMobile = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
        if (isMobile) {
          this.isLoaded = false
          return console.log('mobile do not load model')
        }
        if (!window.loadlive2d) {
          const script = document.createElement('script')
          script.innerHTML = live2dJSString
          document.body.appendChild(script)
        }
        // this.style = {
        // width: (150 / 1424) * document.body.clientWidth,
        // height: ((150 / 1424) * document.body.clientWidth) / 0.8
        // }
        var ajax = new XMLHttpRequest()
        ajax.open('get', this.model[this.currentTheme])
        ajax.send()
        ajax.onreadystatechange = function () {
          if (ajax.status !== 200) {
            console.log('看板娘的资源加载失败了，请稍后刷新页面重试！')
            document.querySelector('.reco-kbn-panel').style.display = 'none'
          }
        }
        window.loadlive2d(
          'reco-kbn',
          this.model[this.currentTheme]
        )
      }
    },
  }
</script>

<style lang="stylus" scoped>
.reco-kbn-panel
  .reco-kbn-message
    height 80px
    padding 10px
    box-sizing border-box
    margin-right 30px
    margin-bottom 20px
  .reco-kbn-model
    float left
  .reco-kbn-btns
    float left
    width 30px
</style>