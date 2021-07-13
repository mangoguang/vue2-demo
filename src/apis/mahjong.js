import { post, get } from './utils'

const apiGetMahjongList = (data) => post('/v1/mahjong/list', data, { isLoading: true })

const apiCheckUser = (userName, data) => get(`/api/login/${userName}`, data, { isLogin: false })

export {
  apiGetMahjongList,
  apiCheckUser
}
