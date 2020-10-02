<template>
  <a-result status="success" title="以成功将帖子发布" sub-title="预计审核时间‘0’秒（没有人审核）">
    <template #extra>
      <a-button @click="$router.push('index')" key="console" type="primary">回到首页</a-button>
      <a-button @click="$router.go(-1)" key="buy">再次操作</a-button>
    </template>
  </a-result>
</template>
<script>
// TODO 将结果页面进行整合
export default {
  data() {
    return {
      msg: '',
    }
  },
}
</script>