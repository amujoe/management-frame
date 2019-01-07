import Vue from "vue";
import Vuex from "vuex";
import UserInfo from "./modules/UserInfo";
import MenuList from "./modules/MenuList";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    USER: UserInfo,
    MENU: MenuList
  }
});
