<template>
  <!-- 小屏幕显示的菜单栏 -->
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOutLeftBig"
  >
    <aside v-show="$store.state.sider">
      <a-menu
        mode="inline"
        v-model="currentMenu"
        :theme="theme"
        @click="colorSider"
        :default-open-keys="['main']"
      >
        <a-menu-item v-if="!login" key="/signin">
          <router-link to="/signin">登录/注册</router-link>
        </a-menu-item>
        <a-sub-menu v-else key="user">
          <span slot="title">
            <a-icon type="user"/>用户相关
          </span>
          <a-menu-item key="/space">
            <router-link :to="'/space/'+$store.state.user.uid">
              <a-icon type="home"/>
              个人主页
            </router-link>
          </a-menu-item>
          <a-menu-item v-for="um in userMenus" :key="um.key+'pc'">
            <router-link :to="um.key">
              <a-icon :type="um.icon"/>
              {{ um.desc }}
            </router-link>
          </a-menu-item>
          <a-menu-item key="logout" @click="logout()">
            <a-icon type="logout"/>
            账户登出
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="main">
          <span slot="title">
            <a-icon type="laptop"/>公共菜单
          </span>
          <a-menu-item v-for="menu in menus" :key="menu.key+'pc'" :disabled="menu.disable">
            <router-link :to="menu.key">{{ menu.desc }}</router-link>
          </a-menu-item>
          <a-menu-item key="search">
            <a-input-search style="width:100px" placeholder="搜索...." @search="onSearch"/>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </aside>
  </transition>
</template>
<script>
import {mapGetters, mapState} from 'vuex'
import Category from "@/assets/js/Category";

export default {
  name: 'TheAside',
  data() {
    return {
      menus: Category.publicMenus,
      userMenus: Category.userMenus
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(`user/logout`, this)
    },
    // TODO 搜索未实现
    onSearch(value) {
      console.log(value)
    },
    colorSider() {
      this.$store.commit('updateSider', false)
    },
  },
  computed: {
    ...mapState(['theme']),
    ...mapGetters({login: 'user/login', avatar: 'user/avatar'}),
    // v-model 与vuex的结合使用
    currentMenu: {
      get() {
        return this.$store.state.currentMenu
      },
      set(newVal) {
        this.$store.commit('handleCurrentMenu', newVal)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
aside {
  // 侧边栏
  z-index: 1050;
  position: fixed;
  height: 100%;
  width: 225px;
  margin-top: 60px;

  > .ant-menu {
    height: 100%;
  }
}
</style>