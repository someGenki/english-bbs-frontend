<template>
  <div @click.stop="handleShowClick" class="owo-box">
    <slot>
      <span class="owo">owo</span>
    </slot>
    <div v-if="load" v-show="show" class="box">
      <a
        class="emo"
        v-for="(line, i) in owoArr"
        :key="'owo'+i"
        @click.stop="emoClick(line.name)"
        v-text="line.text"></a>
    </div>
  </div>
</template>

<script>
import emotions from '@/assets/js/EmotionList.js'

export default {
  name: "owo-index",
  data() {
    return {
      show: false, // 是否展示表情框(表情盒子)
      load: false, // 是否加载了表情框
      owoArr: null, //表情数组
    }
  },
  methods: {
    // 监听span点击来选择展示表情box
    handleShowClick() {
      // 当第一次点击展开在渲染表情盒子
      if (this.load === false) this.loadEmotion()
      this.show =!this.show
      // 点击其他地方时关闭表情盒子 (已在div的@click中设置阻止冒泡事件了)
      document.onclick = () => {
        this.show = false
        document.onclick = null
      }
    },
    // 表情点击把名字发给父组件(调用者)
    emoClick(arg) {
      this.show = false
      this.$emit('emotionClick', arg)
    },
    // 加载表情
    loadEmotion() {
      const list = emotions.kaomojiList
      let kaomojiList = []
      list.map((item, index) => {
        kaomojiList.push({
          name: `${item}`,
          text: `${item}`,
        })
      })
      this.owoArr = kaomojiList
      this.load = true
    },
  }
}
</script>

<style lang="scss" scoped>
.owo-box {
  // 重要的就是加个相对定位
  display: inline-block;
  position: relative;

  > .owo {
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
    width: 341px;
    max-height: 196px;
    overflow: scroll;
    top: 30px;
    border: 1px solid aqua;
    // 每个span表情标签样式
    .emo {
      cursor: pointer;
      font-size: 12px;
      line-height: 22px;
      margin: 2px 3px;
      padding: 3px 5px;
      color: #111111;
      white-space: pre;
    }

    .emo:hover {
      background-color: #ddd;
    }
  }
}
</style>