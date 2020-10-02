<template>
  <div class="article-card">
    <div class="article-main">
      <router-link :to="'/article/'+article.id"><h2>{{ article.title }}</h2></router-link>
      <p>{{ article.description }}</p>
    </div>
    <img class="article-pic" :src="article.firstPic" alt="">
    <div class="article-bar">
      <span class="date">{{ moment(article.gmtCreate).format("YYYY年MM月DD日") }}</span>
      <a-tag class="difficulty" :color="difficultyColor">
        {{ difficultyText }}
      </a-tag>
      <span class="pv"><a-icon type="eye"/>{{ '  ' + article.pv }}</span>
    </div>
    <silk-ribbon v-if="article.uid===1" :pattern="4" :content="'来自管理员'"/>
  </div>
</template>

<script>
import moment from 'moment'
import SilkRibbon from "@/components/SilkRibbon/index";

export default {
  name: "article-card",
  components: {SilkRibbon},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      moment,
    }
  },
  computed: {
    difficultyColor() {
      switch (this.article.difficulty) {
        case 1:
          return 'cyan'
        case 2:
          return 'green'
        case 3:
          return 'pink'
        default :
          return 'red'
      }
    },
    difficultyText() {
      switch (this.article.difficulty) {
        case 1:
          return '小学水平'
        case 2:
          return '中学水平'
        case 3:
          return '大学水平'
        default :
          return '商务水平'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/mixins/_yichu.scss';

.article-card {

  border-bottom: 1px solid ghostwhite;
  border-radius: 5px;

  padding: 10px 5px;
  height: 130px;

  display: flex;
  position: relative;
}

.article-main {
  flex: 1;
  padding: 0 20px;

  > h2 {
    @include ellipsis(1);
    font-weight: bold;
  }

  > p {
    @include ellipsis(2);
  }
}

.article-pic {
  height: 100px;
}

.article-bar {
  position: absolute;
  bottom: 3px;
  left: 25px;

  color: gray;

  > * {
    margin-right: 15px;
  }
}
</style>