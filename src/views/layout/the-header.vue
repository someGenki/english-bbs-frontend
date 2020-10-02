<template>
  <header>
    <!-- 临时解决: 内部根据界面大小展示  -->
    <mobile-header />
    <public-menu />
    <user-menu />
  </header>
</template>

<script>
import MobileHeader from './the-header-mobile.vue'
import PublicMenu from './the-menu-public.vue'
import UserMenu from './the-menu-user.vue'
export default {
  name:'TheHeader',
  components: {
    MobileHeader: MobileHeader,
    PublicMenu: PublicMenu,
    UserMenu: UserMenu,
  },
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  z-index: 1001;
  width: 100%;
  height: 64px;
  box-shadow: 0px 3px 5px 0px #dccfcf;
}
</style>