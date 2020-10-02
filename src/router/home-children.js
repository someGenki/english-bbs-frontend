import Index from '../views/Index.vue' //正常加载

const children = [
  {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页'
    },
    component: Index,
  }, {
    path: '/post/:pid',
    name: 'post',
    meta: {
      title: '帖子'
    },
    component: () => import('@/views/post/post.vue')
  }, {
    path: '/article/:aid',
    name: 'article',
    meta: {
      title: '文章'
    },
    component: () => import('@/views/read/detail.vue')
  }, {
    path: '/read',
    name: 'read',
    meta: {
      title: '阅读'
    },
    component: () => import('@/views/read/read.vue')
  }, {
    path: '/signin',
    name: 'signin',
    meta: {
      title: '登录、注册'
    },
    component: () => import('@/views/signin/Signin.vue')
  },
  {
    path: '/succ',
    name: 'succ',
    component: () => import(/* webpackChunkName: "result-page" */ '@/views/result/succ.vue')
  }, {
    path: '/400',
    name: '400',
    component: () => import(/* webpackChunkName: "result-page" */ '@/views/result/400.vue')
  }, {
    path: '/401',
    name: '401',
    component: () => import(/* webpackChunkName: "result-page" */ '@/views/result/401.vue')
  }, {
    path: '/403',
    name: '403',
    component: () => import(/* webpackChunkName: "result-page" */ '@/views/result/403.vue')
  }, {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "result-page" */ '@/views/result/404.vue')
  }, {
    path: '/500',
    name: '500',
    component: () => import(/* webpackChunkName: "result-page" */ '@/views/result/500.vue')
  }, {
    path: '/collections',
    name: 'collections',
    component: () => import(/* webpackChunkName: "user-page" */ '@/views/user/collections.vue')
  }, {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "user-page" */ '@/views/user/profile.vue')
  }, {
    path: '/space/:uid',
    name: 'space',
    meta: {
      title: '用户空间'
    },
    component: () => import(/* webpackChunkName: "user-page" */  '@/views/user/space.vue')
  }, {
    path: '/settings',
    name: 'settings',
    meta: {
      title: '网页设置'
    },
    component: () => import(/* webpackChunkName: "user-page" */ '@/views/user/settings.vue')
  }, {
    path: '/user-article',
    name: 'user-article',
    component: () => import(/* webpackChunkName: "user-page" */ '@/views/user/article.vue')
  }, {
    path: '/user-post',
    name: 'user-post',
    component: () => import(/* webpackChunkName: "user-page" */ '@/views/user/post.vue')
  }, {
    path: '/user-tran',
    name: 'user-tran',
    component: () => import(/* webpackChunkName: "user-page" */ '@/views/user/tran.vue')
  }, {
    path: '/event',
    name: 'event',
    component: () => import('@/views/common/event.vue')
  }, {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/editor/editor.vue')
  }, {
    path: '/message',
    name: 'message',
    component: () => import('@/views/message-board/message.vue')
  }, {
    path: '/notice',
    name: 'notice',
    meta: {
      title: "我的消息"
    },
    component: () => import('@/views/notice/notice.vue')
  }, {
    path: '/rank',
    name: 'rank',
    component: () => import('@/views/common/rank.vue')
  }, {
    path: '/tutorial',
    name: 'tutorial',
    component: () => import('@/views/common/tutorial.vue')
  }
]

export default children;