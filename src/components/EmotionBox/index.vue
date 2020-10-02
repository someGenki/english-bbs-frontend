<template>
  <div @click.stop="handleShowClick" class="emotion-box">
    <slot>
      <span class="emotion">emotion</span>
    </slot>
    <div v-if="load" v-show="show" class="box">
      <span
        class="emo"
        v-for="(line, i) in emotionArr"
        :key="'emojo'+i"
        @click.stop="emoClick(line.name)"
        v-html="line.url"
      ></span>
    </div>
  </div>
</template>

<script>
/*
依赖:EmotionList.js
使用:导入,注册组件, 然后 <emotion-box @emotionClick="handleEmotionClick" />
只需要写一个handleEmotionClick()
*/
// emo: 单个span标签标签简写
import emotions from '@/assets/js/EmotionList.js'
export default {
  name: 'emotion-box',
  data() {
    return {
      show: false, // 是否展示表情框(表情盒子)
      load: false, // 是否加载了表情框
      emotionArr: null, //表情数组
    }
  },
  methods: {
    // 监听span点击来选择展示表情box
    handleShowClick() {
      // 当第一次点击展开在渲染表情盒子
      if (this.load == false) this.loadEmotion()
      this.show = true
      // 点击其他地方时关闭表情盒子 (已在div的@click中设置阻止冒泡事件了)
      document.onclick = () => {
        this.show = false
        document.onclick = null
      }
    },
    // 表情点击把名字发给父组件(调用者)
    emoClick(arg) {
      this.$emit('emotionClick', arg)
    },
    // 加载表情
    loadEmotion() {
      const list = emotions.emotionList
      let emotionArr = []
      list.map((item, index) => {
        emotionArr.push({
          name: `#${item};`,
          url: `<img title="${item}" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`,
        })
      })
      this.emotionArr = emotionArr
      this.load = true
      console.log('表情盒子加载完成')
    },
  },
}
</script>

<style lang="scss" scoped>
.emotion-box {
  // 重要的就是加个相对定位
  display: inline-block;
  position: relative;
  > .emotion {
    cursor: pointer;
    height: 30px;
    user-select: none;
    line-height: 30px;
    padding: 2px 4px;
    border: 1px solid #9c9a9a;
    border-radius: 7px;
    margin-right: 5px;
    &:hover {
      background-color: aquamarine;
    }
  }
  // 重要的就是加个绝对定位 其他就是好看的
  > .box {
    z-index: 9;
    position: absolute;
    background-color: #fff;
    width: 285px;
    max-height: 150px;
    overflow: scroll;
    top: 30px;
    border: 1px solid aqua;
    // 每个span表情标签样式
    .emo {
      cursor: pointer;
    }
  }
}
</style>