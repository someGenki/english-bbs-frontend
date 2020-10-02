import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './modules/user.js'
import { isXxxFront, isEmpty } from '../utils/check.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 2, // 测试用 
    theme: localStorage.getItem('theme') || 'light',// 主题 light & dark
    bgColor: localStorage.getItem('bgColor') || '#ffffff', // 网页背景颜色
    mainAnimate: localStorage.getItem('mainAnimate') || null, //网页切换的动画效果
    currentMenu: ['/index'], // 当前选中的菜单,用于多个ant-menu
    timer: null,// 计时器
    sider: false,//侧边栏显示状况
  },
  mutations: {
    countAdd(state, step = 1) {
      console.log("++");
      state.count += step
    },

    // 更新主题
    updateTheme(state, val) {
      localStorage.setItem("theme", val)
      state.theme = val
    },
    // 更新背景颜色
    updateBgColor(state, val) {
      localStorage.setItem("bgColor", val)
      state.bgColor = val
    },
    // 设置网页主题内容的切换效果
    updateMainAnimate(state, val) {
      let tmp;
      if (isEmpty(val) || val.length < 4 || val.indexOf("Out") != -1) {
        tmp = null
        localStorage.removeItem('mainAnimate')
      }
      // 如果值不带前缀,自动帮忙补全
      else {
        tmp = isXxxFront('animate__', val) == false ? 'animate__' + val : val
        localStorage.setItem("mainAnimate", tmp)
      }
      state.mainAnimate = tmp
    },
    // 防抖
    debounce(state, obj) {
      clearTimeout(state.timer)
      state.timer = null
      const { that, args, fn } = obj
      console.log(args);
      state.timer = setTimeout(function () {
        fn.call(that, args)
      }, 1000)
    },
    //  监听当前菜单变化 v-model 与vuex的结合使用
    // 需要的地方使用计算属性,并重写get/set
    handleCurrentMenu(state, val) {
      state.currentMenu = val
    },
    updateSider(state) {
      state.sider = !state.sider
    }
  },
  // 异步行为
  actions: {
    countAddAsync(context) {
      setTimeout(() => {
        context.commit('countAdd')
      }, 1000)
    }
  },
  getters: {
    showCount(state) {
      return `当前count值${state.count}`;
    },
    getMainAnimate(state) {
      if (state.mainAnimate == null || isXxxFront('animate__', state.mainAnimate) == false) {
        return null
      } else {
        return `animate__animated ${state.mainAnimate}`
      }
    },

  },
  modules: {
    // this.$store.state.user.xxx
    user: UserModule,
  }
})
