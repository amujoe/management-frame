//  单一状态树
const state = {
  USERINFO: null
};

// getters 暴露出去的获取 state 的计算属性
const getters = {
  getUserInfo: state => {
    if (!state.USERINFO) {
      state.USERINFO = JSON.parse(localStorage.getItem("USERINFO"));
    }
    return state.USERINFO;
  }
};

// mutations 私有化方法，只能被 actions 调用， 可以直接变更状态
const mutations = {
  setUserInfo(state, data) {
    localStorage.setItem("USERINFO", JSON.stringify(data));
    state.USERINFO = data;
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
