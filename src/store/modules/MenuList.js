//  单一状态树
const state = {
  MENULIST: null
};

// getters 暴露出去的获取 state 的计算属性
const getters = {
  userInfo: state => {
    return state.MENULIST;
  }
};

// mutations 私有化方法，只能被 actions 调用， 可以直接变更状态
const mutations = {
  setUserInfo(state, data) {
    state.MENULIST = data.user;
  }
};

// actions 暴露到外部的方法 不直接变更状态
const actions = {
  setUserInfo({ commit }, data) {
    commit("setUserInfo", data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
