<template>
  <div id="space">
    <!-- 我来组成头部 -->
    <profile-header :uid="uid"/>
    <!-- 躯体后期再搞 -->
    <div class="publish" v-if="uid===$store.state.user.uid">
      <a-textarea v-model="content" placeholder="发布一条动态~"></a-textarea>
      <div class="toolbar">
        <emotion-box @emotionClick="e=>{this.content += e}"/>
        <a-button @click="sendTweet">发送</a-button>
      </div>
    </div>
    <user-dynamic :uid="uid"/>
  </div>
</template>

<script>
import ProfileHeader from '@/views/user/components/profile-header.vue'
import UserDynamic from '@/views/user/components/user-dynamic.vue'
import emotionBox from '@/components/EmotionBox/index'
import {bespreadDiv} from '@/utils/common.js'

export default {
  name: 'space',
  components: {
    ProfileHeader, UserDynamic, emotionBox
  },
  data() {
    return {
      uid: -1,
      content: '',
      bespreadDiv,
    }
  },
  created() {
    this.uid = this.$route.params.uid
  },
  mounted() {
    this.bespreadDiv("#space")
  },
  methods: {
    sendTweet() {
      this.$api.sendTweet(this.content).then(res => {
        console.log(res)
        this.content = '';
        this.$message.success("发表成功")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#space {
  margin: 0 auto;
  max-width: 1000px;
}

.publish {
  padding: 18px;
  //max-width: 700px;
  margin: 0 20px;

  border-radius: 5px;
  border: 1px solid gainsboro;
  background-color: #fff;


  position: relative;

}

.toolbar {
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
}
</style>