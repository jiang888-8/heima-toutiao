import request from '@/utils/request.js'

/**
 *
 * @param {*} params {}
 * @returns promise
 */
export const getArticleList = (params) => {
  return request({
    url: '/v1_1/articles',
    // url: '/app/v1_1/articles',
    method: 'GET',
    params
  })
}

/**
 *获取文章详情
 * @param {*} id 文章id
 * @returns promise
 */
export const getArticleDetail = (id) => {
  return request({
    url: '/v1_0/articles/' + id,
    method: 'GET'
  })
}

/**
 * 收藏文章
 * @param {*} target id
 * @returns promise
 */
export const addCollected = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消收藏
 * @param {*} target id
 * @returns promise
 */
export const removeCollected = (target) => {
  return request({
    url: '/v1_0/article/collections/' + target,
    method: 'DELETE'
  })
}

/**
 * 获取评论或或评论回复
 * @param {*} params {type,source,offset,limit}
 * @returns promise
 */
export const getComment = (params) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}
