<template>
  <div id="read">
    <a-alert
      message="暂时就不分页查询了。。。"
      banner
      closable
    />
    <article-card v-for="article in articles" :key="article.id" :article="article"/>

  </div>
</template>

<script>
import articleCard from '@/views/read/components/article-card'

export default {
  name: 'rank',
  components: {
    articleCard
  },
  data() {
    return {
      articles: []
    }
  },
  created() {
    this.$api.getArticleList().then(res => {
      this.articles = res.data.records
      console.log(res)
    })
  }
}
</script>

<style>
#read {
  height: 100%;
  max-width: 1000px;
  margin: auto;
}
</style>