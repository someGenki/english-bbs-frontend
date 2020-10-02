// export const str = "blablabla~";
// export const obj = {};
// import { str, log } from 'a';
// 关于导入导出 可参考：https://www.cnblogs.com/richard-youth/p/10432069.html
export default {
  post: [
    {
      name: '默认',
      value: 'default',
    },
    {
      name: '讨论',
      value: 'discuss',
    },
    {
      name: '提问',
      value: 'question',
    },
    {
      name: '分享',
      value: 'share',
    },
    {
      name: '公告',
      value: 'notice',
    },
  ],
  publicMenus: [
    {
      desc: '首页',
      key: '/index',
      icon: null,
      disable: false,
    },
    {
      desc: '阅读',
      key: '/read',
      icon: null,
      disable: false,
    },
    {
      desc: '教程',
      key: '/tutorial',
      icon: null,
      disable: false,
    },
    {
      desc: '排行',
      key: '/rank',
      icon: null,
      disable: false,
    },
    {
      desc: '留言',
      key: '/message',
      icon: null,
      disable: false,
    },
    {
      desc: '活动',
      key: '/event',
      icon: null,
      disable: true,
    },
  ],
  userMenus: [{
    desc: '查看信息',
    key: '/profile',
    icon: 'profile',
    disable: false,
  }, {
    desc: '我的收藏',
    key: '/collections',
    icon: 'heart',
    disable: false,
  }, {
    desc: '网站设置',
    key: '/settings',
    icon: 'setting',
    disable: false,
  }]
}