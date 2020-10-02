<template>
  <div class="dynamic-card">
    <div v-if="dynamic.optType===1">
      <p style="font-size: 1.05rem">At {{ createdTime.fromNow() }} join this BBS,welcome 🎉</p>
      <p style="text-align: right">Automatically created by the system</p>
    </div>
    <div v-else-if="dynamic.optType===2">
      <a class="post-title" :href="'/post/'+dynamic.optId" target="_blank"><span class="action">发表了一篇帖子：</span>{{
          dynamic.detail.title
        }}</a>
      <div class="post-content">{{ dynamic.detail.content }}</div>
      <div class="post-footer">{{ createdTime.fromNow() }}</div>
    </div>
    <div v-else-if="dynamic.optType===4">
      <p class="tweet-title">发表了一条动态:</p>
      <div v-html="processEmotion(dynamic.content)"></div>
      <div class="post-footer">{{ createdTime.fromNow() }}</div>
    </div>
    <span class="more-button">
      <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
      <a-icon type="down"/>
      </a>
          <a-menu slot="overlay" @click="handleMenuClick($event,dynamic.id)">
            <a-menu-item key="0">
              举报
            </a-menu-item>
            <a-menu-item key="1">
              转发
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item key="3" :disabled="dynamic.uid===$store.state.user.uid">
             删除
            </a-menu-item>
          </a-menu>
    </a-dropdown>

    </span>
  </div>
</template>

<script>
import moment from 'moment'
import {processEmotion} from '@/utils/process.js'

export default {
  name: "dynamic-card",
  props: {
    dynamic: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      moment, processEmotion
    }
  },
  created() {
    // console.log(this.dynamic)
  },
  computed: {
    createdTime() {
      return this.moment(this.dynamic.gmtCreate, 'YYYY-MM-DDTHH:mm:ss')
    }
  },
  methods: {
    handleMenuClick(e, id) {
      let _this = this
      if (e.key === '3') {
        this.$confirm({
          title: '是否删除这条动态',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log(id)
            _this.$api.deleteDynamic(id).then(res => {
              if (res.code === 200 && res.data === true)
                _this.$message.success("删除成功")
            })
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/mixins/_yichu.scss';

.dynamic-card {
  padding: 5px 15px;
  margin: 5px 15px;

  position: relative;

  border-bottom: 1px solid #dbe1e9;
}

.more-button {
  position: absolute;
  top: 5px;
  right: 5px;

  color: #b7c3d1;
}

.post-title {
  height: 40px;
  line-height: 40px;
}

.action {
  color: #99B3CD;
  user-select: none;
}

.post-content {
  @include ellipsis(4);
}

.post-footer {
  height: 40px;
  line-height: 40px;

  font-size: 0.8rem;
  text-align: right;
  color: #9c9a9a;
}

.tweet-title {
  color: #99B3CD;
}
</style>