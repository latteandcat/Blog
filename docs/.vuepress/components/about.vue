<template>
  <div class="about">
    <ul class="aboutNav">
      <li v-for="item in nav" :key="item.title" @click="showNav(item.code)" :style="cur === item.code ? 'background:#0567f1;color:#fff;' : ''" class="aboutNavItem">
        {{item.title}}
      </li>
    </ul>
    <div class="aboutContent">
      <div v-show="cur === 'me'">
        <ul class="colors">
          <li class="midnightblue">研二在读</li>
          <li class="slateblue">养过一只猫咪</li>
          <li class="blue">学过一段前端</li>
          <li class="deepskyblue">爱过一些路人</li>
          <li class="cornflowerblues">玩过种种游戏</li>
          <li class="lightskyblue">看过很多书籍</li>
          <li class="wuwangcaoblue">还是在寻找自己</li>
        </ul>
      </div>
      <div v-show="cur === 'tech'">
        <ul class="info">
          <li><span>css</span></li>
          <li><span>html</span></li>
          <li><span>javascript</span></li>
          <li><span>vue.js</span></li>
          <li><span>jfinal</span></li>
        </ul>
      </div>
      <div v-show="cur === 'experience'">
        <p>每一段经历都是人生的一部分</p>
        <ul class="info">
          <li><span>2015.09 ~ 2019.06: zzu-undergraduate</span></li>
          <li><span>2019.06 ~ 2020.07: yioks-前端工程师</span></li>
          <li><span>2021.09 ~ now: zzu-postgraduate</span></li>
        </ul>
      </div>
      <div v-show="cur === 'orange'">
        <p>橘子不是那种性格很好的宠物猫</p>
        <p>这反而让她更像个从孤儿院领养的孩子</p>
        <p>面对陌生环境胆小无助</p>
        <p>渴望外面的世界</p>
        <p>我没能给她足够的关怀</p>
        <p>然而她终究还是习惯了家的温暖</p>
        <p>橘子和大多数家猫一样都向往外面的自由</p>
        <p>喜欢看着窗外和天空</p>
        <p>也曾偷偷跑出去闯荡</p>
        <p>我也理解了大部分家长的想法</p>
        <p>有时候过于牢固的保护不是对孩子的溺爱和禁锢</p>
        <p>而是害怕孩子在外面不能好好生活的揪心</p>
        <a href="https://photo.smallsunnyfox.com/" target="_blank" style="text-decoration:none;">🍊🍊🍊</a>
      </div>
      <div v-show="cur === 'book'">
        <div v-for="item in books" :key="item.title">
          <p>{{ item.title }}</p>
          <ul class="info">
            <li v-for="con in item.contents">
              <span>{{ con }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="cur === 'tv'">
        <div v-for="item in tvs" :key="item.title">
          <p>{{ item.title }}</p>
          <ul class="info">
            <li v-for="con in item.contents">
              <span>{{ con }}</span>
            </li>
          </ul>
        </div>   
      </div>
      <div v-show="cur === 'movie'">
        <div v-for="item in movies" :key="item.title">
          <p>{{ item.title }}</p>
          <ul class="info">
            <li v-for="con in item.contents">
              <span>{{ con }}</span>
            </li>
          </ul>
        </div> 
      </div>
      <div v-show="cur === 'game'">
        <p>游戏只有和朋友一起玩时才存在意义</p>
        <ul class="info">
          <li><span>LOL</span></li>
          <li><span>CSGO</span></li>
          <li><span>永劫无间</span></li>
          <li><span>原神</span></li>
          <li><span>崩坏: 星穹铁道</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        { title: '关于我', code: 'me' },
        { title: '技能', code: 'tech' },
        { title: '经历', code: 'experience' },
        { title: '橘子', code: 'orange' },
        { title: '书', code: 'book' },
        { title: '剧', code: 'tv' },
        { title: '电影', code: 'movie' },
        { title: '游戏', code: 'game' }
      ],
      books: [
        { title: '我喜欢的', contents: ['推理', '文学', '爱情'] },
        { title: '2022', contents: ['月光落在左手上-余秀华', '天堂旅行团-张嘉佳'] },
        { title: '2021', contents: ['告白-凑佳苗', '我们生活在巨大的差距里-余华'] }
      ],
      tvs: [
        { title: '我喜欢的', contents: ['韩剧', '美剧', '悬疑'] },
        { title: '2023', contents: ['黑暗荣耀'] },
        { title: '2022', contents: ['奇怪的律师禹英雨'] },
        { title: '2021', contents: ['远看是蔚蓝的春天', '机智的医生生活'] }
      ],
      movies: [
        { title: '我喜欢的', contents: ['动漫', '爱情', '悬疑'] },
        { title: '2023', contents: ['人生路不熟', '深海'] },
        { title: '2022', contents: ['四海', '这个杀手不太冷静', '奇迹·笨小孩'] },
        { title: '2021', contents: ['我要我们在一起', '花束般的恋爱', '你好，李焕英'] },
        { title: 'favorite', contents: ['陪你度过漫长岁月', '恋恋笔记本', '比悲伤更悲伤的故事'] },
      ],
      cur: 'me'
    }
  },
  methods: {
    showNav(code) {
      this.cur = code
    }
  }
}
</script>
