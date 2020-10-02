<template>
  <a-result
    status="500"
    title="400"
    sub-title="Sorry, Request syntax error, server cannot understand"
  >
    <template #extra>
      <h3 v-show="msg">error message:{{msg}}</h3>
      <a-button type="primary" @click="$router.go(-1)">go back</a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  data() {
    return {
      msg: '',
    }
  },
  mounted() {
    this.msg = this.$route.params.msg
    console.log(this.$route)
    console.log('msg' + this.msg)
  },
}
</script>
