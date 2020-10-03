<template>
  <!--  <div>
      <article-show v-if="article" :article="article"/>
    </div>-->
  <!--  <a-row class="article">
      <a-col :span="big?18:24" @dblclick.capture="getWord($event)">
        <article-show v-if="article" :article="article"/>
      </a-col>
      <a-col v-show="big" :span="6">
        <div class="sticky">
          <Catalogue :selector="'.v-show-content'" v-if="article"/>
        </div>
      </a-col>
    </a-row>-->
  <div class="article" @dblclick.capture="getWord($event)">
    <article-show v-if="article" :article="article"/>
  </div>
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
      this.article = res.data
    })
  },
  methods: {
    getWord() {
      let sText =
        document.selection === undefined
          ? document.getSelection().toString()
          : document.selection.createRange().text
      sText = sText.trim()
      if (sText !== '') {
        if (sText.length > 20) sText = sText.substr(0, 20);
        this.$api.translate(sText).then(res => {
          console.log(res)
          this.$notification.open({
            message: '翻译结果（自动检测语言）',
            description: sText + ' ： ' + res.trans_result[0].dst,
            btn: h => {
              return h(
                'a-button',
                {
                  props: {
                    type: 'dashed',
                    size: 'small',
                    icon: 'plus-circle',
                  },
                  on: {
                    click: () => {
                      this.$message.warning("开发中，请等待~")
                    },
                  },
                },
                '加入单词本',
              );
            },
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  max-width: 800px;
  margin: 20px auto;
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