import { get } from './utils'

const apiLogin = (userName, data) => get(`/login/${userName}`, data)

export {
  apiLogin
}
