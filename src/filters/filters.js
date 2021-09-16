import dayjs from 'dayjs'
// 导入语言包
import 'dayjs/locale/zh-cn'
// 导入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

// 给dayjs集成方法
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export const formatDate = (data) => {
  return dayjs().to(data)
}

export const formats = (data) => {
  return dayjs(data).format('YYYY-MM-DD')
}
