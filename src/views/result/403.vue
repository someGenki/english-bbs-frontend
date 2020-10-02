<template>
  <!-- 请求的资源不允许访问。就是说没有权限。 -->
  <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
    <template #extra>
      <a-button type="primary" @click="$router.go(-1)">go back</a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  data() {
    return {  }
  },
}
</script>