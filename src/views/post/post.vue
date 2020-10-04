<template>
  <a-row class="post">
    <suspended-panel :post="post"/>
    <a-col class="view" :span="big?18:24">
      <article-show v-if="post" :article="post"/>
      <attachment v-if="post&&post.attachment" :url="post.attachment"/>
      <a-divider id="commentArea">评论区</a-divider>
      <base-comment :item="{id:pid,type:4}"/>
    </a-col>
    <a-col v-show="big" :span="6">
      <div class="sticky">
        <a-card title="相关推荐">
          <a-empty/>
        </a-card>
        <Catalogue :selector="'.v-show-content'" v-if="post"/>
      </div>
    </a-col>
  </a-row>
</template>

<script>
// 帖子详细页面
import ArticleShow from '@/components/ArticleShow'
import SuspendedPanel from '@/components/SuspendedPanel'
import BaseComment from '@/components/Comment'
import Attachment from '@/components/Attachment'
import Catalogue from '@/components/Catalogue'

export default {
  components: {
    ArticleShow,
    SuspendedPanel,
    BaseComment,
    Attachment,
    Catalogue
  },
  data() {
    return {
      post: null, // 设置为null，等发送请求后获取完数据再渲染子组件
      big: true,
      pid: this.$route.params.pid,
    }
  },
  created() {
    let width = document.body.clientWidth
    if (width < 993) this.big = false
    this.$api.getPost(this.pid).then((res) => {
      this.post = res.data
      document.title = this.post.title
    })
  },
}
</script>

<style lang="scss" scoped>
.post {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.view {
  padding: 1rem;
}

.sticky {
  overflow: hidden;
  margin-left: 30px;
  >*{
    margin-bottom: 20px;
  }
}


</style>