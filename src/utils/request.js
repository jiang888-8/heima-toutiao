import axios from 'axios'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

request.interceptors.request.use(config => {
  // console.log(config)
  Toast.loading({
    message: '加载中...',
    duration: 0, // 展示时长(ms)，值为 0 时，toast 不会消失
    forbidClick: true
  })
  return config
})

export default request
