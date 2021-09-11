// 封装搜索接口
import request from '@/utils/request.js'

/**
 * 获取联想建议（自动补全）
 * @param {*} q 搜索关键字
 * @returns promise
 */
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}

/**
 *
 * @param {*} q 搜索关键字
 * @returns promise
 */
export const getSearchResults = (params) => {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}
