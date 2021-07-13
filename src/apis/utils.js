import request from '@/common/request'

export const post = (url, data = {}, options = {}) => {
  return request.post(url, data, options)
}

export const get = (url, params = {}, options = {}) => {
  return request.get(url, { params, ...options })
}
