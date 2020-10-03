<template>
  <div class="ly-shuru">
    <a-textarea
      id="liuyanshuru"
      class="inp"
      v-model="content"
      :allowClear="true"
      :placeholder="toName!=null?'@'+toName+':'+tishi:tishi"
      :auto-size="{ minRows: 5, maxRows: 8 }"
    />
    <div class="tool">
      <div class="left">
        <owo-box @emotionClick="handleEmotionClick"/>
        <emotion-box @emotionClick="handleEmotionClick" />
      </div>
      <div class="right">
        <a-input
          style="width:120px"
          :disabled="login===true"
          allowClear
          v-model="nickname"
          placeholder="输入昵称"
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
        <span class="kuaijie">Ctrl+Enter</span>
        <a-button type="primary" @click="commit">提交留言</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import emotionBox from '@/components/EmotionBox/index'
import OwoBox from '@/components/OwoBox'
import { isBlank } from '@/utils/check.js'
import event from '@/event'
// 留言输入框的封装
export default {
  name: 'LiuyanShuru',
  components: {
    emotionBox: emotionBox,OwoBox
  },
  props: {
    // 要对留言回复的那条留言的id
    toId: { type: Number, default: 0 },
    // 要对留言回复的那条留言的发表人昵称
    toName: { type: String, default: null },
    // 要对留言回复的那条留言所在的父级留言的id
    // 对父级留言则,2个相同
    parentId: { type: Number, default: 0 },
  },
  data() {
    return {
      tishi: '请留下和谐友善的言论哦', // placeholder
      nickname: this.$store.getters['user/nickname'] || null,
      content: '',
    }
  },
  methods: {
    // 1.提交留言
    commit() {
      if (isBlank(this.content)) return this.$message.error('内容不能为空')
      let form = {
        content: this.content,
        nickname: this.nickname || '匿名',
        parentId: this.parentId,
        toId: this.toId,
        toName: this.toName,
      }
      this.$api.postLiuyan(form).then((res) => {
        if (res.code == 200) {
          //  emit发送,然后让留言列表重新获取最近留言
          event.$emit('liuyanTijiao', true)
          this.$emit('commit', true)
          this.content = ''
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 2.监听表情组件的点击事件
    handleEmotionClick(arg) {
      this.content += arg
    },
  },
  computed: {
    ...mapGetters({ login: 'user/login', avatar: 'user/avatar' }),
  },
}
</script>

<style lang="scss" scoped>
.inp {
  background: transparent;
  &::placeholder {
    // css3:反色
    filter: invert(30%);
  }
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
</style>