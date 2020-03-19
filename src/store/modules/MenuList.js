//  单一状态树
const state = {
  MENULIST: null,
  MENU_TOP: null,
  MENU_LEFT: null
};

// getters 暴露出去的获取 state 的计算属性
const getters = {
	getMenu: state => {
		if (!state.MENULIST) {
			state.MENULIST = JSON.parse(localStorage.getItem("MENU"));
		}
		return state.MENULIST;
	},
	getMenuTop: state => {
		if (!state.MENU_TOP) {
			state.MENU_TOP = JSON.parse(localStorage.getItem("MENU_TOP"));
		}
	    return state.MENU_TOP;
	},
	getMenuLeft: state => {
		if (!state.MENU_LEFT) {
			state.MENU_LEFT = JSON.parse(localStorage.getItem("MENU_LEFT"));
		}
		return state.MENU_LEFT;
	}
};

// mutations 私有化方法，只能被 actions 调用， 可以直接变更状态
const mutations = {
  setMenu(state, data) {
	localStorage.setItem("MENU", JSON.stringify(data));
    state.MENULIST = data.user;
  },
  setMenuTop: (state, data) => {
	localStorage.setItem("MENU_TOP", JSON.stringify(data));
    state.MENU_TOP = data;
  },
  setMenuLeft: (state, data) => {
	  localStorage.setItem("MENU_LEFT", JSON.stringify(data));
		state.MENU_LEFT = data;
  }
};

// actions 暴露到外部的方法 不直接变更状态
const actions = {
  setMenu({ commit }, data) {
    commit("setMenu", data);
  },
  setMenuTop: ({ commit }, data) => {
    commit("setMenuTop", data);
  },
  setMenuLeft: ({ commit }, data) => {
    commit("setMenuLeft", data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
