<template>
  <div class="ProfileHeader">
    <!-- 封面图 -->
    <div class="cover wrapper">
      <label v-if="self" class="topRight">
        <a-upload
          :before-upload="beforeUpload"
          :show-upload-list="false"
          :action="uploadUrl"
          :headers="headers"
          @change="handleChange"
        >
          <a-button class="btn">
            <a-icon type="camera"/>
            更改背景图片
          </a-button>
        </a-upload>
      </label>
      <img :src="userCover" alt="1000*250" title="1000px*250px图片"/>
    </div>
    <!-- 用户信息展示 -->
    <div class="userinfo wrapper">
      <a-avatar :src="userAvatar" shape="square" :size="105" icon="user"/>
      <div class="info">
        <div class="line1">
          <span class="nickname" :class="signColor">
            <a-tooltip>
              <template slot="title">学校:{{ userinfo.school || '没有设置哦' }}</template>
              {{ userNickname }}
            </a-tooltip>
          </span>
          <span class="sex" :style="{color:sexColor}">
            <a-icon :type="sexType"/>
          </span>
          <span class="point"></span>
        </div>
        <div class="sign">{{ userinfo.sign }}</div>
        <div class="line2">加入时间:{{ userinfo.joinTime }}</div>
      </div>
      <!-- 右上按钮 -->
      <div v-if="self" class="topRight">
        <a-button type="primary" @click="$router.push('/profile')">
          <a-icon type="edit"/>
          编辑资料
        </a-button>
      </div>
      <!-- 右下角差一个聊天/关注等 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileHeader',
  props: {
    // 要浏览用户的主页
    uid: {type: String, default: '-1'},
  },
  data() {
    return {
      // 默认背景图,加载页面时从后端获取用户信息
      userCover: '',
      userAvatar: this.$store.state.user.avatar || null,
      userNickname: this.$store.state.user.nickname || 'loading',
      loading: false,
      // 上传背景图的请求路径
      uploadUrl: 'http://fanyibar.top:8086/upload/cover',
      // 请求头
      headers: {
        Authorization: this.$store.state.user.token,
      },
      self: this.uid === this.$store.state.user.uid, // 是否是自己的主页
      sexType: 'eye-invisible',
      sexColor: null,
      signColor: 'signColor1',
      userinfo: {},
    }
  },
  created() {
    // 非自己的要去获取 看情况..
    if (!this.self) {
      this.$api.newestInfo(this.uid).then((res) => {
        console.log(res)
        if (res.data == null) return this.$router.push('/404')
        this.userAvatar = res.data.avatar
        this.userNickname = res.data.nickname
      })
    }
    this.$api.getUserinfo(this.uid).then((res) => {
      console.log(res)
      if (res.data == null) return this.$router.push('/404')
      this.userinfo = res.data
      this.setClassWithSex(res.data.sex)
      this.userCover =
        res.data.coverImg || 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1600849210&di=5f16fe64a78cb8142acef9d4bdee59f2&src=http://hbimg.b0.upaiyun.com/6a95eba2a039652891a2ff063cb78986c86cd05a28f4f-vOT3BQ_fw658'
      this.userinfo.joinTime = res.data.gmtCreate.substring(0, 10)
    })
  },
  methods: {
    // 上传中、完成、失败都会调用这个函数。
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      // 上传成功后 设置userCover
      if (info.file.status === 'done') {
        console.log(info)
        this.userCover = info.file.response.data
        console.log(this.userCover)
      }
    },
    // 上传前提示用户,并且限制文件类型大小
    beforeUpload(file) {
      // 等一个图片裁剪功能1
      this.$message.info('推荐上传图片尺寸1000px*250px,其他将会拉伸')
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG/png file!')
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('Image must smaller than 3MB!')
      }
      return isJpgOrPng && isLt3M
    },
    // 根据用户的性别动态的设置一些样式
    setClassWithSex(sex = 3) {
      if (sex == 1) {
        this.sexType = 'man'
        this.sexColor = 'blue'
        this.signColor = 'signColor1'
      } else if (sex == 2) {
        this.sexType = 'woman'
        this.sexColor = 'pink'
        this.signColor = 'signColor2'
      } else {
        this.sexType = 'eye-invisible'
        this.signColor = 'signColor3'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/mixins/_xuanting.scss';

.btn {
  padding: 5px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
}

.topRight {
  position: absolute;
  top: 10px;
  right: 10px;
}

.ProfileHeader {
  margin-top: 10px;
  width: 100%;
  margin-bottom: 10px;

  > .cover {
    max-height: 250px;
    width: 100%;

    > img {
      max-height: 250px;
      width: 100%;
    }
  }
}

.userinfo {
  // border: 1px solid green;
  width: 100%;
  min-height: 125px;

  > .ant-avatar {
    border: 3px solid #ebe0e0;
    position: absolute;
    border-radius: 10px;
    left: 10px;
    top: -20px;
  }

  .info {
    position: absolute;
    left: 125px;

    > .line1 {
      margin-bottom: 5px;

      > * {
        font-size: 1.2rem;
        margin-right: 10px;
      }

      > .nickname {
        font-weight: 600;
      }
    }

    > .line2 {
      margin-top: 5px;
    }
  }
}

.signColor1 {
  cursor: pointer;
  @include xuanting(5px, blue, 500ms);
}

.signColor2 {
  cursor: pointer;
  @include xuanting(5px, pink, 500ms);
}

.signColor3 {
  cursor: pointer;
  @include xuanting(5px, black, 500ms);
}
</style>