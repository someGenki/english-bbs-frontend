<template>
  <div v-if="show" id="account">
    <y-item :fieldFloat="true" :data="avatar">
      <template v-slot:show>
        <a-avatar :src="userAvatar" shape="square" :size="80" icon="user" />
      </template>
      <template v-slot:operation>
        <a-upload
          :before-upload="beforeUpload"
          :show-upload-list="false"
          :custom-request="function(){}"
          @change="handleUploadChange"
        >
          <a-button type="primary">更换头像</a-button>
        </a-upload>
      </template>
    </y-item>
    <y-item
      v-for="(i,index) in info"
      :key="i+index"
      :data="i"
      :editable="i.editable"
      v-show="!i.noshow"
    ></y-item>
    <cropper-modal :cropWidth="200" :cropHeidht="200" @ok="handleOK" ref="cropperModal" />
  </div>
</template>

<script>
import yItem from '@/components/EditableItem/index.vue'
import cropperModal from '@/components/CropperModal/index.vue'
import loginVue from '../../signin/components/login-form.vue'
import { dataURLtoFile } from '@/utils/common.js'
const accountExplains = [
  {
    english: 'username',
    chineses: '用户名',
    editable: false,
  },
  {
    english: 'nickname',
    chineses: '昵称',
    editable: false,
  },
  {
    english: 'point',
    chineses: '积分',
    editable: false,
  },
  {
    english: 'email',
    chineses: '邮箱',
    editable: false,
  },
]
export default {
  name: 'AccountInfo',
  components: {
    yItem,
    cropperModal,
  },
  data() {
    return {
      userAvatar: this.$store.state.user.avatar || null,
      // 上传背景图的请求路径
      avatar: {
        values: this.$store.state.user.avatar,
        chinese: '头像',
        english: 'avatar',
        editable: false,
        remark: '展示不能展示gif图',
      },
      tmpImgName: '', // 记录上传头像的名字
      info: [], // 用户账号信息数组
      show: false,
    }
  },
  mounted() {
    for (let i = 0; i < accountExplains.length; i++) {
      let obj = {}
      obj.value = this.$store.state.user[accountExplains[i].english]
      obj.english = accountExplains[i].english
      obj.chinese = accountExplains[i].chineses
      obj.editable = accountExplains[i].editable
      this.info[i] = obj
    }
    this.show = true
  },
  methods: {
    // 选择文件且beforeUpload=true 后会调用这个
    handleUploadChange(info) {
      // 这个函数回调的参数是个File对象,所以要用FileReader将对象转换成 data-uri 对象
      let reader = new FileReader()
      const _this = this
      reader.onload = function (e) {
        // e.target.result 该属性表示目标对象的DataURL
        // 然后调用cropperModal的edit方法使得对话框可见
        _this.$refs['cropperModal'].edit(e.target.result)
      }
      this.tmpImgName = info.file.name
      reader.readAsDataURL(info.file.originFileObj)
    },
    // 文件校验
    beforeUpload(file) {
      let fileType = file.type
      console.log(file.type)
      if (fileType.indexOf('image') < 0) {
        this.$message.warning('请上传图片')
        return false
      }
    },
    handleOK(data) {
      let file = dataURLtoFile(data, this.tmpImgName)
      this.$api.uploadAvatar(file).then((res) => {
        if (res.code === 200) {
          this.userAvatar = res.data
          this.$store.commit('user/updateAccount', {
            field: 'avatar',
            val: this.userAvatar,
          })
          this.$message.success('上传头像成功!')
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#account {
  max-width: 700px;
}
.ant-avatar {
  border: 3px solid #ebe0e0;
  border-radius: 10px;
}
</style>