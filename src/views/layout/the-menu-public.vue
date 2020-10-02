<template>
  <!-- pc用 一个logo+公共菜单 -->
  <a-col
    type="flex"
    role="comm-menu"
    align="center"
    :xs="0"
    :sm="0"
    :md="0"
    :lg="16"
    :xl="18"
    :xxl="16"
  >
    <a-menu :theme="theme" mode="horizontal" v-model="currentMenu">
      <a-menu-item key="no1" style="border:none">
        <a href="/" class="logo">
          <img src="@/assets/images/logo.png" alt/>
        </a>
      </a-menu-item>
      <a-menu-item v-for="menu in menus" :key="menu.key+'pc'" :disabled="menu.disable">
        <router-link :to="menu.key">{{ menu.desc }}</router-link>
      </a-menu-item>
      <a-menu-item class="nobg" key="search" @click="handleClick">
        <a-input-search style="width:100px" placeholder="搜索...." @click.stop="e=>{}" @search="onSearch"/>
      </a-menu-item>
    </a-menu>
  </a-col>
</template>

<script>
import {mapState} from 'vuex'
import Category from "@/assets/js/Category";

export default {
  name: 'TheMenuPublic',
  data() {
    return {
      menus: Category.publicMenus
    }
  },
  methods: {
    // TODO 搜索未实现
    onSearch(value) {
      console.log(value)
    },
    handleClick($event) {
      $event
    },
  },
  computed: {
    ...mapState(['theme']),
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
.ant-menu-item ::v-deep.ant-input-suffix {
  i {
    color: black !important;
  }
}
</style>