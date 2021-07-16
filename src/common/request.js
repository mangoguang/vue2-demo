/* eslint-disable no-param-reassign */
import axios from 'axios';
import { localStorageKeys } from '@/common/constants';
import { Toast } from 'vant';
import store from '@/store';
import { reload } from '@/apis/utils'
import { apiLogin } from '@/apis/common'
import MD5 from 'crypto-js/md5'
// import { toLoginPage } from './utils'
const env = process.env.VUE_APP_ENV;
const { configMap } = require('../../resource.config');

const { baseURL } = configMap[env];

const instance = axios.create({
  baseURL,
  timeout: 30000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (config.isLoading) {
      store.commit('SET_LOADING_SHOW', true);
    }
    // 请求头添加签名(config.isLogin=false表示不要求登录态)
    const token = localStorage.getItem(localStorageKeys.TOKEN) || '';
    const isLogin = !(typeof config.isLogin === 'boolean' && !config.isLogin);
    if (isLogin && token) {
      // 设置请求头headers
      config.headers['Content-Type'] = 'application/json; charset=utf-8';
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    store.commit('SET_LOADING_SHOW', false);
    if (response.data.result === false) console.log(response.data.message);
    return response.data;
  },
  async (error) => {
    // console.log(111111111, error.config)
    store.commit('SET_LOADING_SHOW', false);
    const responseError = error.response;
    // console.log('请求失败', error, ':::', error.response)
    const { status } = responseError;
    const { data } = responseError;
    // Toast.fail(data.message);
    switch (status) {
      case 401:
        // 重新登陆
        const loginData = await apiLogin('guang', { password: MD5('427815').toString(), uuid: '123456' })
        localStorage.setItem(localStorageKeys.TOKEN, `Bearer ${loginData.data.token}`)
        // console.log('重新发起请求')
        let { baseURL, url, data, method } = error.config
        // console.log(22222222222, { baseURL, url, data }, reload)
        let reloadResponse = await reload(method, `${baseURL}${url}`, JSON.parse(data))
        // console.log('重发请求结果', reloadResponse)
        // return reloadResponse
        // toLoginPage()
        break;
      case 404:
        // Toast.fail(data.message)
        break;
      default:
        break;
    }
    return Promise.reject(error);
  },
);

export default instance;

// export default (
//   type = 'get',
//   url,
//   params = {},
//   options = {}
// ) => {
//   return new Promise((resolve, reject) => {
//     type = type.toLocaleLowerCase()
//     // let loading = {
//     //   show: false,
//     //   // ...baseLoadingConfig,
//     //   ...options.loading
//     // }

//     const config = {
//       method: type,
//       url: `${url}`
//     }

//     if (type === 'get') {
//       config.params = params
//     } else {
//       config.data = params
//     }
//     // if (loading.show) {
//     //   if (timer) clearTimeout(timer)
//     //   loadingInstance && loadingInstance.close()
//     //   loadingInstance = Loading.service(loading)
//     // }
//     instance(config).then(res => {
//       console.log('响应体', res)
//       // if (loading.show) {
//       //   timer = setTimeout(() => {
//       //     loadingInstance && loadingInstance.close()
//       //   }, 300)
//       // }
//       // 普通接口数据处理
//       if (res.result === false) {
//         reject(res)
//       } else resolve(res.data)
//     }).catch(error => {
//       // if (loading.show) {
//       //   timer = setTimeout(() => {
//       //     loadingInstance && loadingInstance.close()
//       //   }, 300)
//       // }
//       reject(error)
//     })
//   })
// }
