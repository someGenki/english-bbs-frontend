<template>
  <div>
    <a-input
      size="large"
      :maxLength="64"
      allowClear
      required
      v-model="form.title"
      class="title"
      placeholder="请输入帖子标题"
    >
      <span class="title-length" slot="suffix">长度：{{ form.title.length }}/64</span>
    </a-input>
    <mavon-editor
      style="height:450px;z-index:1000"
      :boxShadow="false"
      :navigation="false"
      v-model="form.content"
      @imgAdd="$imgAdd"
      ref="md"
    />
    <a-divider/>
    <a-radio-group v-model="form.category" button-style="solid">
      <span class="choose">选择一个分类/Categories：</span>
      <a-radio-button value="default">默认/default</a-radio-button>
      <a-radio-button value="discuss">讨论/discuss</a-radio-button>
      <a-radio-button value="question">提问/question</a-radio-button>
      <a-radio-button value="share">分享/share</a-radio-button>
      <a-radio-button disabled value="other">其他/other</a-radio-button>
    </a-radio-group>
    <div class="tag-group">
      <span class="choose">为帖子添加标签：</span>
      <a-tag
        :key="tag"
        v-for="(tag, index) in tags"
        closable
        @close="() => handleClose(tag)"
      >{{ tag }}
      </a-tag>
      <a-input
        v-if="inputVisible"
        ref="input"
        type="text"
        size="small"
        :style="{ width: '78px' }"
        :value="inputValue"
        @change="handleInputChange"
        @blur="handleInputConfirm"
        @keyup.enter="handleInputConfirm"
      />
      <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
        <a-icon type="plus"/>
        New Tag
      </a-tag>
    </div>
    <a-upload-dragger
      @change="handleChange"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :action="uploadUrl"
      :headers="headers"
      ref="fu"
    >
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox"/>
      </p>
      <p class="ant-upload-text">给帖子上传一个附件</p>
      <p class="ant-upload-hint">由于服务器的带宽过细的原因，文件大小不能超过10MB</p>
    </a-upload-dragger>
    <div class="btm-group">
      <a-button @click="commit">发布</a-button>
      <a-button @click="temporaryStorage">暂存</a-button>
      <a-button @click="cancel">取消</a-button>
    </div>
    <a-alert v-show="tipsText" closable :message="tipsText" :type="tipsType" show-icon/>
  </div>
</template>

<script>
import {isEmpty} from '@/utils/check'
import moment from 'moment'

export default {
  name: "post-editor",
  data() {
    return {
      moment,
      isEmpty,
      tipsText: '', // 提示文本
      tipsType: 'success', // 提示类型
      tags: [], // 标签数组
      inputVisible: false, // 动态增加标签相关
      inputValue: '',// 动态增加标签相关
      // 上传文件的请求路径 TODO 这里是写死的
      uploadUrl: 'http://fanyibar.top:8086/upload/file',
      // 请求头
      headers: {
        Authorization: this.$store.state.user.token,
      },
      fileList: [],// 文件列表
      form: {
        title: '',
        content: '',
        category: 'default',
        tags: '',
      },
    }
  },
  mounted() {
    // 每隔5分钟自动保存
    setInterval(() => {
      this.temporaryStorage(null, true)
    }, 300000)

    // 可以弄成打开时选择性的恢复草稿（就是给用户选择）
    if (!this.isEmpty(localStorage.getItem('tempEdit'))) {
      let temp = JSON.parse(localStorage.getItem('tempEdit'))
      this.tags = temp.ttags
      this.form = temp.tform
      this.fileList = temp.tfileList
    }
  },
  methods: {

    // 发布
    commit() {
      const _this = this
      if (_this.form.title && _this.form.content) {
        this.$confirm({
          title: '是否要发布这篇帖子吗',
          content:
            '请确保发表的帖子遵守互联网协议，若存在敏感词将被自动过滤！\n且低质量或无意义的帖子将被管理员删除',
          onOk() {
            _this.form.tags = _this.tags.join('-')
            try {
              if (!_this.isEmpty(_this.fileList[0].url))
                _this.form.attachment = _this.fileList[0].url
            } catch (e) {
            }
            console.log(_this.form)
            _this.$api.commitPost(_this.form).then((res) => {
              if (res.code !== 200) {
                this.tipsText = res.msg
                this.tipsType = 'error'
              } else {
                _this.$router.push('succ')
                localStorage.removeItem('tempEdit')
                // 成功跳转 。。。
              }
            })
          },
          onCancel() {
          },
        })
      } else {
        this.tipsText = '标题/内容是必须项'
        this.tipsType = 'warning'
      }
    },
    // 暂存
    temporaryStorage($event, isAuto = false) {
      if (!this.form.title) {
        // 如果是计时器自动调用的，且没有设置标题，就不暂存
        if (isAuto) return
        this.tipsText = '请先撰写标题再暂存'
        this.tipsType = 'warning'
        return
      }
      let storage = {
        tform: this.form,
        ttags: this.tags,
        tfileList: this.fileList,
      }
      localStorage.setItem('tempEdit', JSON.stringify(storage))
      let time = this.moment().format('YYYY-MM-DD HH:mm:ss')
      this.tipsText = '暂存成功⏱' + time
      this.tipsType = 'success'
    },
    // 取消
    cancel() {
      // 应该弹出对话提示框
      localStorage.removeItem('tempEdit')
      this.$router.push('index')
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      if (this.$store.getters['user/login'] === false) {
        return this.$message.warning('传图片需要登录')
      }
      this.$api.uploadImage($file).then(res => {
        console.log(res)
        this.$refs.md.$img2Url(pos, res.data);
      })
    },

// 关闭标签 过滤重复的
    handleClose(removedTag) {
      this.tags = this.tags.filter((tag) => tag !== removedTag)
    },
// 展示输入框
    showInput() {
      this.inputVisible = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
    },

// 监听输入变化
    handleInputChange(e) {
      this.inputValue = e.target.value
    },

// 完成输入
    handleInputConfirm() {
      const inputValue = this.inputValue
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
      })
    },

    test() {
      console.log(this.fileList)
      console.log(this.fileList.url)
    }
    ,

// 上传前提示用户,并且限制文件类型大小
    beforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('文件大小不能超过10MB,请重新选择')
        this.$nextTick(() => {
          this.fileList = []
          this.$refs.fileUpload = []
        })
      }
      return isLt10M
    }
    ,
// 监听上传变化
    handleChange(info) {
      console.log('--change--')
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1)
      // read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data
        }
        return file
      })
      this.fileList = fileList
    }
    ,
  },
}
</script>

<style lang="scss" scoped>

.title {
  .ant-input {
    height: 40px;
    font-size: 30px;
    border: 0;
  }

  .title-length {
    color: #bebcbc;
  }
}

.tag-group {
  min-height: 60px;
  margin-top: 20px;

}

.btm-group {
  margin-top: 20px;
  margin-bottom: 20px;

  > * {
    margin-right: 20px;
    color: white;
    font-weight: bold;
    background: #00a896;
  }
}

.choose {
  color: black;
  padding: 5px;
  margin: 5px;
}

.ant-tag {
  cursor: pointer;
}

.ant-radio-button-wrapper {
  border: 0;
  margin-right: 10px;
  border-radius: 7px;
}

.ant-radio-button-wrapper:not(:first-child)::before {
  content: none;
}

.ant-radio-group-solid
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
  background: #90bcff !important;
}


</style>