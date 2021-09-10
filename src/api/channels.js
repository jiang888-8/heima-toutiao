import request from '@/utils/request.js'

/**
 *获取全部频道列表
 * @returns promise
 */
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels',
    // url: '/app/v1_0/channels',
    method: 'GET'
  })
}

/**
 * 添加我的频道
 * @param {*} channel {id,seq}
 * @returns promise
 */
export const addUserChannel = channel => {
  return request({
    url: '/v1_0/user/channels',
    // url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}

/**
 *删除我的频道
 * @param {*} id
 * @returns promise
 */
export const deleteUserChannel = id => {
  return request({
    url: '/v1_0/user/channels/' + id,
    method: 'DELETE'
  })
}
