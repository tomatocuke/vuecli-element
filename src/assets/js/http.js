import Vue from 'vue'
// 导入axios
import axios from 'axios'
// 使用element-ui Message做消息提醒
import { Message } from 'element-ui'

const MethodGet = 'GET'
const MethodPost = 'POST'
const MethodPut = 'PUT'
// 防止请求重复提交，只限制POST
var pendingApi = new Set();


//1. 创建新的axios实例，
const service = axios.create({
  // API 请求的默认前缀, 不要改这里，vue.config.js可以配置代理
  baseURL: '/api',
  // 超时时间 单位是ms
  timeout: 10 * 1000
})

const http = {
  // @url: /ping  @params: {id: 67373}  => http://xxxx/ping?id=67373
  get(url, params){
    const config = {
      method: MethodGet,
      url: url, 
      params: params,
    }
    return service(config)
  },
  // @url: /ping  @data: {id: 67373}  => http://xxxx/ping   body: {id: 67373}
  post(url, data){
    // 防止重复同时提交
    // if (pendingApi.has(url)) {
    //   Message.warning('请求提交中，请稍后再试');
    //   return;
    // }
    // pendingApi.add(url);

    const config = {
      method: MethodPost,
      url: url,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
    return service(config)
  },
  put(url, data){
    // 防止重复同时提交
    // if (pendingApi.has(url)) {
    //   Message.warning('请求提交中，请稍后再试');
    //   return;
    // }
    // pendingApi.add(url);

    const config = {
      method: MethodPut,
      url: url,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
    return service(config)
  },
}

// 绑定到Vue上 
Vue.prototype.$http = http










// 2.请求拦截器 (return Promise.reject() 进入catch()中)
service.interceptors.request.use(config => {
  //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie

  // const token = getCookie('名称');//这里取token之前，你肯定需要先拿到token,存一下

  // if(token){
  //   config.params = {'token':token} //如果要求携带在参数中
  //   config.headers.token= token; //如果要求携带在请求头中
  // }

  return config
}, error => {
  Message.error('请求发起失败');
  console.log(error)
})


// 3.响应拦截器 (return Promise.reject() 进入catch()中)
service.interceptors.response.use(response => {
  // if (response.config.method != MethodGet) {
  //   pendingApi.delete(response.config.url)
  // }

  let res = response.data

  Vue.prototype.$debug(response.config.url, res)
  if (res.err_code == undefined) {
    return res
  }
  // 只有在 code 是0的时候，才会在then里获取到data 
  if (res.err_code == 0) {
    return res.data;
  }
  Message.warning(res.err_msg)
  return Promise.reject(res);
}, error => {
  let msg = explainError(error)
  Message.error(msg)
  console.log(error.config.url, error.message)
  return Promise.reject(error);
})

var status = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: `请求接口404`,
  408: '请求超时',
  500: '服务器连接失败',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
}

function explainError(error) {
  // 自定义的字符串错误
  if (typeof(error) === 'string') {
    return error;
  }
  if (error.response && error.response.data) {
    if (error.response.data.err_msg) {
      return error.response.data.err_msg
    }
    
    console.log(error.response.data)
  }
  // // 服务器返回的错误 
  // if (error.response) {
  //   return status[error.response.status] || '请求失败status:' + error.response.status;
  // }
  // 发起请求错误
  return error.message.indexOf('timeout') !== -1 ? '请求超时' : error.message;
}


