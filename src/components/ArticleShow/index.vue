<template>
  <article>
    <h1 class="title">{{ article.title }}</h1>
    <article-meta-info
      v-if="showInfo"
      :date="article.gmtCreate"
      :tags="article.tags"
      :pv="article.pv"
      :comments="article.comments"
      :likes="article.likes"
    />
    <article-user-info
      v-if="showInfo"
      :uid="article.uid"/>
    <mavon-editor
      class="content"
      v-model="article.content"
      :toolbarsFlag="false"
      defaultOpen="preview"
      :subfield="false"
      ref="mavon"
    />
  </article>
</template>

<script>
import ArticleMetaInfo from '@/components/ArticleShow/Metainfo.vue'
import ArticleUserInfo from '@/components/ArticleShow/Userinfo.vue'

export default {
  name: 'ArticleMain',
  components: {ArticleMetaInfo, ArticleUserInfo},
  props: {
    article: {
      type: Object,
      required: true,
    },
    showInfo: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },

}
</script>

<style lang="scss" scoped>
article {
  position: relative;
  //border: 1px solid red;

  > .title {
    font-weight: bold;
    padding-left: 5px;
    margin-bottom: 5px;
    border-left: 3px solid blueviolet;
  }

  > .content {
    margin-top: -5px;
    box-shadow: none !important;
  }
}

.v-note-wrapper {
  z-index: 10;
}

::v-deep .v-show-content {
  padding: 5px 10px !important;
}
</style>