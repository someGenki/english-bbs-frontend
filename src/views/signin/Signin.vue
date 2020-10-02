<template>
  <div id="signin">
    <div
      class="banner animate__animated"
      :class="login?'animate__bounceOutUp':'animate__backInDown'"
    >
      <router-link to="/index">
        <img width="120px" src="@/assets/images/rocket_launch_two_color.svg" alt/>
      </router-link>
    </div>
    <a-tabs class="signin-tabs" :defaultActiveKey="plane">
      <a-tab-pane key="login">
        <span slot="tab">
          <a-icon type="enter"/>用户登录
        </span>
        <login @login="handleLogin"></login>
      </a-tab-pane>
      <a-tab-pane key="register">
        <span slot="tab">
          <a-icon type="user-add"/>账号注册
        </span>
        <reg></reg>
      </a-tab-pane>
      <a-tab-pane key="qr-login">
        <span slot="tab">
          <a-icon type="barcode"/>扫码登录
        </span>
        <div class="tmp-qr"></div>
        <h2 style="text-align:center">[ 随便一个软件扫一扫 ]</h2>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Login from '@/views/signin/components/login-form.vue'
import Reg from '@/views/signin/components/register-form.vue'
import {bespreadDiv} from '@/utils/common.js'

export default {
  name: 'Signin',
  components: {
    Login: Login,
    Reg: Reg,
  },
  data() {
    return {
      bespreadDiv,
      plane: 'login',
      activePlane: null,
      login: false,
    }
  },
  mounted() {
    this.bespreadDiv('#signin', true)
  },
  methods: {
    handleLogin(val) {
      this.login = val
    },
  },
}
</script>

<style lang="scss" scoped>
.banner {
  display: flex;
  justify-content: center;
  align-items: center;
}

// 临时占位置的二维码
.tmp-qr {
  background-image: url('~@/assets/images/qr.png');
  height: 250px;
  width: 250px;
  background-repeat: no-repeat; //不重复
  background-position: center center;
  background-size: 100% 110%; // 满屏
  margin: auto;
}

// 标签页样式
#signin {
  width: 100%;
  background: url('~@/assets/images/bg1.svg');
  background-repeat: no-repeat; //不重复
  background-position: center center; // 正中央
  background-size: 100% 200%; // 满屏
  .signin-tabs {
    background: #fff;
    border-radius: 5px;
    min-height: 450px;
    min-width: 300px;
    max-width: 500px;
    margin: 1px auto;
    padding: 0 15px 15px;
  }
}

// 修改组件内部样式
.signin-tabs ::v-deep .ant-tabs-nav .ant-tabs-tab-active {
  font-size: 1.08rem;
}
</style>