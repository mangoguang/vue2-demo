import Vue from 'vue';
import ba from 'vue-ba';
import VConsole from 'vconsole';
import App from './App.vue';
import router from './router';
import store from './store';
import vantCom from '@/common/vant'
import 'vant/lib/index.css'
import * as Sentry from '@sentry/vue'

const env = process.env.VUE_APP_ENV;
const { configMap } = require('../resource.config');
const { sentryDSN, siteID } = configMap[env]

Sentry.init({
  Vue: Vue,
  dsn: sentryDSN,
  logErrors: true,
})

const vConsole = new VConsole();
console.log(vConsole);
Vue.config.productionTip = false;

Vue.use(ba, siteID);

// 按需引入vant组件
vantCom.forEach(item => Vue.use(item))

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

import('@/common/vconsole').then((res) => res.default.show());
