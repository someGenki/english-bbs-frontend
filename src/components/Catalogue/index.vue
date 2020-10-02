<template>
  <a-anchor v-if="catalogue" :target-offset="targetOffset" :affix="true" :offsetTop="80">
    <a-anchor-link v-for="cc in catalogue" :key="cc.toId" :href="cc.toId" :title="cc.toTitle">
      <a-anchor-link v-for="c in cc.children" :key="c.toId" :href="c.toId" :title="c.toTitle"/>
    </a-anchor-link>
  </a-anchor>
</template>

<script>
/*
 参考：https://blog.csdn.net/weixin_34096182/article/details/88862551
 由于不用组件渲染顺序不同，可能要设置v-if再数据完成后渲染
 HTML DOM Element https://www.w3school.com.cn/jsref/dom_obj_all.asp
 https://blog.csdn.net/Zhooson/article/details/100160935

 目前只支持h2,h3
 */
export default {
  name: "Catalogue",
  props: {
    selector: String,// 要选择生成目录的范围
  },
  data() {
    return {catalogue: [], targetOffset: undefined}
  },
  mounted() {
    this.targetOffset = window.innerHeight / 2;
    this.$nextTick(() => {
      this.catalogue = this.createCatalogue();
    })
  },
  methods: {

    createCatalogue(selectors = '.v-show-content') {
      let arr = Array.from(document.querySelector(selectors).querySelectorAll("h2,h3"))
      let anchors1 = arr.map(element => {
        return {
          type: element.localName,
          toId: '#' + element.childNodes[0].id,
          toTitle: element.childNodes[1].data,
          children: []
        }
      })
      let tmp2 = null;
      let anchors = []
      // 目录层级化
      for (let i = 0; i < anchors1.length; i++) {
        if (anchors1[i].type === 'h3' && tmp2 !== null) {
          tmp2.children.push(anchors1[i])
          continue;
        }
        if (anchors1[i].type === 'h2') {
          tmp2 = anchors1[i];
        }
        anchors.push(anchors1[i])
      }
      return anchors;
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .ant-anchor-wrapper {
  padding-left: 8px ;
}
</style>