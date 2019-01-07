import Vue from "vue";

const http = Vue.axios;

let apis = {
  // 平台管理员 - 平台管理员列表
  CustomerListApi(data) {
    return http("bossAdmin/list", {
      method: "Get",
      params: data
    });
  },
  // 平台管理员禁用、启用
  CustomerStateApi(data) {
    return http("bossAdmin/state", {
      method: "Get",
      params: data
    });
  },
  // 平台管理员 - 重置密码
  CustomerResetApi(data) {
    return http("bossAdmin/reset", {
      method: "Get",
      params: data
    });
  }
};

export default apis;
