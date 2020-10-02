<template>
  <!-- pc用 一个发帖按钮 2个消息相关menu-item和用户菜单 -->
  <a-col type="flex" align="center" :xs="0" :sm="0" :md="0" :lg="8" :xl="6" :xxl="8">
    <a-menu :theme="theme" mode="horizontal" v-model="currentMenu">
      <a-button @click="$router.push('/editor')" type="primary">
        发帖
        <a-icon type="edit"/>
      </a-button>
      <a-menu-item key="/notice" v-if="login">
        <!-- TODO 根据消息条数==0 设置颜色 -->
        <a-tooltip placement="bottom" title="通知消息">
          <router-link to="/notice">
            <a-icon :style="{ fontSize: '18px' }" type="bell"/>
          </router-link>
        </a-tooltip>
      </a-menu-item>
      <a-menu-item key="/talk" v-if="login">
        <!-- TODO 动态绑定样式,websocket连接不成功为红色,且不然点 -->
        <a-tooltip placement="bottom" title="通知消息">
          <router-link to="/talk">
            <a-icon :style="{ fontSize: '18px' }" type="message"/>
          </router-link>
        </a-tooltip>
      </a-menu-item>
      <!-- 用户登陆时存在的下拉列表 -->
      <a-sub-menu key="/user" v-if="login">
<!--        <img class="avatar" slot="title" :src="avatar" alt/>-->
        <a-avatar  slot="title" :src="avatar" :size="40"  />
        <a-menu-item-group title="个人相关">
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
        </a-menu-item-group>
        <a-menu-item-group title="帖子/翻译/文章">
          <a-menu-item key="/collections">
            <router-link to="/collections">
              <a-icon type="heart"/>
              我的收藏夹
            </router-link>
          </a-menu-item>
          <!-- TODO 改造成router-link -->
          <a-menu-item key="/user-post">
            <a-icon type="file"/>
            发布的帖子
          </a-menu-item>
          <a-menu-item key="/user-article">
            <a-icon type="file"/>
            发布的文章
          </a-menu-item>
          <a-menu-item key="/user-tran">
            <a-icon type="file"/>
            发布的翻译
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="/signin" v-else>
        <router-link to="/signin">
          <a-icon type="login"/>
          登录/注册
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-col>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import Category from "@/assets/js/Category";

export default {
  name: 'TheMenuUser',
  data() {
    return {
      userMenus: Category.userMenus
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(`user/logout`, this)
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
.ant-menu {
  font-size: 16px;
  line-height: 64px;
}
</style>