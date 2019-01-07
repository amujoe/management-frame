import Vue from "vue";

const http = Vue.axios;

let apis = {
  // 登录
  login(data) {
    return http("admin/login", {
      method: "POST",
      data: data
    });
  },
  // 退出登录
  logout(data) {
    return http("admin/logout", {
      method: "POST",
      data: data
    });
  }
};

export default apis;
