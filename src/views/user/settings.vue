<template>
  <div id="settings" :style="{minHeight:mh+'px'}">
    <a-alert message="配置仅保存到本地哦" type="info" closable/>

    <y-item :data="theme" :editable="false">
      <template v-slot:show>
        <a-radio-group
          button-style="solid"
          name="theme"
          @change="updateTheme($event)"
          :default-value="theme.value"
          size="small"
        >
          <a-radio-button value="light">light</a-radio-button>
          <a-radio-button value="dark">dark</a-radio-button>
        </a-radio-group>
      </template>
    </y-item>
    <y-item :data="bgColor" :handleSave="updateBgColorSave" :leixing="'color'" />
    <y-item :data="mainAnimate" :handleSave="updateMainAnimate" />
    <y-item :data="share" :editable="false" />
  </div>
</template>

<script>
import yItem from '@/components/EditableItem/index.vue'
export default {
  name: 'settings',
  components: {
    yItem: yItem,
  },
  data() {
    return {
      mh: null,
      // 设置项👇
      theme: {
        value: this.$store.state.theme,
        english: 'theme',
        chinese: '菜单栏主题',
        remark: '目前仅支持light和dark,还没完全匹配就先弄着玩',
      },
      bgColor: {
        value: this.$store.state.bgColor,
        english: 'bgColor',
        chinese: '网页背景颜色',
        remark: '用的浏览器自带的color-picker,IE和Safari可能不支持',
      },
      mainAnimate: {
        value: this.$store.state.mainAnimate,
        english: 'mainAnimate',
        chinese: '页面切换动画效果设置(花里胡哨able)',
        remark:
          '动画在<a href="https://animate.style/ " target="_blank">animate.css</a>进行查看预览' +
          '<br>右侧选择效果并进行CV过来.<br>ps:input框内标准格式为<b>animate__fadeInDown</b>' +
          '也可以不带前缀:<b>animate__</b><br>清空内容,内容长度小于4或带有<b>Out</b>字符串保存后则无动画效果',
      },
      share: {
        value:
          '分享这个网站给朋友们瞅瞅吧,这个对我真的很重要!',
        english: 'share',
        chinese: '分享该网站💖',
      },
    }
  },
  methods: {
    updateTheme(args) {
      this.$store.commit('updateTheme', args.target.value)
    },
    updateBgColorSave(args) {
      const { key, value } = args
      this.$store.commit('updateBgColor', value)
    },
    updateMainAnimate(args) {
      const { key, value } = args
      this.$store.commit('updateMainAnimate', value)
    },
  },
  mounted() {
    this.mh = document.body.clientHeight - 120
  },
}
</script>

<style lang="scss" scoped>
#settings {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 5px;
  > .ant-tabs {
    width: 100%;
  }
}
</style>