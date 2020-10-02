<template>
  <a-comment class="comment-item">
    <template slot="actions">
      <span key="comment-basic-like">
        <a-tooltip title="Like">
          <a-icon type="like" :theme="action === 'liked' ? 'filled' : 'outlined'" @click="like"/>
        </a-tooltip>
        <span style="padding-left: 8px;cursor: auto">{{ likes }}</span>
      </span>
      <span key="comment-basic-dislike">
        <a-tooltip title="Dislike">
          <a-icon
            type="dislike"
            :theme="action === 'disliked' ? 'filled' : 'outlined'"
            @click="dislike"
          />
        </a-tooltip>
      </span>
      <span key="comment-basic-reply-to" @click="goCommentArea">Reply to</span>
    </template>

    <a :href="'/space/'+data.fromId" slot="author">{{ data.fromName }}</a>
    <a-avatar slot="avatar" :src="data.fromAvatar" icon="user" alt="avatar"/>
    <p v-html="processEmotion(data.content)" slot="content"></p>
    <a-tooltip slot="datetime" :title="cm.format('YYYY-MM-DD HH:mm:ss')">
      <span>{{ cm.fromNow() }}</span>
    </a-tooltip>
  </a-comment>
</template>

<script>
import moment from 'moment'
import {processEmotion} from '@/utils/process.js'

export default {
  name: 'BaseCommentItem',
  props: {
    data: Object,
  },
  data() {
    return {
      likes: 0,
      action: null,
      moment,
      processEmotion,
    }
  },
  created() {
    this.likes = this.data.likes
  },
  methods: {
    like() {
      if (this.action === 'liked') {
        this.likes--
        this.action = null
      } else {
        this.likes++
        this.action = 'liked'
      }
    },
    dislike() {
      if (this.action === 'liked') this.likes--
      this.action = 'disliked'
    },
    goCommentArea() {
      // TODO 修改输入框的placeholder和提交时的行为
      document.querySelector('#commentArea').scrollIntoView(true)
    },
  },
  computed: {
    // commentMoment moment 时间格式化库
    // 参考：https://blog.csdn.net/u014438244/article/details/85274221
    cm() {
      return this.moment(this.data.gmtCreate, 'YYYY-MM-DDTHH:mm:ss')
    },
  },
}
</script>

<style lang="scss" scoped>
.ant-comment-content-author-name > a {
  font-weight: bold;
  font-size: 14px !important;
}

.comment-item {
  padding: 0 25px;
}

::v-deep .ant-comment-inner {
  padding: 8px 0;
}
</style>