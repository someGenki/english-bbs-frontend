<template>
  <!--  <div>
      <article-show v-if="article" :article="article"/>
    </div>-->
  <a-row class="article">
    <a-col :span="big?18:24">
      <article-show v-if="article" :article="article"/>
    </a-col>
    <a-col v-show="big" :span="6">
      <div class="sticky">
        <Catalogue :selector="'.v-show-content'" v-if="article"/>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import ArticleShow from '@/components/ArticleShow'
import Catalogue from '@/components/Catalogue'

export default {
  name: "detail.vue",
  components: {
    ArticleShow, Catalogue
  },
  data() {
    return {
      aid: this.$route.params.aid,
      article: null,
      big: true,
    }
  },
  created() {
    let width = document.body.clientWidth
    if (width < 993) this.big = false
    this.$api.getArticle(this.aid).then(res => {
      console.log(res)
      this.article = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.article {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.sticky {
  overflow: hidden;
  margin-left: 30px;

  > * {
    margin-bottom: 20px;
  }
}

</style>