<template>
  <div class="top">
    <h2 class="tips">🎉:欢迎给该网站留下建设性的意见❤</h2>
    <img class="pic" src='~@/assets/images/note_taking.svg' alt/>
<!--    <img class="pic" src='../../../../src/assets/images/note_taking.svg' alt/>-->
    <liuyan-shuru/>
  </div>
</template>

<script>
// 留言页面的上半部分 包括图片提示和输入框组件
import liuyanShuru from './liuyan-shuru.vue'

export default {
  name: 'LiuyanTop',

  components: {
    liuyanShuru: liuyanShuru,
  },
  created() {
  },
}
</script>

<style lang="scss" scoped>
.top {
  max-width: 800px;
  margin: 0 auto;
  min-height: 430px;

  .tips {
    text-align: center;
  }

  .pic {
    display: block;
    margin: -45px auto -45px;
    max-width: 400px;
  }
}
</style>