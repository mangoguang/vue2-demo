import Vue from 'vue';
import ba from 'vue-ba';
import VConsole from 'vconsole';
import App from './App.vue';
import router from './router';
import store from './store';
import vantCom from '@/common/vant'
import 'vant/lib/index.css'

const vConsole = new VConsole();
console.log(vConsole);
Vue.config.productionTip = false;

Vue.use(ba, '63e92ce1e69792cbb1be60c6f0e0de50');

// 按需引入vant组件
vantCom.forEach(item => Vue.use(item))

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

import('@/common/vconsole').then((res) => res.default.show());
