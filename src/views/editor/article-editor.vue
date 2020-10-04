<template>
  <div>
    <a-input
      size="large"
      :maxLength="64"
      allowClear
      required
      v-model="form.title"
      class="title"
      placeholder="请输入文章标题"
    >
      <span class="title-length" slot="suffix">长度：{{ form.title.length }}/64</span>
    </a-input>
    <mavon-editor
      style="height:450px;z-index:1000"
      :boxShadow="false"
      :navigation="false"
      v-model="form.content"
      @imgAdd="imgAdd"
      ref="md"
    />
    <a-divider/>
    <a-textarea
      v-model="form.description"
      placeholder="添加一段描述，用于展示"
      :maxLength="128"
      :auto-size="{ minRows: 3, maxRows: 5 }"
    />
    <div class="tag-group">
      <span class="choose">为文章添加标签：</span>
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

    <div class="difficulty">
      <span>文章的阅读难度水平：</span>
      <a-select v-model="form.difficulty" style="width: 120px">
        <a-icon slot="suffixIcon" type="smile"/>
        <a-select-option value="1">
          小学水平
        </a-select-option>
        <a-select-option value="2">
          初中水平
        </a-select-option>
        <a-select-option value="3">
          高中水平
        </a-select-option>
        <a-select-option value="4">
          大学水平
        </a-select-option>
      </a-select>
    </div>
    <div class="first-picture">
      <a-tooltip placement="topLeft" title="添加首图">
        <a-upload
          name="file"
          list-type="picture-card"
          :show-upload-list="false"
          :action="uploadUrl"
          :headers="headers"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="form.firstPic" :src="form.firstPic" alt="avatar"/>
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'"/>
            <div class="ant-upload-text">
              设置首图
            </div>
          </div>
        </a-upload>
      </a-tooltip>
    </div>
    <div class="btm-group">
      <a-button @click="commit">发布</a-button>
      <a-button @click="cancel">取消</a-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "article-editor",
  data() {
    return {
      tipsText: '', // 提示文本
      tipsType: 'success', // 提示类型
      tags: [], // 标签数组
      inputVisible: false, // 动态增加标签相关
      inputValue: '',// 动态增加标签相关
      loading: false,
      // 临时写法。。。
      uploadUrl: 'http://fanyibar.top:8086/upload/file',
      // 请求头
      headers: {
        Authorization: this.$store.state.user.token,
      },
      form: {
        title: '',
        content: '',
        tags: '',
        description: '',
        firstPic: "",
        difficulty: '1',
      },
    }
  },
  methods: {
    // 发布
    commit() {
      const _this = this
      if (_this.form.title && _this.form.content) {
        this.$confirm({
          title: '是否要发布这篇文章吗',
          content:
            '请确保发表的文章遵守互联网协议，并且注意授权问题，若存在敏感词将被自动过滤！且低质量或无意义的帖子将被管理员删除',
          onOk() {
            _this.form.tags = _this.tags.join('-')
            console.log(_this.form)
            _this.$api.commitArticle(_this.form).then((res) => {
              if (res.code !== 200) {
                this.tipsText = res.msg
                this.tipsType = 'error'
              } else {
                _this.$router.push('succ')
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
    // 取消
    cancel() {
      // 应该弹出对话提示框
      this.$router.push('index')
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        console.log(info)
        this.form.firstPic = info.file.response.data
        this.loading = false;
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('只能上传jpg、png格式的图片');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('图片大小不能超过2mb');
      }
      return isJpgOrPng && isLt2M;
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
    // 绑定@imgAdd event
    imgAdd(pos, $file) {
      if (this.$store.getters['user/login'] === false) {
        return this.$message.warning('传图片需要登录')
      }
      this.$api.uploadImage($file).then(res => {
        console.log(res)
        this.$refs.md.$img2Url(pos, res.data);
        if (this.form.firstPic === '') {
          this.form.firstPic = res.data
        }
      })
    },
  }
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
  min-height: 40px;
  margin-top: 20px;

}

.btm-group {
  margin-top: 20px;
  margin-bottom: 20px;

  > * {
    margin-right: 20px;
    color: white;
    font-weight: bold;
    background: #8D99AE;
  }
}

.first-picture {
  max-width: 300px;
  margin: 10px 0;
}
</style>