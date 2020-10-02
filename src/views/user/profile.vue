<template>
  <div id="profile" :style="{minHeight:mh+'px'}">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="账户设置">
        <account />
      </a-tab-pane>
      <a-tab-pane key="2" tab="个人信息" force-render>
        <userinfo />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
// TODO todo 设置未登录用户跳转到首页
import account from '@/views/user/components/account-info.vue'
import userinfo from '@/views/user/components/user-profile.vue'
export default {
  name: 'profile',
  components: {
    account: account,
    userinfo: userinfo,
  },
  data() {
    return {
      mh: null,
    }
  },
  mounted() {
    this.mh = document.body.clientHeight - 120
  },
}
</script>

<style lang="scss" scoped>
#profile {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 5px;
  > .ant-tabs {
    width: 100%;
  }
}
</style>