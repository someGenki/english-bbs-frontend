<template>
  <div class="load">
    <a-spin v-show="loading" tip="Loading..."></a-spin>
    <div v-show="!loading">
      <span class="click" @click="handleLoadMore">
        {{ !noLoad ? text : '没有更多内容了' }}
        <a-icon type="small-dash"/>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'load-more',
  props: {
    // 如何去加载(大概要包含请求的接口,然后返回值用emit给父组件)
    loadFunc: {type: Function, required: true},
    // 是否禁止加载
    noLoad: {type: Boolean, default: false},
    // 从第几页开始加载
    current: {tpye: Number, required: true},
    // 每页加载数量
    size: {tpye: Number, default: 5},
  },
  data() {
    return {
      loading: false,
      text: '加载更多',
    }
  },
  methods: {
    handleLoadMore() {
      if (this.noLoad === true) {
        return
      }
      this.loading = true
      // 请求新的一页,页面当然是当前页多一页
      this.loadFunc(this.current + 1, this.size).then((res) => {
        this.loading = false
        if (res.code === 200) {
          this.$emit('loaded', res.data)
        } else {
          return this.$message.error(res.msg)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.load {
  height: 40px;
  // border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
}

.click {
  padding: 8px;
  cursor: pointer;
}
</style>