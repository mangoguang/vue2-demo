import request from '@/common/request'

export const post = (url, data = {}, options = {}) => {
  return request.post(url, data, options)
}

export const get = (url, params = {}, options = {}) => {
  return request.get(url, { params, ...options })
}

export const reload = (method, url, data = {}, options ={}) => {
  const methodObj = {
    post: () => post(url, data, options),
    get: () => get(url, data, options)
  }
  return methodObj[method]()
}