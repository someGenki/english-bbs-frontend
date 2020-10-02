<template>
  <div id="app" class="white">
    <a-back-top />
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    try {
      document.body.removeChild(document.getElementById('Loading'))
    } catch (e) {}
  },
}
</script>

<style >
</style>
