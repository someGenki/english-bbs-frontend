<template>
  <div class="ly-fucard">
    <div class="user">
      <a-avatar icon="user" size="large" :src="data.avatar" alt="avatar" />
      <span class="nickname">{{data.nickname}}</span>
      <a-tag :color="data.userId>0?'blue':'green'">{{data.userId>0?'用户':'游客'}}</a-tag>
      <a-divider type="vertical" />
      <span class="os">{{data.os}}</span>
      <a-divider type="vertical" />
      <span class="browser">{{data.browser}}</span>
    </div>
    <div class="content">
      <a-tag color="pink" v-if="false">置顶</a-tag>
      <span class="aite" v-if="!parent">@{{data.toName}}:</span>
      <span v-html="cotent"></span>
    </div>
    <div class="footer">
      <span class="reply-btn" @click="replyHandler">{{show?'收起':'回复ta'}}</span>
      <span class="time">{{data.gmtCreate}}</span>
      <span
        v-if="parent&&data.childrenCount>0"
        class="reply-count"
      >共{{data.childrenCount}}条回复{{ data.childrenCount>3?'| 展开':null}}</span>
    </div>
    <div class="children" v-if="parent">
      <!-- 调用自己一次 -->
      <liuyan-fucard :data="i" :key="'zreply'+i.id" v-for="i in data.children" :parent="false" />
    </div>
    <!-- 仅在父级留言卡片展示 -->
    <liuyan-shuru
      :toId="data.id"
      :toName="data.nickname"
      :parentId="parent?data.id:data.parentId"
      v-if="show"
      @commit="show=false"
    />
    <!-- <a-divider v-if="parent" dashed>---</a-divider> -->
  </div>
</template>

<script>
// 留言卡片组件,关联一条数据
import liuyanShuru from './liuyan-shuru.vue'
import { processEmotion } from '@/utils/process.js'
export default {
  // 组件自动调用自己,要写name,然后要写递归终止条件
  name: 'LiuyanFucard',
  components: {
    liuyanShuru: liuyanShuru,
  },
  props: {
    parent: { type: Boolean, default: false },
    data: { type: Object, required: true },
    // 包括id,昵称,内容,头像,父级评论id,用户id,toid和name,浏览器/oS,时间和子评论,子评论数量
  },
  data() {
    return {
      show: false,
    }
  },
  created() {
    this.cotent = processEmotion(this.data.content)
  },
  methods: {
    // 1. 获取更多
    // 2. 点击展开回复框
    replyHandler() {
      this.show = !this.show
    },
  },
}
</script>

<style lang="scss" scoped>
// 控制内容区域距离头像的位置
$left: 60px;
$nickname: 45px;
.ly-fucard {
  min-height: 90px;
  position: relative;
  margin-bottom: 20px;
}
.user {
  overflow: hidden;
  white-space: nowrap; /*强制span不换行*/
  > * {
    margin-right: 5px;
    font-size: 12px;
    color: #333;
  }
  .nickname {
    margin-left: $left - $nickname;
    font-size: 14px;
    color: rgb(112, 120, 126);
    font-weight: 500;
  }
}
.content {
  // 上到下顺时针
  margin: -5px 5px 5px $left;
  > .aite {
    color: #4949fc;
    margin-right: 5px;
  }
}
.children {
  margin-left: $left;
  border-bottom: 1px solid #d1d1d1;
}
.footer {
  margin-left: $left;
  height: 30px;
  line-height: 30px;
  > * {
    margin-right: 10px;
    font-size: 12px;
    color: #333;
  }

  > .reply-btn {
    padding: 3px;
    &:hover {
      cursor: pointer;
      border-radius: 5px;
      background-color: rgb(216, 216, 235);
    }
  }
  > .reply-count {
    float: right;
    // color: blueviolet;
    margin-right: 10px;
  }
}
</style>