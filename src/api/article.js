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

/**
 * 对文章点赞
 * @param {*} target target(id)
 * @returns promise
 */
export const getLikes = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消对文章的点赞
 * @param {*} target id
 * @returns promise
 */
export const removeLikes = (target) => {
  return request({
    url: '/v1_0/article/likings/' + target,
    method: 'DELETE'
  })
}

/**
 * 添加评论或评论回复
 * @param {*} data {target,content,art_id}
 * target 文章id或者评论id
 * content 评论内容
 * art_id 文章id（给评论评论时需要传）
 * @returns promise
 */
export const postComments = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
