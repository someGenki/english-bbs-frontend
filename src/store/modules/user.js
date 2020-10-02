export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
    avatar: localStorage.getItem('avatar') || '',
    uid: localStorage.getItem('uid') || null,
    nickname: localStorage.getItem('nickname') || '',
    username: localStorage.getItem('username') || '',
    point: localStorage.getItem('point') || null,
  },
  mutations: {
    // 每次刷新页面会调用
    updateInfo(state, data) {
      // console.log(data);
      state.nickname = data.nickname
      state.avatar = data.avatar
      localStorage.setItem("nickname", data.nickname)
      localStorage.setItem("avatar", data.avatar)
      localStorage.setItem("point", data.point)
      state.point = data.point
    },
    userLogin(state, data) {
      console.log(data);
      localStorage.setItem("token", data.token)
      localStorage.setItem("username", data.username)
      localStorage.setItem("nickname", data.nickname)
      localStorage.setItem("avatar", data.avatar)
      localStorage.setItem("uid", data.uid)
      state.token = data.token
      state.avatar = data.avatar
      state.uid = data.uid
      state.nickname = data.nickname
      state.username = data.username
    },
    clearUser(state) {
      state.token = null;
      state.uid = null;
      state.avatar = null;
      location.href = "/"
    },
    updateAccount(state, data) {
      let field = data.field // 更新的字段
      switch (field) {
        case 'avatar':
          state.avatar = data.val
          localStorage.setItem("avatar", data.val)
          break;
        case 'nickname':
          state.nickname = data.val
          localStorage.setItem("nickname", data.val)
        default:
          break;
      }
    }
  },
  getters: {
    // 是否登录
    login(state) {
      return !!state.token
    },
    // 展示头像 没有设置头像则为汤圆酱
    avatar(state) {
      if (!state.avatar || state.avatar.indexOf('http') === -1) {
        return 'https://wx2.sbimg.cn/2020/09/11/9Ue2h.png'
      } else return state.avatar
    },
    nickname(state) {
      return !!state.token ? state.nickname : null
    }
  },
  actions: {
    // 用户登出
    logout(context, vue) {
      vue.$confirm({
        title: "你打算登出此账户吗",
        content: "啊这？",
        onOk() {
          let token = localStorage.getItem('token')
          localStorage.clear()
          sessionStorage.clear()
          vue.$api.logout(token).then(res => {
            vue.$message.success({
              content: '登出成功,页面正在跳转ing',
              duration: 1.5,
            })
            localStorage.clear()
            sessionStorage.clear()
            location.href = "/"
            context.commit('clearUser')
          })
        }
      })
    },
    // 用户注册
    register(context, payload) {
      const {vue, val} = payload
      vue.$api.register(val).then(res => {
        if (res.code == 200) {
          context.commit('userLogin', res.data)
          vue.$message.success({
            content: '欢迎加入:🎉' + res.data.nickname,
            duration: 2,
          })
          vue.$router.push('/index')
        }
      })
    },
    // 用户登录
    login(context, payload) {
      const {vue, val} = payload
      return vue.$api.login(val).then(res => {
        if (res.code === 200) {
          context.commit('userLogin', res.data)
          vue.$message.success({
            content: '欢迎回来:🎉' + res.data.nickname,
            duration: 2,
          })
          vue.$router.push('/index')
          return true
        } else {
          vue.$message.error(res.msg)
          return false
        }
      })
    },
    // 用户最新 昵称 头像 积分 需要token newest
    info(context, vue) {
      if (context.getters.login === false) return;
      vue.$api.newestInfo().then(res => {
        context.commit('updateInfo', res.data)
      })
    }
  },
}