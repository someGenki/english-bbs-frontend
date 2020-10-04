<template>
  <!-- 没有提供认证信息。请求的时候没有带上 Token 或者token失效了等。 -->
  <a-result status="403" title="401" sub-title="Sorry,This operation requires a token">
    <template #extra>
      <!-- 可以来个去signin的链接 -->
      <h3 v-show="msg">error message:{{msg}}</h3>
      <a-button type="primary" @click="reLogin">重新登录</a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  data() {
    return { msg: '' }
  },
  mounted() {
    this.msg = this.$route.params.msg
    console.log(this.$route)
    console.log('msg' + this.msg)
  },
  methods:{
    reLogin(){
      this.$store.dispatch(`user/logout`, this);
    }
  }
}
</script>