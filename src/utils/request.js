import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/'
  baseURL: 'http://toutiao-app.itheima.net'
})

// 请求拦截器
request.interceptors.request.use(config => {
  // console.log(config)
  if (store.state.user) {
    // 配置请求头
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  // if (config.url !== '/app/v1_1/articles') {
  if (config.url !== '/v1_1/articles') {
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
