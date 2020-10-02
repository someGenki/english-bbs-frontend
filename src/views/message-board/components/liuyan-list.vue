<template>
  <div class="ly-list" v-if="show">
    <h2>总计:{{ total }}条留言</h2>
    <liuyan-fucard v-for="item in list" :data="item" :key="'reply:'+item.id" :parent="true"/>
    <load-more @loaded="handleLoaded" :loadFunc="loadFunc" :current="current" :noLoad="noMore"/>
  </div>
</template>

<script>
import liuyanFucard from './liuyan-fucard.vue'
import loadMore from '@/views/message-board/components/load-more.vue'
import event from '@/event'

// 留言卡片的列表列表
export default {
  name: 'LiuyanList',
  components: {
    liuyanFucard: liuyanFucard,
    loadMore: loadMore,
  },

  data() {
    return {
      show: false,
      list: [], // 父级评论集合
      total: 0, // 总数据条输
      pages: 0, // 总页码数量
      current: 0, // 当前页码
    }
  },
  created() {
    this.getLiuyan()
    // 监听兄弟组件的事件
    event.$on('liuyanTijiao', () => {
      this.getLiuyan()
    })
  },
  methods: {
    // 监听子组件传来的加载完成事件
    handleLoaded(e) {
      // 每次加载完 当前页增加
      this.current++
      for (let i = 0; i < e.records.length; i++) {
        this.list.push(e.records[i]) //然后把新的数组push/concat到原来的数组 可以用concat
      }
      console.log(e.records[0].avatar)
      this.total = e.total
      this.current = e.current
      this.pages = e.pages
    },
    // 传给`加载更多`组件的加载方法
    loadFunc(current, size) {
      return this.$api.getFuLiuyan(current, size)
    },
    // 获取最新的5条留言(第一页)
    getLiuyan() {
      this.$api.getFuLiuyan().then((res) => {
        if (res.code == 200) {
          this.list = res.data.records
          this.total = res.data.total
          this.pages = res.data.pages
          this.current = res.data.current
          this.show = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  },
  computed: {
    noMore() {
      // 是不是没有更多页面了:当前页码大于等于总页码数?(true):(false)
      return this.current >= this.pages
    },
  },
}
</script>

<style lang="scss" scoped>
.ly-list {
  max-width: 800px;
  margin: 0 auto;
}
</style>