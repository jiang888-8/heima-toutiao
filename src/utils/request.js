import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
  // 后台返回原始数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      // 处理大数
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }],
  // baseURL: 'http://ttapi.research.itcast.cn/'
  baseURL: 'http://toutiao-app.itheima.net'
})

// 请求拦截器
const notLoading = ['/v1_1/articles', '/v1_0/search', '/v1_0/comments']
request.interceptors.request.use(config => {
  // console.log(config)
  if (store.state.user) {
    // 配置请求头
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  const isDetail = /\/v1_0\/articles\/\d+/.test(config.url)
  if (notLoading.indexOf(config.url) === -1 && !isDetail) {
    Toast.loading({
      message: '加载中...',
      duration: 0, // 展示时长(ms)，值为 0 时，toast 不会消失
      forbidClick: true
    })
  }

  return config
})

// 响应拦截器
request.interceptors.response.use(res => {
  Toast.clear()
  return res.data.data
})
export default request
