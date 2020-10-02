<template>
  <div id="message">
    <liuyan-top />
    <liuyan-list />
  </div>
</template>

<script>
// TODO 多个输入框互斥:
// 1. 用vuex记录打开的id,然后每个输入框判断vuex里id等于这的id选择性展示
// 2. 留言框怎加表情功能
// 3. 获取更多的子留言
import liuyanTop from '@/views/message-board/components/liuyan-top.vue'
import liuyanList from '@/views/message-board/components/liuyan-list.vue'
export default {
  name: 'message',
  components: {
    liuyanTop: liuyanTop,
    liuyanList: liuyanList,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
#message {
  max-width: 1000px;
  margin: 0 auto 0;
}
</style>