<template>
  <div :style="{backgroundColor:$store.state.bgColor}" id="home">
    <my-header/>
    <my-aside/>
    <main>
      <transition :enter-active-class="getMainAnimate">
        <router-view/>
      </transition>
    </main>
    <my-footer/>
  </div>
</template>
<script>
import MyHeader from '@/views/layout/the-header.vue'
import MyAside from '@/views/layout/the-aside.vue'
import MyFooter from '@/views/layout/the-footer.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'home',
  components: {
    MyHeader: MyHeader,
    MyAside: MyAside,
    MyFooter: MyFooter,
  },
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('user/info', this)
  },
  computed: {
    ...mapGetters(['getMainAnimate']),
  },
}
</script>
<style lang="scss" scoped>

main {
  padding: 70px 10px 0;
}
</style>