<template>
  <div class="publish">
    <silk-ribbon
      :pattern="1"
      :content="'切换'"
      :tooltip="'切换到另一个编辑器'"
      @click="handleClick"
    />
    <a-alert v-show="!$store.getters['user/login']" message="建议登陆后在进行编辑" closable/>
    <transition :enter-active-class="'animate__animated animate__fadeIn'">
      <keep-alive>
        <post-editor v-if="!toggle" key="post-editor"/>
        <article-editor v-else key="article-editor"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import SilkRibbon from '@/components/SilkRibbon'
import PostEditor from "@/views/editor/post-editor";
import ArticleEditor from "@/views/editor/article-editor";

export default {
  name: 'publish',
  components: {ArticleEditor, PostEditor, SilkRibbon},
  data() {
    return {
      toggle: false
    }
  },
  methods: {
    handleClick() {
      console.log('click')
      this.toggle = !this.toggle
    }
  }
}
</script>

<style lang="scss" scoped>
.publish {
  width: 1200px;
  min-height: 1000px;

  position: relative;
  margin: 10px auto;
  padding: 20px;

  //border: 1px solid palegoldenrod;
}


</style>