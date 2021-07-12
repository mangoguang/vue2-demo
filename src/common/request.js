/* eslint-disable no-param-reassign */
import axios from 'axios';
import { localStorageKeys } from '@/common/constants';
import { Toast } from 'vant';
import store from '@/store';
// import { toLoginPage } from './utils'
const env = process.env.VUE_APP_ENV;
const { baseURLMap } = require('../../resource.config');

const { baseURL } = baseURLMap[env];

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
  (error) => {
    store.commit('SET_LOADING_SHOW', false);
    const responseError = error.response;
    // console.log('请求失败', error, ':::', error.response)
    const { status } = responseError;
    const { data } = responseError;
    Toast.fail(data.message);
    switch (status) {
      case 401:
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
