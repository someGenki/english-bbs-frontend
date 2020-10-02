<template>
  <div class="ad animate__animated" :class="!this.showAd?'animate__zoomOut':''">
    <span class="closed-ad" @click="handlerClosedAd"><a-icon type="close"/></span>
    <img :src="adPost" width="100%" alt="" @click="jumpAdPage"/>
    <a id="ad-href" :href="adHref" target="_blank"></a>
  </div>
</template>

<script>
// TODO: 广告相关数据从后台获取
export default {
  name: "index.vue",
  props: {},
  data() {
    return {
      showAd: true,
      adPost: '',
      adHref: '',
    }
  },
  created() {
    this.adPost = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601012615380&di=c9fc8cbb4834693c3465fcfc0f61aff5&imgtype=0&src=http%3A%2F%2Fimg.51miz.com%2FTemplet%2F00%2F22%2F55%2F78%2F225578_7599902e39718dfcc551aba6118dbf53.jpg%2521%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue%2Ffw%2F840"
    this.adHref = "https://www.baidu.com"
  },
  methods: {
    handlerClosedAd() {
      this.showAd = false

    },
    jumpAdPage() {
      document.getElementById('ad-href').click()
    }
  }
}
</script>

<style lang="scss" scoped>
.ad {
  position: relative;
  margin-top: 10px;
  width: 100%;
  //border: 1px solid #40a9ff;
}


.closed-ad {
  position: absolute;
  font-size: 1.1rem;
  top: -11px;
  right: -9px;
  height: 20px;
  line-height: 20px;

  border: 1px dashed #333;
  border-radius: 5px;

  &:hover {
    top: 25px;
    right: 35px;
  }
}
</style>