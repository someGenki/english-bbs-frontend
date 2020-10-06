<template>
  <!-- 手机用 一个汉堡菜单 logo 头像/登录 -->
  <a-col
    :class="$store.state.theme=='dark'?'dark-mode':'white'"
    type="flex"
    :xs="24"
    :sm="24"
    :md="24"
    :lg="0"
  >
    <div class="juzhong padding3">
      <!-- 汉堡按钮  -->
      <a-button style="margin-left:5px" @click="$store.commit('updateSider')">
        <a-icon class="white" v-show="$store.state.sider" type="menu-fold"/>
        <a-icon class="white" v-show="!$store.state.sider" type="menu-unfold"/>
      </a-button>
      <a href="/" class="logo">
        <img src="@/assets/images/logo.png"  height="60" alt/>
      </a>
      <!-- 头像区域 -->
      <div>
        <img
          v-if="login"
          @click="$router.push('/space/'+$store.state.user.uid)"
          class="avatar"
          :src="avatar"
        />
        <span v-else>
          <router-link to="/signin">登录</router-link>
        </span>
      </div>
    </div>
  </a-col>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'TheHeaderMobile',
  data() {
    return {
      sider: true,
    }
  },
  methods: {},
  computed: {
    ...mapGetters({login: 'user/login', avatar: 'user/avatar'}),
  },
}
</script>

<style lang="scss" scoped>
.ant-col{
  height: 64px;
}
</style>