import request from '@/utils/request.js'

/**
 * 验证码请求
 * @param {*} mobile 手机号
 * @returns promise
 */
export const sendCode = (mobile) => {
  return request({
    url: '/v1_0/sms/codes/' + mobile
    // url: '/app/v1_0/sms/codes/' + mobile
  })
}

/**
 * 用户认证(登录)
 * @param {*} data {mobile,code}
 * @returns promise
 */
export const login = (data) => {
  return request({
    url: '/v1_0/authorizations',
    // url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

/**
 * 获取用户自己信息
 * @returns promise
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    // url: '/app/v1_0/user',
    method: 'GET'
  })
}

/**
 * 获取用户频道列表
 * @returns promise
 */
export const getUserChannels = () => {
  return request({
    url: '/v1_0/user/channels',
    // url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}

/**
 * 关注用户
 * @param {*} target id
 * @returns promise
 */
export const addFollowUser = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消用户关注
 * @param {*} target id
 * @returns promise
 */
export const removeFollowUser = (target) => {
  return request({
    url: '/v1_0/user/followings/' + target,
    method: 'DELETE'
  })
}

/**
 * 获取用户信息
 * @returns promise
 */
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}
