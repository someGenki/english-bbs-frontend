<template>
  <div>
    <a-skeleton :loading="loading" active/>
    <div v-if="!loading">
      <dynamic-card v-for="d in dynamics" :key="dynamics.id" :dynamic="d"/>
    </div>
    <a-empty v-show="!loading&&dynamics.length<1" />
  </div>
</template>

<script>
import DynamicCard from '@/views/user/components/dynamic-card.vue'

export default {
  name: "user-dynamic",
  props: {
    // 要浏览用户的动态
    uid: {type: String, default: '-1'},
  },
  components: {
    DynamicCard,
  },
  data() {
    return {
      loading: true,
      dynamics: [],
    }
  },
  created() {
    this.$api.getUserDynamic(this.uid).then(res => {
      this.dynamics = res.data;
      this.loading = false
    })
  }
}
</script>

<style scoped lang="scss">

</style>