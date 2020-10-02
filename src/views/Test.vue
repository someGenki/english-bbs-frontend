<template>
  <div>
    <h1>test</h1>
    <button @click="show = !show" class="bubble">泡泡粒子</button>
    <div>Example</div>
    <span class="xuanting">222悬停222</span>
    <a href="/" class="xuanting">悬停</a>
    <hr/>
    <transition :duration="2000" enter-active-class="animate__animated animate__pulse">
      <div v-show="show">
        <p>hello</p>
        <h1>h2222</h1>
      </div>
    </transition>
    <hr/>
    <transition leave-active-class="animate__animated animate__shakeX">
      <div v-if="show">
        <p>hello</p>
        <h1>h1111</h1>
      </div>
    </transition>
    <hr/>
    <div v-if="showEmotion">
      <span v-for="(line, i) in emotionArr" :key="i" v-html="line.url"></span>
    </div>

    <div>
      <span>1</span>
      <span v-html="processEmotion('11#色;22#你好;')"></span>
    </div>
    <hr/>
    <emotion-box @emotionClick="handleEmotionClick"/>
    <hr/>
    <vue-cropper ref="cropper"></vue-cropper>
    <hr>
    <p class="p-text">溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出</p>

  </div>
</template>

<script>
import emotions from '../assets/js/EmotionList.js'
import emotionBox from '../components/EmotionBox/index'
import {VueCropper} from 'vue-cropper'

export default {
  components: {
    emotionBox,
    VueCropper,
  },
  data() {
    return {
      show: true,
      showEmotion: false,
      emotionArr: null,
    }
  },
  created() {
    this.initEmotion()
  },
  methods: {
    // 初始化表情
    initEmotion() {
      const list = emotions.emotionList
      let emotionArr = []
      list.map((item, index) => {
        emotionArr.push({
          name: `#${item};`,
          url: `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`,
        })
      })
      this.emotionArr = emotionArr
      this.showEmotion = true
    },
    // 带#表情;的处理
    // content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)
    processEmotion(str) {
      return str.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, (words) => {
        let word = words.replace(/\#|\;/gi, '')
        let index = emotions.emotionList.indexOf(word)
        if (index !== -1) {
          return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
        } else {
          return words
        }
      })
    },
    handleEmotionClick(str) {
      console.log(str)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/mixins/_button.scss';
@import '@/assets/mixins/_xuanting.scss';
@import '@/assets/mixins/_yichu.scss';

.bubble {
  @include bubble(#333333, #db79b5, #82e76d, 10px);
}

.xuanting {
  @include xuanting();
}

.emoji {
  position: relative;
}

.p-text {
  width: 150px;
  @include ellipsis(2);
}
</style>