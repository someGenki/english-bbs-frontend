<template>
  <div class="meta-info">
    <div v-if="tagList" class="tags">
      标签
      <a-icon type="tags"/>
      :
      <a-tag v-for="(i,index) in tagList" :key="i+'tag'+index+1" :color="i.color">{{ i.tag }}</a-tag>
    </div>
    <div class="other">
      <span class="date">{{ date.substr(0, 10) }}</span>
      <span class="pv">
        <a-icon type="eye"/>
        <span class="val">{{ pv }}</span>
      </span>
      <span v-if="likes" class="likes">
        <a-icon type="like"/>
        {{ likes }}
      </span>
      <span v-if="comments">
        <a-icon type="message"/>
        <span class="val">{{ comments }}</span>
      </span>
      <span>
        <a-icon type="heart"/>
        <span class="val">13</span>
      </span>
    </div>
  </div>
</template>

<script>
import {getStrColor} from '@/utils/process.js'

export default {
  name: 'MetaInfo',
  props: {
    tags: String || Array,
    date: String,
    pv: Number,
    comments: Number,
    likes: Number,
  },
  data() {
    return {getStrColor}
  },
  created() {
  },
  computed: {
    tagList() {
      return this.tags.split('-').filter((element, index, self) => {
        return element.length > 1 && self.indexOf(element) === index
      }).map(x => {
        return {
          tag: x,
          color: this.getStrColor(x)
        }
      })
    },
  },
}
// 好像还有个收藏数量没弄
</script>

<style lang="scss" scoped>
.meta-info {
  // border: 1px solid red;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .val {
    margin: 0 6px;
  }

  .date {
    margin-right: 5px;
  }
}
</style>