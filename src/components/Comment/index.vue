<template>
  <div v-if="commentList" class="comment-box">
    <div class="comment-input">
      <a-textarea placeholder="发个评论吧~" v-model="content" :rows="2"/>
      <div class="tool">
        <div class="left">
          <owo-box @emotionClick="handleEmotionClick"/>
          <emotion-box @emotionClick="handleEmotionClick"/>
        </div>
        <div class="right">
          <span class="kuaijie">Ctrl+Enter</span>
          <a-button type="primary" @click="commit">提交评论</a-button>
        </div>
      </div>
    </div>
    <base-comment-item v-for="comment in commentList" :key="comment.id+'c'" :data="comment"/>
    <div class="load">
      <a-spin v-show="loading" tip="Loading..."></a-spin>
      <div v-show="!loading">
        <span class="click" @click="loadMore">
          {{ !noMore ? text : '没有更多内容了' }}
          <a-icon type="small-dash"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import OwoBox from '@/components/OwoBox'
import emotionBox from '@/components/EmotionBox/index'
import BaseCommentItem from '@/components/Comment/Item.vue'
import {isBlank} from '@/utils/check.js'

export default {
  name: 'BaseComment',
  components: {
    OwoBox,
    emotionBox,
    BaseCommentItem,
  },

  props: {
    item: Object, // 资源类型
  },

  data() {
    return {
      commentList: null, // 某个资源下的父评论数组
      total: 0, // 总评论数
      pages: 0, // 总页码数
      current: 1, // 当前页面
      size: 5, // 每页大小

      content: '',

      parentId: 0,
      // toId: 0, // todo
      // toName: '',

      loading: false,
      text: '加载更多',
    }
  },

  created() {
    this.getComments(this.item, this.current, this.size)
  },

  methods: {
    // 1. 提交一个评论
    commit() {
      if (isBlank(this.content)) {
        return this.$message.error('内容不能为空')
      } else if (this.$store.getters['user/login'] === false) {
        return this.$message.warning('此操作需要登录')
      } else {
        // 这只是父评论，回复用的评论需要 "parentId，toId,toName"
        let form = {
          content: this.content,
          fromName: this.$store.getters['user/nickname'],
          itemId: this.item.id,
          itemType: this.item.type,
          parentId: 0,
        }
        this.$api.commitComment(form).then((res) => {
          this.content = ''
          this.$message.success(res.msg)
          this.commentList.unshift(res.data)
        })
      }
    },
    // 2. 监听表情组件的点击事件
    handleEmotionClick(arg) {
      this.content += arg
    },
    // 3. 加载更多
    loadMore() {
      if (this.noMore === true) return
      this.loading = true
      this.getComments(this.item, this.current + 1, this.size)
    },
    // 4. 获取评论:资源对象（id，type),要加载的页面，加载多少
    getComments(item, num, size) {
      this.$api.getFuComment(item, num, size).then((res) => {
        if (num === 1) this.commentList = res.data.records
        else this.commentList.push(...res.data.records)
        this.total = res.data.total
        this.pages = res.data.pages
        this.current = res.data.current
        this.loading = false
      })
    },
  },
  computed: {
    // 是不是没有更多页面了:当前页码大于等于总页码数?(true):(false)
    noMore() {
      return this.current >= this.pages
    },
  },
}
</script>

<style lang="scss" scoped>
.comment-input {
  padding: 10px 20px 0;
  background-color: #e2e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
}

// areatext下方工具栏
.tool {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 5px;

  > .left {
    > .emoji {
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
  }

  > .right {
    > * {
      margin: 0px 5px;
      height: 32px;
      line-height: 32px;
    }

    > .kuaijie {
      display: none;
      filter: invert(30%);
    }
  }
}

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