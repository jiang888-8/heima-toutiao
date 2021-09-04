import request from '@/utils/request.js'

/**
 * 验证码请求
 * @param {*} mobile 手机号
 * @returns promise
 */
export const sendCode = (mobile) => {
  return request({
    url: '/app/v1_0/sms/codes/' + mobile
  })
}

/**
 * 用户认证(登录)
 * @param {*} data {mobile,code}
 * @returns promise
 */
export const login = (data) => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}
