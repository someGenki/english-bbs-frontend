<template>
  <a v-show="url&&isFetch" class="base-attachment" :href="url" :download="'fanyibar'" target="_blank">
    <a-icon class="base-icon" type="inbox"/>
    <a-tooltip
      :title="'文件大小：'+fileInfo.fileSize/1000+'KB，   上传时间：'+fileInfo.gmtCreate">
      <span class="attachment-info">文件名：{{ fileInfo.originalFileName }}，类型：{{ fileInfo.fileSuffix }}，下载所需积分：0点</span>
    </a-tooltip>
  </a>
</template>

<script>
export default {
  name: 'BaseAttachment',
  props: {
    url: {
      type: String,
    },
    info: Object, // 附件的其他信息，先保留用
  },
  data() {
    return {
      isFetch: false,
      fileInfo: {}
    }
  },
  created() {
    this.$api.getAttachmentInfo(this.url).then(res => {
      this.fileInfo = res.data
      this.isFetch = true
    })
  },
}
</script>

<style lang="scss" scoped>
.base-attachment {
  display: inline-block;
  border-radius: 4px;
  box-shadow: 2px 2px 4px 0px #604f4f;
  margin: 15px 5px;
  padding-right: 10px;
  min-height: 50px;
}

.base-icon {
  font-size: 3rem;
  color: #40a9ff;
}

.attachment-info {
  font-size: 16px;

}
</style>