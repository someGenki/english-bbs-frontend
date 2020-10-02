<template>
  <div v-if="digest" class="userinfo">
    <a :href="'/space/'+digest.uid">
      <a-avatar :size="40" icon="user" :src="digest.avatar" />
    </a>
    <div class="user">
      <span>
        <span class="nickname">
          <a :href="'/space/'+digest.uid">{{digest.nickname}}</a>
        </span>
        <span class="sex">
          <a-icon :type="userSex" />
        </span>
        <a-tooltip title="未实现">
          <span class="talk">
            <a-icon type="mail" />发送消息
          </span>
        </a-tooltip>
      </span>
      <span class="sign">{{digest.sign}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleUserInfo',
  props: {
    uid: Number,
  },
  data() {
    return {
      digest: null,
    }
  },
  created() {
    this.$api.getUserDigest(this.uid).then((res) => {
      this.digest = res.data
    })
  },
  computed: {
    userSex() {
      if (this.digest.sex === 1) return 'man'
      else if (this.digest.sex === 2) return 'woman'
      else return 'eye-invisible'
    },
  },
}
</script>

<style lang="scss" scoped>
.userinfo {
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  .user {
    margin: 0 8px;
    display: flex;
    flex-direction: column;
    > span {
      line-height: 25px;
    }
    .nickname {
      font-weight: bold;
      margin-right: 10px;
    }
    .sex {
      margin-right: 5px;
    }
  }
}
</style>