/**
 * 封装axios
 * 参考
 * 1. https://www.cnblogs.com/panax/p/10942889.html
 * 2. https://www.cnblogs.com/chaoyuehedy/p/9931146.html
 */
import axios from 'axios'; // 引入axios
import router from '../router/index.js'
// 根据环境 设置 请求根路径 or 接口地址
const BASEURL = process.env.NODE_ENV === "production" ? 'http://47.100.95.40:8086/' : 'http://localhost:8086/';
// const BASEURL = process.env.NODE_ENV === "production" ? 'http://47.106.208.132:8086/' : 'http://47.106.208.132:8086/'; // 该服务器已过期
// const BASEURL = process.env.NODE_ENV === "production" ? 'http://47.100.95.40:8086/' : 'http://47.100.95.40:8086/';
// console.log(process.env)
// 目前已处理的错误请求
const errorSet = new Set([400, 401, 403, 404, 500]);
// 1. 请求根路径
axios.defaults.timeout = 5000;   //响应时间
axios.defaults.baseURL = BASEURL;
// 2. 配置请求拦截器
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = token
    return config;
  }
)

// 3. 配置响应拦截器
axios.interceptors.response.use((res) => {
  // 业务逻辑 if(res...)
  // 返回res.data,then调用可以直接获取后端关键的json串
  return res.data
}, (error) => { // 响应非200 会报错,然后这里捕捉到
  console.log(error.response);
  let status = error.response.status
  // 如果是/views/error有的页面,直接跳转过去,没有的先随便处理
  if (errorSet.has(status)) {
    router.push({name: status, params: {msg: error.response.data.msg}})
  } else {
    alert(JSON.stringify(error.response))
  }
  // 调用者使用catch处理异常,并可以获得响应信息
  return Promise.reject(error.response)
});

export default axios;