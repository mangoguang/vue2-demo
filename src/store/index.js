/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Vue from 'vue'
import Vuex from 'vuex';
// import user from './modules/user'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  mutations: {
    SET_LOADING_SHOW(state, val) {
      state.isLoading = val;
    },
  },
  actions: {
  },
  modules,
});
