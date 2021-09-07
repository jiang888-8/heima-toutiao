import request from '@/utils/request.js'

/**
 *
 * @param {*} params {}
 * @returns promise
 */
export const getArticleList = (params) => {
  return request({
    url: '/v1_1/articles',
    method: 'GET',
    params
  })
}
