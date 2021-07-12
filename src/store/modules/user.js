export default {
  namespaced: true,
  state: {
    userInfo: {
      name: 'guang',
    },
  },
  mutations: {
    SET_USER_INFO(state, val) {
      state.userInfo = val;
    },
  },
  actions: {
  },
};
