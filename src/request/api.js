/**
 * 统一管理接口
 */
import axios from './http.js'
import qs from 'qs';

export default {
  /* 用户模块 */
  // 注册
  register(form) {
    return axios.post('/user/reg', {
      username: form.username,
      password: form.password,
    })
  },
  // 登录 
  login(form) {
    return axios.post('/user/login', {
      username: form.username,
      password: form.password,
    })
  },
  // 获取用户最新的昵称 头像 积分 需要token
  newestInfo(uid) {
    return uid == null
      ? axios.get('/user/newest')
      : axios.get('/user/newest?uid=' + uid)
  },
  // 获取用户的通知
  getNotice() {
    return axios.get('/notice')
  },
  readNotice(id) {
    return axios.put('/notice/' + id);
  },
  // 判断邮箱/用户名是否重复
  exist(type, val) {
    return axios.get(`/user/exist?type=${type}&value=${val}`)
  },
  // 登出 login==true
  logout(token) {
    let config = {
      headers: {'Authorization': token}
    }
    return axios.get('/user/logout', config)
  },
  // 获取用户信息
  getUserinfo(uid) {
    return axios.get('/userinfo/' + uid)
  },
  // 获取用户摘要
  getUserDigest(uid) {
    return axios.get('/userinfo/digest/' + uid)
  },
  // 修改用户的某个字段信息 要token
  updateUserinfo(key, value) {
    return axios.put(`/userinfo/update?key=${key}&value=${value}`)
  },
  // 修改用户昵称
  updateNickname(val) {
    return axios.post('/user/update/nickname/' + val)
  },
  // 获取用户动态
  getUserDynamic(uid) {
    return axios.get('/dynamic/' + uid);
  },
  // 发表一条推送、动态
  sendTweet(content) {
    return axios.post('/tweet', qs.stringify({content}))
  },
  // 删除一条动态
  deleteDynamic(id) {
    return axios.delete('/dynamic/' + id);
  },
  /* 用户模块 */


  // 分页获取父(parent)级的留言 
  getFuLiuyan(num = 1, size = 5) {
    if (num < 1) num = 1;
    if (size > 20) size = 20;
    return axios.get(`message?num=${num}&size=${size}`)
  },
  // 发表一条留言
  postLiuyan(form) {
    return axios.post('/message', form)
  },
  // 获取一条父级评论，需要所在资源的id和类型，以及页面数据
  getFuComment(item, page, size) {
    return axios.get(`comment/page/${item.type}/${item.id}?num=${page}&size=${size}`)
  },
  // 提交一条评论
  commitComment(form) {
    return axios.post('/comment/commit', form)
  },
  // 用户签到
  userSign() {
    return axios.post('/sign/in')
  },
  // 上传头像
  uploadAvatar(file) {
    let param = new FormData()  // 创建form对象
    param.append('file', file)  // 通过append向form对象添加数据
    // param.append('chunk', '0') // 添加form表单中其他数据
    let config = {
      headers: {'Content-Type': 'multipart/form-data'}
    }
    return axios.post('/upload/avatar', param, config)
  },
  // 上传图片
  uploadImage(file, useCloud = true, useCompress = false) {
    let param = new FormData()  // 创建form对象
    param.append('file', file)
    param.append('cloud', useCloud)
    param.append('compress', useCompress)
    let config = {
      headers: {'Content-Type': 'multipart/form-data'}
    }
    return axios.post('/upload/img', param, config)
  },
  // 获取附件的详细信息
  getAttachmentInfo(url) {
    return axios.get('/upload/file/info?url=' + url);
  },
  // 获取网站签到信息
  signInfo() {
    return axios.get('/sign/info')
  },
  // 分页获取子留言,先不搞,反正没那么多
  getZiLiuyan(pid, num, size) {
    return null
  },
  // 翻译单词 res.data.trans_result[0].dst 获取结果 dst换src是源单词
  translate(word) {
    return axios.get('/tran/api/' + word)
  },
  // 获取一个详细的帖子
  getPost(pid) {
    return axios.get('/post/' + pid)
  },
  // 获取帖子list
  getPostList(num = 1, size = 5, category = 'default') {
    let tmp = category === 'default' ? '' : `&category=${category}`;
    return axios.get(`/post/page?num=${num}&size=${size}` + tmp)
  },
  // 发布一个帖子
  commitPost(form) {
    return axios.post('/post/commit', form)
  },
  commitArticle(form) {
    return axios.post('/article/commit', form)
  },
  // 获取文章list
  getArticleList(num = 1, size = 7, search = '') {
    let tmp = search === 'default' ? '' : `&search=${search}`;
    return axios.get(`/article/page?num=${num}&size=${size}` + tmp)
  },
  // 获取一个文章详细内容
  getArticle(aid) {
    return axios.get('/article/' + aid)
  }
}