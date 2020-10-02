<template>
  <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
    <template #extra>
      <a-button type="primary" @click="$router.go(-1)">go back</a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>
