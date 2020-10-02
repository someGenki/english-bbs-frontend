<template>
  <a-modal
      :visible="visible"
      title="请裁剪图片"
      :maskClosable="false"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      @ok="handleOk"
  >
    <div class="cropper-wrapper">
      <vue-cropper
          ref="cropper"
          :img="img"
          :info="true"
          :original="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
      ></vue-cropper>
    </div>
  </a-modal>
</template>

<script>
import {VueCropper} from 'vue-cropper'

export default {
  name: 'CropperModal',
  components: {
    VueCropper,
  },
  props: {
    // 裁剪框(截图框)的大小
    cropWidth: {type: Number, default: 200},
    cropHeight: {type: Number, default: 200},
  },
  data() {
    return {
      // ant-modal相关配置
      visible: false,
      confirmLoading: false,
      // vue-cropper相关配置
      img: null, //要裁剪的图像资源 可选项: url地址 || base64 || blob
      options: {
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: 200, //默认生成截图框宽度
        autoCropHeight: 200, //默认生成截图框高度
        fixedBox: true, //固定截图框大小 不允许改变
      },
    }
  },
  created() {
    this.options.autoCropWidth = this.cropWidth
    this.options.autoCropHeight = this.cropHeight
  },
  methods: {
    // 调用此方法需传入一个 [url地址 || base64 || blob]
    // 父组件调用: this.$refs['cropperModal'].edit(参数)
    edit(image) {
      this.img = image
      this.visible = true
    },
    // 监听对话框的OK/Cancel按钮的点击事件
    handleOk() {
      const that = this
      that.confirmLoading = true
      // 获取截图的base64 数据
      // getCropBlob获取二进制数据
      this.$refs.cropper.getCropData((data) => {
        //将裁剪侯后的图片对象射给**父组件**,然后关闭对话框
        that.$emit('ok', data)
        that.handleCancel()
      })
    },
    handleCancel(e) {
      this.visible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.cropper-wrapper {
  width: 100%;
  height: 400px;

  ::v-deep .cropper-crop-box {
    border-radius: 0 !important;
  }
}
</style>