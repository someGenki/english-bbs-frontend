<template>
  <div class="suspended">
    <a-button @click="like" :type="isLiked?'primary':null" shape="circle" icon="like"/>
    <a-button shape="circle" icon="star"/>
    <a-button shape="circle" icon="message" @click="goCommentArea"/>
    <span class="share">分享</span>
    <a-button shape="circle" icon="qq"/>
    <a-button shape="circle" icon="weibo"/>
    <a-button shape="circle" icon="wechat"/>
  </div>
</template>

<script>
export default {
  name: 'SuspendedPanel',
  props: {
    post: Object,
  },
  data() {
    return {
      isLiked: false,
    }
  },
  created() {
    // 登录的用户判断是否已经点赞、收藏过的了，然后修改this.isLiked
  },
  methods: {
    goCommentArea() {
      // 点击跳转到指定id位置
      document.querySelector('#commentArea').scrollIntoView(true)
    },
    like() {
      // TODO 帖子点赞表
      if (this.isLiked === false) {
        // 发起点赞请求
      } else {
        // 发起取消点赞请求
      }
      // 成功后取反状态
      this.isLiked = !this.isLiked
    },
  },
}
</script>

<style lang="scss" scoped>
.suspended {
  position: fixed;
  display: flex;
  flex-direction: column;

  top: 7rem;
  margin-left: -4rem;

  > * {
    margin-bottom: 7px;
  }

  > .share {
    color: #a8a8a8;
    user-select: none;
  }
}

.anticon .anticon-like {
  margin-top: -5px;
}
</style>